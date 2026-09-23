# CLAUDE.md — C# & Python Comparative Reference Guide

This file tells Claude Code how to build and maintain this project. Read it at the
start of every session. The full chapter-by-chapter content plan is in
`docs/content-spec.md` — read the relevant chapter there before writing any page.

## What we are building

A static website that serves as a **comparative summary and reference guide for C#
and Python** for university students who have already taken (or are taking) an
introductory programming course. Every concept is taught in **both languages side
by side**, so students learn the idea once and see how each language expresses it.
It is not a first-time tutorial. Students come here to:

- review a topic quickly before a lab or exam,
- look up syntax and common patterns in either language,
- understand *why* the two languages behave differently (static vs dynamic typing,
  fixed-size vs arbitrary-precision integers, value vs reference semantics, …),
- check themselves with small "predict the output" exercises and quizzes,
- learn how to use AI assistants without letting them replace their thinking.

Audience: 1st–2nd year university students in Turkey. The instructor adds and
reviews content; students only read.

## Language rules

- **Everything is in English**: site UI, prose, code identifiers, code comments,
  string literals, commit messages, and source-code comments in this repo.
- Exception: Turkish text may appear *inside samples about locale* (e.g. the Turkish
  "İ" casing bug, `3,5` vs `3.5`). These stay because the students work on
  Turkish-locale machines; the explanation around them is in English.
- Keep sentences short and direct. No filler, no marketing tone, no emojis in prose.
- On the first use of a term that differs between the languages, name both:
  "method (C#) / function (Python)", "`null` / `None`".

## Comparative teaching rules

- **C# on the left, Python on the right**, always in that order (`<Pair>`).
- Teach the *concept* first, then show both languages. Don't teach one language
  and bolt the other on.
- Every comparison ends with **what differs and why** (1–3 sentences). Point out
  where the same-looking code behaves differently (`-7 % 3`, `/` on integers,
  integer overflow, dictionary order, string upper-casing and culture).
- When a topic exists in only one language (`struct`, `ref`/`out`, LINQ query
  syntax; multiple inheritance, `*args`, slicing), write a **"C# only" / "Python
  only"** note that names the closest idiom in the other language.
- Write idiomatic code in each language. Never write "C# in Python syntax" or the
  reverse: Python uses PEP 8 names (`calculate_average`), C# uses .NET names
  (`CalculateAverage`).

## Tech stack

- **Astro + Starlight** (docs framework): built-in search, sidebar, dark mode,
  code blocks with copy buttons, mobile layout. Use current stable versions;
  check the official docs rather than relying on memory for config syntax.
- Content in **MDX** files under `src/content/docs/`.
- Custom components in `src/components/` (see "Components" below).
- No backend, no database, no login. Everything is static.
- Deploy target: **GitHub Pages** via a GitHub Actions workflow.

## Language versions

### C#
- Target the **current .NET LTS SDK** (.NET 10 at the time of writing; run
  `dotnet --version` first).
- Teach features up to **C# 12** by default. `samples/Directory.Build.props` pins
  `LangVersion` 12, so a newer feature fails to compile unless the sample opts in
  with `"langVersion"` in `sample.json`; label it on the page with
  `<Note type="version">`.
- Modern style: top-level statements for small samples, file-scoped namespaces,
  `var` where the type is obvious, string interpolation, nullable reference types
  enabled.
- Do **not** teach outdated material as current: `ArrayList`, `Hashtable`,
  destructors as a normal tool, `csc.exe` command-line workflows, Visual Studio
  .NET–era screenshots. Mention them only as "old code you may see".

### Python
- Run samples on **Python 3.14** (current stable). Teach features up to
  **Python 3.12** by default. The verification script also runs every Python sample
  on 3.12; a sample that needs a newer version declares `"minPython"` in
  `sample.json` and gets a `<Note type="version">` on the page.
- Modern style: f-strings, `pathlib`, type hints where they help the comparison
  with C# (function signatures, dataclasses), `if __name__ == "__main__":` only when
  the sample is about modules.
- Do **not** teach outdated material as current: Python 2 (`print` statement,
  `raw_input`, `%`-formatting as the default), `os.path` where `pathlib` is
  clearer. Mention them only as "old code you may see".
- Students use the official installer or `uv`; don't depend on the macOS/Linux
  system Python.

## Correctness is the top priority

This project exists partly because old course slides contained code that did
not compile and wrong facts. Therefore:

1. **Every code example must compile/parse and run.** Each runnable example lives in
   `samples/<chapter>/<example>/cs/` (a file-based app `Program.cs`, or a project)
   and/or `samples/<chapter>/<example>/py/main.py`. The MDX page imports that exact
   code through the components; never copy code into MDX by hand.
2. **Every "Output" block must be produced by actually running the sample**, never
   written from memory. `scripts/verify-samples` runs all samples and compares
   output, compiler errors, exceptions/tracebacks and warnings against stored
   `expected-*.txt` files.
3. Samples run with invariant culture (C#) and without a locale (Python) unless the
   example is *about* locale. When locale matters, set it explicitly in code and say
   so on the page.
4. Python output must not depend on hash order: the script runs every Python sample
   with two different `PYTHONHASHSEED` values and fails if the output differs.
5. Numeric facts (type sizes, ranges) must match the official documentation.
   When unsure, write a tiny program to check (`long.MaxValue`, `sys.float_info`).
6. Do not invent APIs. If you are not sure a method exists, check it by running a
   sample.
7. CI builds and runs every sample on every push; the site build fails if a sample
   fails.
8. Code lines in samples are at most 48 characters so `<Pair>` fits side by side;
   a sample that genuinely needs longer lines sets `"wide": true` and is shown
   stacked.

## Page template

Every topic page follows this structure:

1. **Summary** — 3–5 short bullet points. What must a student remember, in both
   languages?
2. **Concept** — explanation in prose, with a small diagram where it helps
   (e.g. stack vs heap, CLR vs CPython). Explain *why*, not just *what*.
3. **Examples** — 2–5 runnable `<Pair>` examples, simple to realistic. Each:
   short intro sentence → C# | Python → outputs → "what differs and why".
4. **Common Mistakes** — wrong code, the error or wrong output it produces, and
   the fix. Mistakes are usually language-specific; label which language.
5. **Predict the Output** — 2–3 small snippets with a hidden answer and
   explanation. Include at least one where the two languages disagree.
6. **Mini Quiz** — 3–5 multiple-choice questions with explanations.
7. **Cheat Sheet** — compact two-column syntax table (C# | Python).
8. **Working with AI** — 1–2 good prompts for learning this topic and one thing
   students must verify themselves.

Skip a section only when it genuinely does not apply.

## Components

- `<Pair>` — C# and Python code side by side with aligned outputs and a
  "what differs" slot; stacks on narrow screens.
- `<Sample>` — one verified sample (`lang="cs"` or `lang="py"`) with its output.
- `<Output>` — styled block for program output, visually distinct from code.
- `<Predict>` — code snippet + "Show answer" button revealing answer and explanation.
- `<Quiz>` — multiple choice, instant feedback per question, explanation shown after
  answering, score at the end. Questions defined as data in the MDX file.
- `<Mistake>` — two-column (stacks on mobile) "Wrong / Right" comparison with the
  resulting error message.
- `<Note type="tip|warning|version|history">` — callouts. `history` is for
  "old code you may see" remarks.
- `<Compare>` — side-by-side table/code for concepts like class vs record vs
  dataclass.
- Progress checklist on the home page (topics marked as "reviewed"), stored in
  `localStorage`, wrapped in try/catch and working when storage is empty.

All components: keyboard accessible, visible focus, work without JavaScript
where possible (answers hidden with `<details>` as a fallback), respect
`prefers-reduced-motion`.

## Design direction

- Primary job: fast, calm reading of code and explanations, on laptop and phone.
- Code is the hero: excellent monospace font, generous code block spacing,
  clear distinction between code, output, and wrong code.
- The approved design is "Defter ve Çini" (`src/styles/theme.css`): six colors,
  each with one meaning. Languages are distinguished by text labels, not by new
  colors. Propose any design change before making it.
- Light and dark themes must both be fully readable (check contrast).
- Line length under ~80 characters for prose.

## Site structure

```
/                         Home: how to use the guide, topic map, progress checklist
/getting-started/         dotnet CLI and python/uv, project structure, how code runs
/types/                   Types, variables, conversions
/operators/               Operators and expressions
/strings/                 Strings and formatting
/control-flow/            Conditions, switch/match, pattern matching, loops
/functions/               Methods (C#) and functions (Python)
/collections/             Arrays, lists, dictionaries, sets, queues
/classes/                 Classes, objects, properties, constructors, static
/records-structs-enums/   Records, structs, enums; dataclasses, enums
/inheritance/             Inheritance, polymorphism, abstract classes, interfaces/protocols
/null-safety/             null and nullable reference types; None and Optional
/exceptions/              Exceptions in both languages
/generics-lambdas/        Generics, delegates, lambdas; type variables, callables
/querying-collections/    LINQ; comprehensions, generators, itertools
/files/                   File I/O, using and with
/async/                   async / await in both languages
/debugging-testing/       Debugging, xUnit and pytest
/learning-with-ai/        How to learn programming with AI
/appendices/              Operator overloading and dunder methods, indexers, bitwise,
                          under the hood (CLR, CPython), date/time, Git basics
/cheat-sheet/             One-page printable cheat sheet (print CSS)
```

## Workflow rules for Claude Code

- Work one chapter at a time. After each chapter: build the site, run
  `scripts/verify-samples`, and report what was added.
- Use plan mode for structural changes; ask before adding dependencies (npm
  packages, NuGet packages, Python packages such as mypy or pytest).
- Never mark a task done if the build or sample verification fails.
- Commit after each completed chapter with a clear message
  (`content: add querying-collections chapter with 6 verified sample pairs`).
- Keep `docs/content-spec.md` as the source of truth for scope. If you think
  content should be added or removed, propose it; don't silently change scope.
