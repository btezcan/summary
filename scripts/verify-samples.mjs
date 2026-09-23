#!/usr/bin/env node
// Tüm C# örneklerini derler, çalıştırır ve çıktılarını kayıtlı dosyalarla
// karşılaştırır. Sitedeki her "Çıktı" bloğu bu dosyalardan gelir.
//
// Kullanım:
//   node scripts/verify-samples.mjs              hepsini doğrula
//   node scripts/verify-samples.mjs --update     beklenen dosyaları yeniden yaz
//   node scripts/verify-samples.mjs --filter turler   yalnızca yolu eşleşenler
//   node scripts/verify-samples.mjs --jobs 2     paralel iş sayısı
//
// Bir örnek klasörü (samples/<bolum>/<ornek>/) şunları içerir:
//   Program.cs            tek dosyalık uygulama (ya da bir .csproj ile proje)
//   input.txt             (isteğe bağlı) standart girdiye verilecek metin
//   sample.json           (isteğe bağlı) ayarlar, aşağıdaki OPTION_KEYS
//   expected-output.txt   standart çıktı
//   expected-error.txt    derleme hatası ya da yakalanmamış istisna başlığı
//   expected-warnings.txt derleyici uyarıları (yoksa uyarı beklenmez)

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SAMPLES_DIR = path.join(ROOT, 'samples');

const EXPECT_MODES = ['run', 'compile-error', 'exception', 'test'];
const OPTION_KEYS = {
	expect: 'string', // run | compile-error | exception | test (varsayılan: run)
	culture: 'boolean', // true: ICU kültür verisi açık (örnek kültürü kodda belirtmeli)
	langVersion: 'string', // C# 12'den yeni özellik kullanan örnekler için
	buildOnly: 'boolean', // derle ama çalıştırma (ör. internet gerektiren örnek)
	normalize: 'object', // [{ "pattern": "...", "replace": "..." }] değişken çıktı için
	timeoutMs: 'number',
};

const NOISE = [/^An issue was encountered verifying workloads\./, /^\s*$/];

// ---------------------------------------------------------------------------

const args = parseArgs(process.argv.slice(2));
const baseEnv = {
	...process.env,
	DOTNET_CLI_UI_LANGUAGE: 'en',
	DOTNET_NOLOGO: '1',
	DOTNET_CLI_TELEMETRY_OPTOUT: '1',
	DOTNET_SKIP_FIRST_TIME_EXPERIENCE: '1',
	DOTNET_GENERATE_ASPNET_CERTIFICATE: 'false',
};

await checkDotnet();
const samples = findSamples(SAMPLES_DIR).filter((s) => !args.filter || s.id.includes(args.filter));
if (samples.length === 0) {
	console.error(args.filter ? `"${args.filter}" ile eşleşen örnek yok.` : 'Hiç örnek bulunamadı.');
	process.exit(1);
}

console.log(`${samples.length} örnek doğrulanıyor (${args.jobs} paralel iş)${args.update ? ' — güncelleme modu' : ''}\n`);
const started = Date.now();
const results = await mapLimit(samples, args.jobs, verifySample);

const failed = results.filter((r) => !r.ok);
const updated = results.filter((r) => r.updated.length > 0);
console.log(
	`\n${results.length - failed.length}/${results.length} başarılı` +
		(updated.length ? `, ${updated.length} örneğin dosyaları güncellendi` : '') +
		` (${((Date.now() - started) / 1000).toFixed(1)} sn)`,
);
if (failed.length) {
	console.log('\nBaşarısız örnekler:');
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
		opts = readOptions(sample.dir);
	} catch (e) {
		fail(e.message);
		return report(result);
	}

	const env = { ...baseEnv };
	if (!opts.culture) env.DOTNET_SYSTEM_GLOBALIZATION_INVARIANT = '1';
	const timeout = opts.timeoutMs ?? 60_000;
	const dir = sample.dir;

	// 1. Derle. --no-incremental şart: derleme önbellekten gelirse derleyici hiç
	// çalışmaz ve uyarılar görünmez, bu da uyarı kontrolünü güvenilmez yapar.
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
	const diagnostics = parseDiagnostics(build.stdout + '\n' + build.stderr, dir);
	const errors = diagnostics.filter((d) => d.includes(': error '));
	const warnings = diagnostics.filter((d) => d.includes(': warning '));

	if (opts.expect === 'compile-error') {
		if (build.code === 0) {
			fail('Derleme hatası bekleniyordu ama derleme başarılı oldu.');
		} else if (errors.length === 0) {
			fail('Derleme başarısız oldu ama C# hata satırı bulunamadı:\n' + indent(build.stdout + build.stderr));
		} else {
			compareFile(result, fail, dir, 'expected-error.txt', lines(errors));
		}
		compareFile(result, fail, dir, 'expected-warnings.txt', warnings.length ? lines(warnings) : null);
		removeIfUpdating(result, dir, 'expected-output.txt');
		return report(result);
	}

	if (build.code !== 0) {
		fail('Derleme başarısız:\n' + indent(errors.length ? lines(errors) : build.stdout + build.stderr));
		return report(result);
	}
	compareFile(result, fail, dir, 'expected-warnings.txt', warnings.length ? lines(warnings) : null);
	if (opts.buildOnly) return report(result);

	// 2. Çalıştır
	if (opts.expect === 'test') {
		const test = await run('dotnet', ['test', '--no-build', '-nologo'], { cwd: dir, env, timeout: timeout * 3 });
		if (test.code !== 0) fail('Testler başarısız:\n' + indent(test.stdout + test.stderr));
		return report(result);
	}

	const inputPath = path.join(dir, 'input.txt');
	const input = fs.existsSync(inputPath) ? fs.readFileSync(inputPath, 'utf8') : '';
	const runArgs =
		sample.kind === 'file' ? ['run', '--no-build', '--file', 'Program.cs'] : ['run', '--no-build'];
	const exec = await run('dotnet', runArgs, { cwd: dir, env, timeout, input });

	if (exec.timedOut) {
		fail(`Zaman aşımı (${timeout} ms). Program girdi mi bekliyor? input.txt ekleyin.`);
		return report(result);
	}

	const stdout = applyNormalize(toLf(exec.stdout), opts.normalize);
	const stderr = normalizePaths(toLf(exec.stderr), dir);

	if (opts.expect === 'exception') {
		const header = exceptionHeader(stderr);
		if (exec.code === 0 || !header) {
			fail('Yakalanmamış istisna bekleniyordu ama program normal bitti.' + (stderr ? '\n' + indent(stderr) : ''));
		} else {
			compareFile(result, fail, dir, 'expected-error.txt', header + '\n');
		}
		compareFile(result, fail, dir, 'expected-output.txt', stdout);
		return report(result);
	}

	if (exec.code !== 0) {
		fail(`Program ${exec.code} çıkış koduyla bitti:\n` + indent(stderr || stdout));
		return report(result);
	}
	const extraStderr = stderr.split('\n').filter((l) => !NOISE.some((re) => re.test(l)));
	if (extraStderr.length) fail('Beklenmeyen standart hata çıktısı:\n' + indent(extraStderr.join('\n')));
	compareFile(result, fail, dir, 'expected-output.txt', stdout);
	removeIfUpdating(result, dir, 'expected-error.txt');
	return report(result);
}

/** Beklenen dosyayla karşılaştırır; `actual === null` dosyanın olmaması gerektiği anlamına gelir. */
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
	if (actual === null) fail(`${name} var ama bu çıktı artık üretilmiyor.`);
	else if (expected === null) fail(`${name} yok. Çıktıyı kontrol edip --update ile kaydedin:\n${indent(actual)}`);
	else fail(`${name} farklı:\n${diff(expected, actual)}`);
}

function removeIfUpdating(result, dir, name) {
	const file = path.join(dir, name);
	if (args.update && fs.existsSync(file)) {
		fs.rmSync(file);
		result.updated.push(`${name} (silindi)`);
	}
}

function report(result) {
	const mark = result.ok ? '✓' : '✗';
	const upd = result.updated.length ? `  [güncellendi: ${result.updated.join(', ')}]` : '';
	console.log(`${mark} ${result.id}${upd}`);
	for (const m of result.messages) console.log(indent(m));
	return result;
}

// --- Örnekleri bulma ve ayarlar ---------------------------------------------

function findSamples(dir) {
	const found = [];
	(function walk(d) {
		const entries = fs.readdirSync(d, { withFileTypes: true });
		const names = entries.map((e) => e.name);
		const csproj = names.find((n) => n.endsWith('.csproj'));
		if (csproj || names.includes('Program.cs')) {
			found.push({
				id: path.relative(dir, d).split(path.sep).join('/'),
				dir: d,
				kind: csproj ? 'project' : 'file',
			});
			return;
		}
		for (const e of entries) {
			if (e.isDirectory() && !['bin', 'obj', 'node_modules'].includes(e.name) && !e.name.startsWith('.')) {
				walk(path.join(d, e.name));
			}
		}
	})(dir);
	return found.sort((a, b) => a.id.localeCompare(b.id, 'en'));
}

function readOptions(dir) {
	const file = path.join(dir, 'sample.json');
	const opts = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
	for (const [key, value] of Object.entries(opts)) {
		if (!(key in OPTION_KEYS)) throw new Error(`sample.json: bilinmeyen ayar "${key}"`);
		if (typeof value !== OPTION_KEYS[key]) throw new Error(`sample.json: "${key}" ${OPTION_KEYS[key]} olmalı`);
	}
	opts.expect ??= 'run';
	if (!EXPECT_MODES.includes(opts.expect)) {
		throw new Error(`sample.json: "expect" şunlardan biri olmalı: ${EXPECT_MODES.join(', ')}`);
	}
	return opts;
}

// --- Çıktı işleme ------------------------------------------------------------

/** "…/Program.cs(2,19): error CS0165: … [proje.csproj]" → "Program.cs(2,19): error CS0165: …" */
function parseDiagnostics(output, dir) {
	const seen = new Set();
	for (const raw of normalizePaths(toLf(output), dir).split('\n')) {
		const m = raw.trim().match(/^(.+?\(\d+,\d+\): (?:error|warning) [A-Z]+\d+: .*?)(?: \[[^\]]+\])?$/);
		if (m) seen.add(m[1]);
	}
	return [...seen];
}

/** Yakalanmamış istisnanın başlığı: "Unhandled exception." satırından yığın izine kadar. */
function exceptionHeader(stderr) {
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
	return '    (- beklenen, + gerçek)\n' + out.join('\n');
}

// --- Süreç yardımcıları -------------------------------------------------------

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
		// Girdi yoksa stdin hemen kapanır: Console.ReadLine() null döner, program asılı kalmaz.
		child.stdin.on('error', () => {});
		child.stdin.end(input);
	});
}

async function checkDotnet() {
	const r = await run('dotnet', ['--version'], { cwd: ROOT, env: baseEnv, timeout: 30_000 });
	const major = parseInt(r.stdout, 10);
	if (r.code !== 0 || !(major >= 10)) {
		console.error(`.NET 10 veya üstü SDK gerekli (bulunan: ${r.stdout.trim() || 'yok'}).`);
		process.exit(1);
	}
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
			console.error(`Bilinmeyen argüman: ${a}`);
			process.exit(2);
		}
	}
	return out;
}
