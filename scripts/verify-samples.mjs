#!/usr/bin/env node
// Compiles and runs every C# and Python sample and compares the results with the
// stored expected files. Every "Output" block on the site comes from these files.
//
// Usage:
//   node scripts/verify-samples.mjs                 verify everything
//   node scripts/verify-samples.mjs --update        rewrite the expected files
//   node scripts/verify-samples.mjs --filter types  only samples whose path matches
//   node scripts/verify-samples.mjs --jobs 2        number of parallel jobs
//
// Layout: samples/<chapter>/<example>/cs/ and samples/<chapter>/<example>/py/.
// A sample folder contains:
//   Program.cs | *.csproj   C# file-based app or project
//   main.py (+ other .py)   Python script
//   input.txt               (optional) text fed to standard input
//   sample.json             (optional) settings, see OPTION_KEYS
//   expected-output.txt     standard output
//   expected-error.txt      compile error, uncaught exception or traceback
//   expected-warnings.txt   compiler / interpreter warnings (absent = none allowed)
//   expected-typecheck.txt  Python: mypy errors (absent = the code must type-check)
//
// Interpreters: C# needs the .NET 10+ SDK. Python needs 3.14 (target, with the
// tools from samples/requirements.txt, i.e. mypy) and 3.12 (the oldest version
// taught). They are found via $PYTHON / $PYTHON_MIN, then .venv-samples/ (3.14),
// then `uv python find`, then python3.14 / python3.12 on PATH.

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SAMPLES_DIR = path.join(ROOT, 'samples');

const MAX_LINE = 48; // so <Pair> fits side by side; "wide": true exempts a sample
const PY_TARGET = '3.14';
const PY_MIN = '3.12';

const EXPECT_MODES = ['run', 'compile-error', 'exception', 'test'];
const OPTION_KEYS = {
	expect: 'string', // run | compile-error | exception | test (default: run)
	culture: 'boolean', // true: locale data enabled; the sample must set its culture/locale in code
	langVersion: 'string', // C#: a sample that uses a feature newer than C# 12
	minPython: 'string', // Python: a sample that needs a version newer than 3.12
	buildOnly: 'boolean', // compile but don't run (e.g. needs internet)
	nondeterministic: 'boolean', // Python: output may differ between hash seeds (use with normalize)
	normalize: 'object', // [{ "pattern": "...", "replace": "..." }] for variable output
	wide: 'boolean', // lines may exceed MAX_LINE; <Pair> shows the sample stacked
	timeoutMs: 'number',
};

const MYPY_CACHE = path.join(os.tmpdir(), 'verify-samples-mypy');

const NOISE = [/^An issue was encountered verifying workloads\./, /^\s*$/];

// Compiles every .py file without writing .pyc files. Prints SyntaxWarnings like the
// interpreter does ("main.py:2: SyntaxWarning: ...") and a SyntaxError in the usual
// "File ..., line N / caret / message" form, relative to the sample folder.
const PY_COMPILE_CHECK = `
import sys, traceback, warnings, pathlib
warnings.simplefilter("always")
ok = True
for p in sorted(pathlib.Path(".").glob("*.py")):
    try:
        compile(p.read_text(encoding="utf-8"), p.name, "exec")
    except SyntaxError as e:
        ok = False
        sys.stderr.write("".join(traceback.format_exception_only(e)))
sys.exit(0 if ok else 1)
`;

// ---------------------------------------------------------------------------

const args = parseArgs(process.argv.slice(2));
const baseEnv = {
	...process.env,
	DOTNET_CLI_UI_LANGUAGE: 'en',
	DOTNET_NOLOGO: '1',
	DOTNET_CLI_TELEMETRY_OPTOUT: '1',
	DOTNET_SKIP_FIRST_TIME_EXPERIENCE: '1',
	DOTNET_GENERATE_ASPNET_CERTIFICATE: 'false',
	PYTHONUTF8: '1',
	PYTHON_COLORS: '0',
	PYTHONDONTWRITEBYTECODE: '1',
	PYTHONIOENCODING: 'utf-8',
};

const samples = findSamples(SAMPLES_DIR).filter((s) => !args.filter || s.id.includes(args.filter));
if (samples.length === 0) {
	console.error(args.filter ? `No sample matches "${args.filter}".` : 'No samples found.');
	process.exit(1);
}

const tools = {};
if (samples.some((s) => s.lang === 'cs')) await checkDotnet();
if (samples.some((s) => s.lang === 'py')) {
	tools.python = await findPython(PY_TARGET, 'PYTHON', [path.join(ROOT, '.venv-samples', 'bin', 'python')]);
	tools.pythonMin = await findPython(PY_MIN, 'PYTHON_MIN');
	await checkMypy(tools.python);
}

console.log(`Verifying ${samples.length} samples (${args.jobs} parallel jobs)${args.update ? ' — update mode' : ''}`);
if (tools.python) console.log(`Python ${tools.python.version} (${tools.python.mypy}), Python ${tools.pythonMin.version}`);
console.log('');
const started = Date.now();
const results = await mapLimit(samples, args.jobs, verifySample);

const failed = results.filter((r) => !r.ok);
const updated = results.filter((r) => r.updated.length > 0);
console.log(
	`\n${results.length - failed.length}/${results.length} passed` +
		(updated.length ? `, files updated for ${updated.length} samples` : '') +
		` (${((Date.now() - started) / 1000).toFixed(1)} s)`,
);
if (failed.length) {
	console.log('\nFailed samples:');
	for (const r of failed) console.log(`  ✗ ${r.id}`);
	process.exit(1);
}

// ---------------------------------------------------------------------------

async function verifySample(sample) {
	const result = { id: sample.id, ok: true, updated: [], messages: [] };
	const fail = (msg) => {
		result.ok = false;
		result.messages.push(msg);
	};

	let opts;
	try {
		opts = readOptions(sample);
	} catch (e) {
		fail(e.message);
		return report(result);
	}
	if (!opts.wide) checkLineLength(sample, fail);

	const ctx = { sample, opts, dir: sample.dir, result, fail };
	await (sample.lang === 'cs' ? verifyCSharp(ctx) : verifyPython(ctx));
	return report(result);
}

// --- C# -----------------------------------------------------------------------

async function verifyCSharp({ sample, opts, dir, result, fail }) {
	const env = { ...baseEnv };
	if (!opts.culture) env.DOTNET_SYSTEM_GLOBALIZATION_INVARIANT = '1';
	const timeout = opts.timeoutMs ?? 60_000;

	// 1. Build. --no-incremental is essential: if the build comes from the cache the
	// compiler never runs and no warnings are printed, which makes the warning check flaky.
	const buildArgs = [
		'build',
		...(sample.kind === 'file' ? ['Program.cs'] : []),
		'--no-incremental',
		'-nologo',
		'-v',
		'q',
		'-clp:NoSummary',
	];
	if (opts.langVersion) buildArgs.push(`-p:LangVersion=${opts.langVersion}`);
	const build = await run('dotnet', buildArgs, { cwd: dir, env, timeout: timeout * 3 });
	const diagnostics = parseCSharpDiagnostics(build.stdout + '\n' + build.stderr, dir);
	const errors = diagnostics.filter((d) => d.includes(': error '));
	const warnings = diagnostics.filter((d) => d.includes(': warning '));

	if (opts.expect === 'compile-error') {
		if (build.code === 0) fail('Expected a compile error, but the build succeeded.');
		else if (errors.length === 0) fail('The build failed without a C# error line:\n' + indent(build.stdout + build.stderr));
		else compareFile(result, fail, dir, 'expected-error.txt', lines(errors));
		compareFile(result, fail, dir, 'expected-warnings.txt', warnings.length ? lines(warnings) : null);
		removeIfUpdating(result, dir, 'expected-output.txt');
		return;
	}

	if (build.code !== 0) {
		fail('Build failed:\n' + indent(errors.length ? lines(errors) : build.stdout + build.stderr));
		return;
	}
	compareFile(result, fail, dir, 'expected-warnings.txt', warnings.length ? lines(warnings) : null);
	if (opts.buildOnly) return;

	// 2. Run
	if (opts.expect === 'test') {
		const test = await run('dotnet', ['test', '--no-build', '-nologo'], { cwd: dir, env, timeout: timeout * 3 });
		if (test.code !== 0) fail('Tests failed:\n' + indent(test.stdout + test.stderr));
		return;
	}

	const runArgs = sample.kind === 'file' ? ['run', '--no-build', '--file', 'Program.cs'] : ['run', '--no-build'];
	const exec = await run('dotnet', runArgs, { cwd: dir, env, timeout, input: readInput(dir) });
	if (exec.timedOut) return fail(`Timed out (${timeout} ms). Is the program waiting for input? Add input.txt.`);

	const stdout = applyNormalize(toLf(exec.stdout), opts.normalize);
	const stderr = normalizePaths(toLf(exec.stderr), dir);

	if (opts.expect === 'exception') {
		const header = dotnetExceptionHeader(stderr);
		if (exec.code === 0 || !header) {
			fail('Expected an uncaught exception, but the program finished normally.' + (stderr ? '\n' + indent(stderr) : ''));
		} else {
			compareFile(result, fail, dir, 'expected-error.txt', header + '\n');
		}
		compareFile(result, fail, dir, 'expected-output.txt', stdout);
		return;
	}

	if (exec.code !== 0) return fail(`The program exited with code ${exec.code}:\n` + indent(stderr || stdout));
	const extraStderr = stderr.split('\n').filter((l) => !NOISE.some((re) => re.test(l)));
	if (extraStderr.length) fail('Unexpected standard error output:\n' + indent(extraStderr.join('\n')));
	compareFile(result, fail, dir, 'expected-output.txt', stdout);
	removeIfUpdating(result, dir, 'expected-error.txt');
}

// --- Python -------------------------------------------------------------------


async function verifyPython({ opts, dir, result, fail }) {
	const env = { ...baseEnv };
	// Without an explicit locale, only samples that call locale.setlocale() see one.
	if (!opts.culture) Object.assign(env, { LC_ALL: 'C.UTF-8', LANG: 'C.UTF-8' });
	const timeout = opts.timeoutMs ?? 30_000;

	// 1. Compile (the Python equivalent of the C# build step)
	const compile = await run(tools.python.exe, ['-c', PY_COMPILE_CHECK], { cwd: dir, env, timeout });
	const compileOut = normalizePaths(toLf(compile.stderr), dir).trimEnd();

	if (opts.expect === 'compile-error') {
		if (compile.code === 0) fail('Expected a SyntaxError, but the code compiled.');
		else compareFile(result, fail, dir, 'expected-error.txt', compileOut + '\n');
		removeIfUpdating(result, dir, 'expected-output.txt');
		removeIfUpdating(result, dir, 'expected-typecheck.txt');
		return;
	}
	if (compile.code !== 0) return fail('Compile failed:\n' + indent(compileOut));
	const compileWarnings = compileOut ? compileOut.split('\n') : [];
	if (opts.buildOnly) {
		compareFile(result, fail, dir, 'expected-warnings.txt', compileWarnings.length ? lines(compileWarnings) : null);
		return;
	}
	if (opts.expect === 'test') return fail('Python test samples are not supported yet (pytest is added with chapter 17).');

	// 1b. Type check with mypy. Errors are allowed only when stored in expected-typecheck.txt,
	// which the page shows as "Type checker (mypy)" — usually because the error is the lesson.
	const typecheck = await runMypy(dir, opts, env, timeout);
	if (typecheck.failed) return fail(typecheck.failed);
	compareFile(result, fail, dir, 'expected-typecheck.txt', typecheck.errors.length ? lines(typecheck.errors) : null);

	// 2. Run on the target version with two hash seeds, then on the oldest taught version.
	// SyntaxWarnings were already collected in step 1; don't print them twice.
	const input = readInput(dir);
	const runPy = (exe, seed) =>
		run(exe, ['-W', 'ignore::SyntaxWarning', 'main.py'], {
			cwd: dir,
			env: { ...env, PYTHONHASHSEED: String(seed) },
			timeout,
			input,
		});

	const main = await runPy(tools.python.exe, 0);
	if (main.timedOut) return fail(`Timed out (${timeout} ms). Is the program waiting for input? Add input.txt.`);
	const stdout = applyNormalize(normalizePaths(toLf(main.stdout), dir), opts.normalize);
	const stderr = normalizePaths(toLf(main.stderr), dir);

	if (opts.expect === 'exception') {
		const tb = pythonTraceback(stderr);
		if (main.code === 0 || !tb) {
			fail('Expected an uncaught exception, but the program finished normally.' + (stderr ? '\n' + indent(stderr) : ''));
		} else {
			compareFile(result, fail, dir, 'expected-error.txt', tb + '\n');
		}
		compareFile(result, fail, dir, 'expected-warnings.txt', compileWarnings.length ? lines(compileWarnings) : null);
		compareFile(result, fail, dir, 'expected-output.txt', stdout);
	} else {
		if (main.code !== 0) return fail(`The program exited with code ${main.code}:\n` + indent(stderr || stdout));
		const runtimeWarnings = stderr.split('\n').filter((l) => l.trim());
		const allWarnings = [...compileWarnings, ...runtimeWarnings];
		compareFile(result, fail, dir, 'expected-warnings.txt', allWarnings.length ? lines(allWarnings) : null);
		compareFile(result, fail, dir, 'expected-output.txt', stdout);
		removeIfUpdating(result, dir, 'expected-error.txt');
	}

	// 3. Same output with a different hash seed: catches set/dict-of-set ordering that a
	// student would not reproduce.
	const reseeded = await runPy(tools.python.exe, 1);
	const reseededOut = applyNormalize(normalizePaths(toLf(reseeded.stdout), dir), opts.normalize);
	if (!opts.nondeterministic && reseededOut !== stdout) {
		fail('Output changes with PYTHONHASHSEED (set or hash order?). Sort the output, or set "nondeterministic" + "normalize":\n' + diff(stdout, reseededOut));
	}

	// 4. The oldest taught version must run the sample the same way, unless it declares minPython.
	if (opts.minPython && compareVersions(opts.minPython, PY_MIN) > 0) return;
	const old = await runPy(tools.pythonMin.exe, 0);
	const oldOut = applyNormalize(normalizePaths(toLf(old.stdout), dir), opts.normalize);
	const oldErr = normalizePaths(toLf(old.stderr), dir);
	const oldFailed = opts.expect === 'exception' ? !pythonTraceback(oldErr) : old.code !== 0;
	if (oldFailed) {
		fail(
			`Fails on Python ${tools.pythonMin.version}. If it needs a newer version, set "minPython" in sample.json and add a version note on the page:\n` +
				indent(oldErr || oldOut),
		);
	} else if (oldOut !== stdout) {
		fail(`Output differs on Python ${tools.pythonMin.version}:\n` + diff(stdout, oldOut));
	}
}

/** Runs mypy on every .py file of the sample. Notes (": note:") are dropped: only errors are shown. */
async function runMypy(dir, opts, env, timeout) {
	const files = fs.readdirSync(dir).filter((n) => n.endsWith('.py')).sort();
	const pyVersion = opts.minPython && compareVersions(opts.minPython, PY_MIN) > 0 ? opts.minPython : PY_MIN;
	const cache = path.join(MYPY_CACHE, dir.replace(/[^A-Za-z0-9]+/g, '_'));
	const r = await run(
		tools.python.exe,
		[
			'-m', 'mypy',
			'--python-version', pyVersion,
			'--check-untyped-defs',
			'--no-error-summary',
			'--no-color-output',
			'--no-pretty',
			'--cache-dir', cache,
			...files,
		],
		{ cwd: dir, env: { ...env, MYPY_FORCE_COLOR: '0' }, timeout: timeout * 3 },
	);
	// Exit codes: 0 = clean, 1 = type errors found, 2 = mypy itself failed.
	if (r.code !== 0 && r.code !== 1) return { failed: 'mypy failed:\n' + indent(r.stdout + r.stderr), errors: [] };
	const errors = normalizePaths(toLf(r.stdout), dir)
		.split('\n')
		.filter((l) => /^\S+\.py:\d+: error: /.test(l));
	return { errors };
}

async function checkMypy(python) {
	const r = await run(python.exe, ['-m', 'mypy', '--version'], { cwd: ROOT, env: baseEnv, timeout: 60_000 });
	if (r.code !== 0) {
		console.error(
			`mypy is missing for ${python.exe}. Install the pinned tools:\n` +
				'  uv venv --python 3.14 .venv-samples && uv pip install --python .venv-samples -r samples/requirements.txt',
		);
		process.exit(1);
	}
	python.mypy = r.stdout.trim();
}

// --- Expected files -----------------------------------------------------------

/** Compares with the expected file; `actual === null` means the file must not exist. */
function compareFile(result, fail, dir, name, actual) {
	const file = path.join(dir, name);
	const exists = fs.existsSync(file);
	const expected = exists ? toLf(fs.readFileSync(file, 'utf8')) : null;
	if (expected === actual) return;

	if (args.update) {
		if (actual === null) fs.rmSync(file);
		else fs.writeFileSync(file, actual);
		result.updated.push(name);
		return;
	}
	if (actual === null) fail(`${name} exists, but this output is no longer produced.`);
	else if (expected === null) fail(`${name} is missing. Check the output, then save it with --update:\n${indent(actual)}`);
	else fail(`${name} differs:\n${diff(expected, actual)}`);
}

function removeIfUpdating(result, dir, name) {
	const file = path.join(dir, name);
	if (args.update && fs.existsSync(file)) {
		fs.rmSync(file);
		result.updated.push(`${name} (removed)`);
	}
}

function report(result) {
	const mark = result.ok ? '✓' : '✗';
	const upd = result.updated.length ? `  [updated: ${result.updated.join(', ')}]` : '';
	console.log(`${mark} ${result.id}${upd}`);
	for (const m of result.messages) console.log(indent(m));
	return result;
}

// --- Discovery and options ----------------------------------------------------

function findSamples(dir) {
	const found = [];
	(function walk(d) {
		const entries = fs.readdirSync(d, { withFileTypes: true });
		const names = entries.map((e) => e.name);
		const csproj = names.find((n) => n.endsWith('.csproj'));
		if (csproj || names.includes('Program.cs')) {
			found.push({ id: rel(dir, d), dir: d, lang: 'cs', kind: csproj ? 'project' : 'file' });
			return;
		}
		if (names.includes('main.py')) {
			found.push({ id: rel(dir, d), dir: d, lang: 'py', kind: 'file' });
			return;
		}
		for (const e of entries) {
			if (e.isDirectory() && !['bin', 'obj', 'node_modules', '__pycache__'].includes(e.name) && !e.name.startsWith('.')) {
				walk(path.join(d, e.name));
			}
		}
	})(dir);
	return found.sort((a, b) => a.id.localeCompare(b.id, 'en'));
}

function rel(root, d) {
	return path.relative(root, d).split(path.sep).join('/');
}

function readOptions(sample) {
	const file = path.join(sample.dir, 'sample.json');
	const opts = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
	for (const [key, value] of Object.entries(opts)) {
		if (!(key in OPTION_KEYS)) throw new Error(`sample.json: unknown setting "${key}"`);
		if (typeof value !== OPTION_KEYS[key]) throw new Error(`sample.json: "${key}" must be a ${OPTION_KEYS[key]}`);
	}
	opts.expect ??= 'run';
	if (!EXPECT_MODES.includes(opts.expect)) throw new Error(`sample.json: "expect" must be one of: ${EXPECT_MODES.join(', ')}`);
	if (sample.lang === 'cs' && (opts.minPython || opts.nondeterministic)) {
		throw new Error('sample.json: "minPython" and "nondeterministic" are Python-only settings');
	}
	if (sample.lang === 'py' && opts.langVersion) throw new Error('sample.json: "langVersion" is a C#-only setting (use "minPython")');
	return opts;
}

function checkLineLength(sample, fail) {
	const ext = sample.lang === 'cs' ? '.cs' : '.py';
	for (const name of fs.readdirSync(sample.dir).filter((n) => n.endsWith(ext)).sort()) {
		const text = fs.readFileSync(path.join(sample.dir, name), 'utf8');
		toLf(text)
			.split('\n')
			.forEach((line, i) => {
				const length = [...line.replace(/\t/g, '    ')].length;
				if (length > MAX_LINE) {
					fail(`${name}:${i + 1} is ${length} characters (max ${MAX_LINE} so <Pair> fits). Shorten it or set "wide": true.`);
				}
			});
	}
}

function readInput(dir) {
	const p = path.join(dir, 'input.txt');
	return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

// --- Output processing --------------------------------------------------------

/** "…/Program.cs(2,19): error CS0165: … [proj.csproj]" → "Program.cs(2,19): error CS0165: …" */
function parseCSharpDiagnostics(output, dir) {
	const seen = new Set();
	for (const raw of normalizePaths(toLf(output), dir).split('\n')) {
		const m = raw.trim().match(/^(.+?\(\d+,\d+\): (?:error|warning) [A-Z]+\d+: .*?)(?: \[[^\]]+\])?$/);
		if (m) seen.add(m[1]);
	}
	return [...seen];
}

/** The uncaught .NET exception header: from "Unhandled exception." up to the stack trace. */
function dotnetExceptionHeader(stderr) {
	const all = stderr.split('\n');
	const start = all.findIndex((l) => l.startsWith('Unhandled exception.'));
	if (start < 0) return null;
	const out = [];
	for (const l of all.slice(start)) {
		if (/^\s+at /.test(l) || l.startsWith('--- End')) break;
		out.push(l);
	}
	return out.join('\n').trimEnd();
}

/** The Python traceback, from "Traceback (most recent call last):" to the end. */
function pythonTraceback(stderr) {
	const all = stderr.split('\n');
	const start = all.findIndex((l) => l.startsWith('Traceback (most recent call last):'));
	return start < 0 ? null : all.slice(start).join('\n').trimEnd();
}

function normalizePaths(text, dir) {
	const variants = new Set([dir, fs.realpathSync(dir)]);
	for (const v of [...variants]) if (v.startsWith('/private/')) variants.add(v.slice('/private'.length));
	for (const v of variants) text = text.split(v + path.sep).join('').split(v + '/').join('');
	return text;
}

function applyNormalize(text, rules = []) {
	for (const r of rules) text = text.replace(new RegExp(r.pattern, r.flags ?? 'g'), r.replace);
	return text;
}

function toLf(s) {
	return s.replace(/\r\n/g, '\n');
}

function lines(arr) {
	return arr.join('\n') + '\n';
}

function indent(s) {
	return s.trimEnd().split('\n').map((l) => '    ' + l).join('\n');
}

function diff(expected, actual) {
	const e = expected.split('\n');
	const a = actual.split('\n');
	const out = [];
	for (let i = 0; i < Math.max(e.length, a.length); i++) {
		if (e[i] === a[i]) out.push(`      ${e[i]}`);
		else {
			if (e[i] !== undefined) out.push(`    - ${JSON.stringify(e[i]).slice(1, -1)}`);
			if (a[i] !== undefined) out.push(`    + ${JSON.stringify(a[i]).slice(1, -1)}`);
		}
	}
	return '    (- expected, + actual)\n' + out.join('\n');
}

function compareVersions(a, b) {
	const pa = a.split('.').map(Number);
	const pb = b.split('.').map(Number);
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
		const d = (pa[i] ?? 0) - (pb[i] ?? 0);
		if (d) return Math.sign(d);
	}
	return 0;
}

// --- Processes and tools ------------------------------------------------------

function run(cmd, cmdArgs, { cwd, env, timeout, input = '' }) {
	return new Promise((resolve) => {
		const child = spawn(cmd, cmdArgs, { cwd, env });
		let stdout = '';
		let stderr = '';
		let timedOut = false;
		const timer = setTimeout(() => {
			timedOut = true;
			child.kill('SIGKILL');
		}, timeout);
		child.stdout.on('data', (d) => (stdout += d));
		child.stderr.on('data', (d) => (stderr += d));
		child.on('error', (err) => {
			clearTimeout(timer);
			resolve({ code: -1, stdout, stderr: stderr + String(err), timedOut });
		});
		child.on('close', (code) => {
			clearTimeout(timer);
			resolve({ code, stdout, stderr, timedOut });
		});
		// Without input, stdin closes at once: Console.ReadLine() returns null and
		// input() raises EOFError, so a program never hangs waiting for a user.
		child.stdin.on('error', () => {});
		child.stdin.end(input);
	});
}

async function checkDotnet() {
	const r = await run('dotnet', ['--version'], { cwd: ROOT, env: baseEnv, timeout: 30_000 });
	const major = parseInt(r.stdout, 10);
	if (r.code !== 0 || !(major >= 10)) {
		console.error(`The .NET 10 SDK or newer is required (found: ${r.stdout.trim() || 'none'}).`);
		process.exit(1);
	}
}

/** Finds a Python interpreter of exactly the given minor version. */
async function findPython(version, envVar, preferred = []) {
	const candidates = [];
	if (process.env[envVar]) candidates.push(process.env[envVar]);
	candidates.push(...preferred.filter((p) => fs.existsSync(p)));
	const uv = await run('uv', ['python', 'find', version], { cwd: ROOT, env: baseEnv, timeout: 30_000 });
	if (uv.code === 0 && uv.stdout.trim()) candidates.push(uv.stdout.trim());
	candidates.push(`python${version}`);

	for (const exe of candidates) {
		const r = await run(exe, ['-c', 'import sys; print("%d.%d.%d" % sys.version_info[:3])'], {
			cwd: ROOT,
			env: baseEnv,
			timeout: 30_000,
		});
		const found = r.stdout.trim();
		if (r.code === 0 && found.startsWith(version + '.')) return { exe, version: found };
	}
	console.error(
		`Python ${version} is required for the Python samples. Install it with "uv python install ${version}" ` +
			`or set $${envVar} to its path.`,
	);
	process.exit(1);
}

async function mapLimit(items, limit, fn) {
	const results = new Array(items.length);
	let next = 0;
	const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
		while (next < items.length) {
			const i = next++;
			results[i] = await fn(items[i]);
		}
	});
	await Promise.all(workers);
	return results;
}

function parseArgs(argv) {
	const out = { update: false, filter: '', jobs: Math.max(1, Math.min(4, os.cpus().length)) };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--update') out.update = true;
		else if (a === '--filter') out.filter = argv[++i] ?? '';
		else if (a === '--jobs') out.jobs = Math.max(1, parseInt(argv[++i], 10) || 1);
		else {
			console.error(`Unknown argument: ${a}`);
			process.exit(2);
		}
	}
	return out;
}
