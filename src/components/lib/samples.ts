// samples/ klasöründeki doğrulanmış örnekleri derleme zamanında okur.
// Sayfalardaki kod ve çıktı her zaman buradan gelir; elle kopyalanmaz.
// Olmayan ya da doğrulanmamış bir örneğe başvurulursa site derlemesi hata verir.

const files = import.meta.glob<string>(
	['/samples/**/*.{cs,txt,json}', '!/samples/**/{bin,obj}/**'],
	{ query: '?raw', import: 'default', eager: true },
);

export type Expect = 'run' | 'compile-error' | 'exception' | 'test';

export interface Sample {
	id: string;
	expect: Expect;
	culture: boolean;
	langVersion?: string;
	input?: string;
	output?: string;
	error?: string;
	warnings?: string;
}

export interface OutputBlock {
	variant: 'output' | 'warning' | 'compile-error' | 'exception';
	label: string;
	text: string;
}

function read(id: string, name: string): string | undefined {
	return files[`/samples/${id}/${name}`];
}

export function getSample(id: string): Sample {
	const hasCode = Object.keys(files).some((k) => k.startsWith(`/samples/${id}/`) && k.endsWith('.cs'));
	if (!hasCode) throw new Error(`Örnek bulunamadı: samples/${id}/`);

	const json = read(id, 'sample.json');
	const opts = json ? JSON.parse(json) : {};
	const sample: Sample = {
		id,
		expect: opts.expect ?? 'run',
		culture: opts.culture ?? false,
		langVersion: opts.langVersion,
		input: read(id, 'input.txt'),
		output: read(id, 'expected-output.txt'),
		error: read(id, 'expected-error.txt'),
		warnings: read(id, 'expected-warnings.txt'),
	};

	const needsOutput = (sample.expect === 'run' && !opts.buildOnly) || sample.expect === 'exception';
	const needsError = sample.expect === 'compile-error' || sample.expect === 'exception';
	if ((needsOutput && sample.output === undefined) || (needsError && sample.error === undefined)) {
		throw new Error(
			`Örnek doğrulanmamış: samples/${id}/ — "npm run verify -- --filter ${id} --update" çalıştırıp çıktıyı kontrol edin.`,
		);
	}
	return sample;
}

/** Örneğin kaynak dosyası. `region` verilirse yalnızca "// #region ad" ile "// #endregion" arası. */
export function getCode(id: string, file = 'Program.cs', region?: string): string {
	const code = read(id, file);
	if (code === undefined) throw new Error(`Dosya bulunamadı: samples/${id}/${file}`);
	return region ? extractRegion(code, region, `samples/${id}/${file}`) : stripRegionMarkers(code);
}

const REGION_START = /^\s*\/\/\s*#region\b\s*(.*)$/;
const REGION_END = /^\s*\/\/\s*#endregion\b/;

function extractRegion(code: string, name: string, where: string): string {
	const lines = code.replace(/\r\n/g, '\n').split('\n');
	const start = lines.findIndex((l) => REGION_START.exec(l)?.[1].trim() === name);
	if (start < 0) throw new Error(`Bölge bulunamadı: "${name}" (${where})`);
	const end = lines.findIndex((l, i) => i > start && REGION_END.test(l));
	if (end < 0) throw new Error(`Bölge kapatılmamış: "${name}" (${where})`);
	return dedent(stripRegionMarkers(lines.slice(start + 1, end).join('\n')));
}

function stripRegionMarkers(code: string): string {
	return code
		.replace(/\r\n/g, '\n')
		.split('\n')
		.filter((l) => !REGION_START.test(l) && !REGION_END.test(l))
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

function dedent(code: string): string {
	const lines = code.split('\n');
	const widths = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length);
	const min = widths.length ? Math.min(...widths) : 0;
	return lines.map((l) => l.slice(min)).join('\n');
}

/** Bir örnek için gösterilecek çıktı blokları: uyarılar, hata, program çıktısı. */
export function outputBlocks(sample: Sample): OutputBlock[] {
	const blocks: OutputBlock[] = [];
	const trim = (s: string) => s.replace(/\s+$/, '');
	if (sample.warnings) blocks.push({ variant: 'warning', label: 'Derleyici uyarısı', text: trim(sample.warnings) });
	if (sample.expect === 'compile-error') {
		blocks.push({ variant: 'compile-error', label: 'Derleme hatası', text: trim(sample.error!) });
		return blocks;
	}
	if (sample.output !== undefined && (sample.expect === 'run' || trim(sample.output))) {
		blocks.push({ variant: 'output', label: 'Çıktı', text: trim(sample.output) });
	}
	if (sample.expect === 'exception') {
		blocks.push({ variant: 'exception', label: 'Çalışma zamanı hatası', text: trim(sample.error!) });
	}
	return blocks;
}
