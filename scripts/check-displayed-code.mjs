#!/usr/bin/env node
// After `astro build`: checks that every sample file of a chapter appears on that
// chapter's page exactly as verified (only region marker lines removed). Catches
// samples that were never put on the page and any change to code on its way to HTML.
//
// Usage: node scripts/check-displayed-code.mjs [chapter ...]   (default: all chapters)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MARKER = /^\s*(\/\/|#)\s*#?(end)?region\b/;
const MAIN = { cs: 'Program.cs', py: 'main.py' };

const decode = (t) =>
	t
		.replace(/<[^>]+>/g, '')
		.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/\n$/, '');

/** The text of every Expressive Code block on a built page. */
function codeBlocks(html) {
	return new Set(
		[...html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g)].map((m) =>
			m[1].split(/<div class="ec-line[^"]*">/).slice(1).map(decode).join('\n').trim(),
		),
	);
}

/** The text of each "region name" … "endregion" block, dedented like the site shows it. */
function regions(text) {
	const lines = text.replace(/\r\n/g, '\n').split('\n');
	const out = [];
	lines.forEach((l, i) => {
		if (!/^\s*(\/\/|#)\s*#?region\b/.test(l)) return;
		const end = lines.findIndex((m, j) => j > i && /^\s*(\/\/|#)\s*#?endregion\b/.test(m));
		const body = lines.slice(i + 1, end).filter((m) => !MARKER.test(m));
		const indent = Math.min(...body.filter((m) => m.trim()).map((m) => m.match(/^ */)[0].length));
		out.push(body.map((m) => m.slice(indent)).join('\n').trim());
	});
	return out;
}

const chapters = process.argv.slice(2).length
	? process.argv.slice(2)
	: fs.readdirSync(path.join(ROOT, 'samples')).filter((d) => fs.existsSync(path.join(ROOT, 'dist', d, 'index.html')));

let failures = 0;
for (const ch of chapters) {
	const shown = codeBlocks(fs.readFileSync(path.join(ROOT, 'dist', ch, 'index.html'), 'utf8'));
	const missing = [];
	let ok = 0;
	for (const ex of fs.readdirSync(path.join(ROOT, 'samples', ch))) {
		for (const [lang, file] of Object.entries(MAIN)) {
			const p = path.join(ROOT, 'samples', ch, ex, lang, file);
			if (!fs.existsSync(p)) continue;
			const text = fs.readFileSync(p, 'utf8');
			const full = text.split('\n').filter((l) => !MARKER.test(l)).join('\n').trim();
			const parts = regions(text);
			// Shown if the whole file appears, or (for a file with regions) every region does.
			if (shown.has(full) || (parts.length > 0 && parts.every((r) => shown.has(r)))) ok++;
			else missing.push(`samples/${ch}/${ex}/${lang}/${file}`);
		}
	}
	console.log(`${missing.length ? '✗' : '✓'} ${ch}: ${ok} sample files shown verbatim`);
	for (const m of missing) console.log(`    not shown verbatim: ${m}`);
	failures += missing.length;
}
process.exit(failures ? 1 : 0);
