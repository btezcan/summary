// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { appendices, chapterGroups, extraPages } from './src/data/chapters.mjs';
import remarkBaseLinks from './src/plugins/remark-base-links.mjs';

// TODO: replace with the real GitHub repository once it exists.
const REPO = 'USER/REPO-NAME';

// In CI (GitHub Pages) both values come from actions/configure-pages.
// Locally the site is served from the root ("/").
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
			title: 'C# & Python Side by Side',
			description:
				'A comparative C# and Python reference for university students: syntax, concepts, verified examples and exercises.',
			locales: {
				root: { label: 'English', lang: 'en' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${REPO}` }],
			editLink: { baseUrl: `https://github.com/${REPO}/edit/main/` },
			lastUpdated: true,
			head: [
				{
					// Print with the light theme (dark text on white paper), then restore.
					tag: 'script',
					content: `addEventListener('beforeprint', () => {
	const r = document.documentElement;
	r.dataset.themeBeforePrint = r.dataset.theme;
	r.dataset.theme = 'light';
});
addEventListener('afterprint', () => {
	const r = document.documentElement;
	if (r.dataset.themeBeforePrint) r.dataset.theme = r.dataset.themeBeforePrint;
	delete r.dataset.themeBeforePrint;
});`,
				},
			],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			sidebar: [
				...chapterGroups.map((group) => ({
					label: group.label,
					items: group.chapters.map((c) => ({ label: c.label, slug: c.slug })),
				})),
				{
					label: 'Appendices',
					collapsed: true,
					items: appendices.map((p) => ({ label: p.label, slug: p.slug })),
				},
				{
					label: 'Reference',
					items: extraPages.map((p) => ({ label: p.label, slug: p.slug })),
				},
			],
			// Code block themes: ec.config.mjs
			customCss: [
				'@fontsource-variable/atkinson-hyperlegible-next/wght.css',
				'@fontsource-variable/atkinson-hyperlegible-next/wght-italic.css',
				'@fontsource-variable/source-serif-4/wght.css',
				'@fontsource-variable/jetbrains-mono/wght.css',
				'./src/styles/theme.css',
				'./src/styles/components.css',
				'./src/styles/print.css',
			],
		}),
	],
});
