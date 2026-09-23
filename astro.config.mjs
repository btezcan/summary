// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { chapterGroups, extraPages } from './src/data/chapters.mjs';
import remarkBaseLinks from './src/plugins/remark-base-links.mjs';

// TODO: GitHub deposu oluşturulunca "KULLANICI/REPO-ADI" kısmını güncelle.
const REPO = 'KULLANICI/REPO-ADI';

// CI (GitHub Pages) bu iki değeri actions/configure-pages çıktısından verir.
// Yerelde site kökten ("/") sunulur.
const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
	site,
	base,
	markdown: {
		remarkPlugins: [[remarkBaseLinks, { base }]],
	},
	integrations: [
		starlight({
			title: 'C# Başvuru Rehberi',
			description:
				'Üniversite öğrencileri için C# özet ve başvuru rehberi: sözdizimi, kavramlar, doğrulanmış örnekler ve alıştırmalar.',
			locales: {
				root: { label: 'Türkçe', lang: 'tr' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${REPO}` }],
			editLink: { baseUrl: `https://github.com/${REPO}/edit/main/` },
			lastUpdated: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			sidebar: [
				...chapterGroups.map((group) => ({
					label: group.label,
					items: group.chapters.map((c) => ({ label: c.label, slug: c.slug })),
				})),
				{
					label: 'Ekler',
					items: extraPages.map((p) => ({ label: p.label, slug: p.slug })),
				},
			],
			// Kod bloklarının teması: ec.config.mjs
			customCss: [
				'@fontsource-variable/atkinson-hyperlegible-next/wght.css',
				'@fontsource-variable/atkinson-hyperlegible-next/wght-italic.css',
				'@fontsource-variable/source-serif-4/wght.css',
				'@fontsource-variable/jetbrains-mono/wght.css',
				'./src/styles/theme.css',
				'./src/styles/components.css',
			],
		}),
	],
});
