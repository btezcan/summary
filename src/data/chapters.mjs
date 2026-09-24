// The chapter list: the sidebar (astro.config.mjs) and the home page progress
// checklist are both generated from this single source. When adding a chapter,
// only change this file (and add its page).

/**
 * @typedef {{ slug: string, label: string, blurb?: string }} Chapter
 * @typedef {{ label: string, chapters: Chapter[] }} ChapterGroup
 */

/** @type {ChapterGroup[]} */
export const chapterGroups = [
	{
		label: 'Basics',
		chapters: [
			{ slug: 'getting-started', label: 'Getting Started', blurb: 'dotnet and python, project files, how code runs' },
			{ slug: 'types', label: 'Types and Variables', blurb: 'static vs dynamic typing, overflow, conversions' },
			{ slug: 'operators', label: 'Operators', blurb: '`/` and `//`, `%` on negatives, `??` vs `or`' },
			{ slug: 'strings', label: 'Strings', blurb: 'interpolation, f-strings, formatting, the Turkish İ' },
			{ slug: 'control-flow', label: 'Control Flow', blurb: 'if, switch expressions, match, loops' },
			{ slug: 'functions', label: 'Methods and Functions', blurb: 'parameters, defaults, tuples, recursion' },
			{ slug: 'collections', label: 'Arrays and Collections', blurb: 'List/list, Dictionary/dict, sets, queues, slicing' },
		],
	},
	{
		label: 'Objects',
		chapters: [
			{ slug: 'classes', label: 'Classes and Objects', blurb: 'properties, constructors, static members, `__str__`' },
			{ slug: 'records-structs-enums', label: 'Records, Structs, Enums', blurb: 'records vs dataclasses, value types, enums' },
			{ slug: 'inheritance', label: 'Inheritance and Polymorphism', blurb: 'virtual/override, abstract classes, interfaces vs protocols' },
		],
	},
	{
		label: 'Modern Features',
		chapters: [
			{ slug: 'null-safety', label: 'Null Safety', blurb: 'nullable reference types, `None` and `Optional`' },
			{ slug: 'exceptions', label: 'Exceptions', blurb: 'try/catch/except, raising, EAFP vs LBYL' },
			{ slug: 'generics-lambdas', label: 'Generics and Lambdas', blurb: 'generics, type variables, delegates, closures' },
			{ slug: 'querying-collections', label: 'Querying Collections', blurb: 'LINQ vs comprehensions and generators' },
			{ slug: 'files', label: 'Files and Cleanup', blurb: 'reading and writing files, `using` and `with`, JSON' },
			{ slug: 'async', label: 'async / await', blurb: 'Task and coroutines, WhenAll and gather' },
		],
	},
	{
		label: 'Tools & Practice',
		chapters: [
			{ slug: 'debugging-testing', label: 'Debugging and Testing', blurb: 'compiler errors, debugger, xUnit and pytest' },
			{ slug: 'learning-with-ai', label: 'Learning with AI', blurb: 'using AI as a tutor, verifying its code' },
		],
	},
];

/** Short optional pages, listed after the chapters; not part of the progress checklist. */
export const appendices = [
	{ slug: 'appendices', label: 'Overview' },
	{ slug: 'appendices/operator-overloading', label: 'Operator Overloading' },
	{ slug: 'appendices/indexers', label: 'Indexers and __getitem__' },
	{ slug: 'appendices/bitwise', label: 'Bitwise Operators' },
	{ slug: 'appendices/under-the-hood', label: 'Under the Hood' },
	{ slug: 'appendices/date-time', label: 'Date and Time' },
	{ slug: 'appendices/git-basics', label: 'Git Basics' },
	{ slug: 'appendices/old-code', label: 'Old Code You May See' },
];

/** Listed separately in the sidebar; not part of the progress checklist. */
export const extraPages = [{ slug: 'cheat-sheet', label: 'Cheat Sheet' }];

/** Chapter number (from 1), matching the numbering in docs/content-spec.md. */
export const allChapters = chapterGroups
	.flatMap((g) => g.chapters)
	.map((c, i) => ({ ...c, number: i + 1 }));
