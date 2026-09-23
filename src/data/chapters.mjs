// The chapter list: the sidebar (astro.config.mjs) and the home page progress
// checklist are both generated from this single source. When adding a chapter,
// only change this file (and add its page).

/**
 * @typedef {{ slug: string, label: string }} Chapter
 * @typedef {{ label: string, chapters: Chapter[] }} ChapterGroup
 */

/** @type {ChapterGroup[]} */
export const chapterGroups = [
	{
		label: 'Basics',
		chapters: [
			{ slug: 'getting-started', label: 'Getting Started' },
			{ slug: 'types', label: 'Types and Variables' },
			{ slug: 'operators', label: 'Operators' },
			{ slug: 'strings', label: 'Strings' },
			{ slug: 'control-flow', label: 'Control Flow' },
			{ slug: 'functions', label: 'Methods and Functions' },
			{ slug: 'collections', label: 'Arrays and Collections' },
		],
	},
	{
		label: 'Objects',
		chapters: [
			{ slug: 'classes', label: 'Classes and Objects' },
			{ slug: 'records-structs-enums', label: 'Records, Structs, Enums' },
			{ slug: 'inheritance', label: 'Inheritance and Polymorphism' },
		],
	},
	{
		label: 'Modern Features',
		chapters: [
			{ slug: 'null-safety', label: 'Null Safety' },
			{ slug: 'exceptions', label: 'Exceptions' },
			{ slug: 'generics-lambdas', label: 'Generics and Lambdas' },
			{ slug: 'querying-collections', label: 'Querying Collections' },
			{ slug: 'files', label: 'Files and Cleanup' },
			{ slug: 'async', label: 'async / await' },
		],
	},
	{
		label: 'Tools & Practice',
		chapters: [
			{ slug: 'debugging-testing', label: 'Debugging and Testing' },
			{ slug: 'learning-with-ai', label: 'Learning with AI' },
		],
	},
];

/** Listed separately in the sidebar; not part of the progress checklist. */
export const extraPages = [
	{ slug: 'appendices', label: 'Appendices' },
	{ slug: 'cheat-sheet', label: 'Cheat Sheet' },
];

/** Chapter number (from 1), matching the numbering in docs/content-spec.md. */
export const allChapters = chapterGroups
	.flatMap((g) => g.chapters)
	.map((c, i) => ({ ...c, number: i + 1 }));
