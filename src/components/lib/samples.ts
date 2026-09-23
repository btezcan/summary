// Reads the verified samples in samples/ at build time. Code and output on every
// page come from here; nothing is copied by hand. Referencing a sample that doesn't
// exist, or hasn't been verified, fails the site build.
//
// Layout: samples/<chapter>/<example>/cs/ and samples/<chapter>/<example>/py/

const files = import.meta.glob<string>(
	['/samples/**/*.{cs,py,txt,json}', '!/samples/**/{bin,obj,__pycache__}/**'],
	{ query: '?raw', import: 'default', eager: true },
);

export type Lang = 'cs' | 'py';
export type Expect = 'run' | 'compile-error' | 'exception' | 'test';

export const LANGS: Record<Lang, { name: string; mainFile: string; codeLang: string; comment: string }> = {
	cs: { name: 'C#', mainFile: 'Program.cs', codeLang: 'csharp', comment: '//' },
	py: { name: 'Python', mainFile: 'main.py', codeLang: 'python', comment: '#' },
};

export interface Sample {
	id: string;
	lang: Lang;
	expect: Expect;
	culture: boolean;
	wide: boolean;
	langVersion?: string;
	minPython?: string;
	input?: string;
	output?: string;
	error?: string;
	warnings?: string;
	/** Python: mypy errors, when the type checker's report is part of the lesson. */
	typecheck?: string;
}

export interface OutputBlock {
	variant: 'output' | 'warning' | 'typecheck' | 'compile-error' | 'exception';
	label: string;
	text: string;
}

function read(id: string, lang: Lang, name: string): string | undefined {
	return files[`/samples/${id}/${lang}/${name}`];
}

export function hasSample(id: string, lang: Lang): boolean {
	const ext = lang === 'cs' ? '.cs' : '.py';
	return Object.keys(files).some((k) => k.startsWith(`/samples/${id}/${lang}/`) && k.endsWith(ext));
}

export function getSample(id: string, lang: Lang): Sample {
	if (!hasSample(id, lang)) throw new Error(`Sample not found: samples/${id}/${lang}/`);

	const json = read(id, lang, 'sample.json');
	const opts = json ? JSON.parse(json) : {};
	const sample: Sample = {
		id,
		lang,
		expect: opts.expect ?? 'run',
		culture: opts.culture ?? false,
		wide: opts.wide ?? false,
		langVersion: opts.langVersion,
		minPython: opts.minPython,
		input: read(id, lang, 'input.txt'),
		output: read(id, lang, 'expected-output.txt'),
		error: read(id, lang, 'expected-error.txt'),
		warnings: read(id, lang, 'expected-warnings.txt'),
		typecheck: read(id, lang, 'expected-typecheck.txt'),
	};

	const needsOutput = (sample.expect === 'run' && !opts.buildOnly) || sample.expect === 'exception';
	const needsError = sample.expect === 'compile-error' || sample.expect === 'exception';
	if ((needsOutput && sample.output === undefined) || (needsError && sample.error === undefined)) {
		throw new Error(
			`Sample not verified: samples/${id}/${lang}/ — run "npm run verify -- --filter ${id}/${lang} --update" and check the output.`,
		);
	}
	return sample;
}

/** A sample's source file. With `region`, only the part between "region name" and "endregion" comments. */
export function getCode(id: string, lang: Lang, file?: string, region?: string): string {
	const name = file ?? LANGS[lang].mainFile;
	const code = read(id, lang, name);
	if (code === undefined) throw new Error(`File not found: samples/${id}/${lang}/${name}`);
	const where = `samples/${id}/${lang}/${name}`;
	return region ? extractRegion(code, lang, region, where) : stripRegionMarkers(code, lang);
}

function markers(lang: Lang) {
	const c = LANGS[lang].comment === '//' ? '\\/\\/' : '#';
	return {
		start: new RegExp(`^\\s*${c}\\s*#?region\\b\\s*(.*)$`),
		end: new RegExp(`^\\s*${c}\\s*#?endregion\\b`),
	};
}

function extractRegion(code: string, lang: Lang, name: string, where: string): string {
	const { start: START, end: END } = markers(lang);
	const lines = code.replace(/\r\n/g, '\n').split('\n');
	const start = lines.findIndex((l) => START.exec(l)?.[1].trim() === name);
	if (start < 0) throw new Error(`Region not found: "${name}" (${where})`);
	const end = lines.findIndex((l, i) => i > start && END.test(l));
	if (end < 0) throw new Error(`Region not closed: "${name}" (${where})`);
	return dedent(stripRegionMarkers(lines.slice(start + 1, end).join('\n'), lang));
}

function stripRegionMarkers(code: string, lang: Lang): string {
	const { start: START, end: END } = markers(lang);
	return code
		.replace(/\r\n/g, '\n')
		.split('\n')
		.filter((l) => !START.test(l) && !END.test(l))
		.join('\n')
		.trim(); // only marker lines are removed: the code is shown exactly as verified
}

function dedent(code: string): string {
	const lines = code.split('\n');
	const widths = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length);
	const min = widths.length ? Math.min(...widths) : 0;
	return lines.map((l) => l.slice(min)).join('\n');
}

/** The output blocks shown for a sample: warnings, type checker, errors, program output. */
export function outputBlocks(sample: Sample): OutputBlock[] {
	const blocks: OutputBlock[] = [];
	const trim = (s: string) => s.replace(/\s+$/, '');
	const warningLabel = sample.lang === 'cs' ? 'Compiler warning' : 'Warning';
	if (sample.warnings) blocks.push({ variant: 'warning', label: warningLabel, text: trim(sample.warnings) });
	if (sample.typecheck) blocks.push({ variant: 'typecheck', label: 'Type checker (mypy)', text: trim(sample.typecheck) });
	if (sample.expect === 'compile-error') {
		const label = sample.lang === 'cs' ? 'Compile error' : 'Syntax error';
		blocks.push({ variant: 'compile-error', label, text: trim(sample.error!) });
		return blocks;
	}
	if (sample.output !== undefined && (sample.expect === 'run' || trim(sample.output))) {
		blocks.push({ variant: 'output', label: 'Output', text: trim(sample.output) });
	}
	if (sample.expect === 'exception') {
		const label = sample.lang === 'cs' ? 'Runtime error' : 'Traceback';
		blocks.push({ variant: 'exception', label, text: trim(sample.error!) });
	}
	return blocks;
}

/** Code frame title, e.g. "C# · Program.cs" or "Python · main.py". */
export function codeTitle(lang: Lang, file?: string): string {
	return `${LANGS[lang].name} · ${file ?? LANGS[lang].mainFile}`;
}
