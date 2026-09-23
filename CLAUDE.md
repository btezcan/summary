# CLAUDE.md — C# Reference Guide for University Students

This file tells Claude Code how to build and maintain this project. Read it at the
start of every session. The full chapter-by-chapter content plan is in
`docs/content-spec.md` — read the relevant chapter there before writing any page.

## What we are building

A static website that serves as a **summary and reference guide for C#** for
university students who have already taken (or are taking) an introductory
programming course. It is not a first-time tutorial. Students come here to:

- review a topic quickly before a lab or exam,
- look up syntax and common patterns,
- understand *why* something behaves the way it does,
- check themselves with small "predict the output" exercises and quizzes,
- learn how to use AI assistants without letting them replace their thinking.

Audience: 1st–2nd year university students in Turkey. The instructor adds and
reviews content; students only read.

## Language rules

- Site UI and prose: **Turkish**.
- On the first use of a technical term on a page, give the English term in
  parentheses: "değer türü (value type)". Afterwards use one term consistently.
- Code identifiers (class, method, variable names): **English**
  (`Student`, `CalculateAverage`). Comments and string literals shown to the
  user may be Turkish.
- Keep sentences short and direct. No filler, no marketing tone, no emojis in prose.

## Tech stack

- **Astro + Starlight** (docs framework): built-in search, sidebar, dark mode,
  code blocks with copy buttons, mobile layout. Use current stable versions;
  check the official docs rather than relying on memory for config syntax.
- Content in **MDX** files under `src/content/docs/`.
- Custom components in `src/components/` (see "Components" below).
- No backend, no database, no login. Everything is static.
- Deploy target: **GitHub Pages** via a GitHub Actions workflow.

## C# version

- Target **the current .NET LTS SDK** installed on this machine (run
  `dotnet --version` first; .NET 10 / C# 14 at the time of writing).
- Teach features up to **C# 12** as the default. If you use a newer feature,
  label it with the version in a small note.
- Use modern style: top-level statements for small samples, file-scoped
  namespaces, `var` where the type is obvious, string interpolation,
  nullable reference types enabled.
- Do **not** teach outdated material as current: `ArrayList`, `Hashtable`,
  destructors as a normal tool, `csc.exe` command-line workflows, Visual
  Studio .NET–era screenshots. Mention them only as "you may see this in old code".

## Correctness is the top priority

This project exists partly because old course slides contained code that did
not compile and wrong facts. Therefore:

1. **Every code example must compile and run.** Each runnable example lives in
   `samples/<chapter-slug>/<example-name>/` as its own console project
   (or a single-file app, if the installed SDK supports `dotnet run file.cs`).
   The MDX page imports or mirrors that exact code.
2. **Every "Output" block must be produced by actually running the sample**,
   never written from memory. Use `scripts/verify-samples` (create it) to run
   all samples and compare output against stored `expected-output.txt` files.
3. Run samples with `DOTNET_CLI_UI_LANGUAGE=en` and invariant culture unless the
   example is *about* culture. When culture matters (decimal separator, Turkish
   "İ" problem), set the culture explicitly in code and say so on the page.
4. Numeric facts (type sizes, ranges) must match the official C# documentation.
   When unsure, write a tiny program to check (`Console.WriteLine(long.MaxValue)`).
5. Do not invent APIs. If you are not sure a method exists, check it by
   compiling a sample.
6. Add a CI job that builds every sample and runs the verification script on
   every push. The site build must fail if a sample fails.

## Page template

Every topic page follows this structure (headings in Turkish):

1. **Özet (TL;DR)** — 3–5 short bullet points. What must a student remember?
2. **Kavram (Concept)** — explanation in prose, with a small diagram where it helps
   (e.g. stack vs heap). Explain *why*, not just *what*.
3. **Örnekler (Examples)** — 2–5 runnable examples, simple to realistic.
   Each example: short intro sentence → code → output → 1–3 sentences explaining
   the interesting line.
4. **Sık Yapılan Hatalar (Common Mistakes)** — wrong code, the error or wrong
   output it produces, and the fix.
5. **Çıktıyı Tahmin Et (Predict the Output)** — 2–3 small snippets with a hidden
   answer and explanation.
6. **Mini Quiz** — 3–5 multiple-choice questions with explanations.
7. **Hızlı Başvuru (Cheat Sheet)** — compact syntax table for this topic.
8. **Yapay Zekâ ile Çalışırken (Working with AI)** — 1–2 good prompts for learning
   this topic and one thing students must verify themselves.

Skip a section only when it genuinely does not apply.

## Components to build

- `<Output>` — styled block for program output, visually distinct from code.
- `<Predict>` — code snippet + "Cevabı göster" button revealing answer and explanation.
- `<Quiz>` — multiple choice, instant feedback per question, explanation shown after
  answering, score at the end. Questions defined as data in the MDX file.
- `<Mistake>` — two-column (stacks on mobile) "Hatalı / Doğru" comparison with the
  resulting error message.
- `<Note type="tip|warning|version|history">` — callouts. `history` is for
  "old code you may see" remarks.
- `<Compare>` — side-by-side table/code for concepts like class vs struct vs record.
- Progress checklist on the home page (topics marked as "reviewed"), stored in
  `localStorage`, wrapped in try/catch and working when storage is empty.

All components: keyboard accessible, visible focus, work without JavaScript
where possible (answers hidden with `<details>` as a fallback), respect
`prefers-reduced-motion`.

## Design direction

- Primary job: fast, calm reading of code and explanations, on laptop and phone.
- Code is the hero: excellent monospace font, generous code block spacing,
  clear distinction between code, output, and wrong code.
- Before writing CSS, propose a short design plan (4–6 named colors, typefaces
  and roles, layout sketch) and wait for approval. Avoid generic template looks.
- Light and dark themes must both be fully readable (check contrast).
- Line length under ~80 characters for prose.

## Site structure

```
/                       Home: how to use the guide, topic map, progress checklist
/baslarken/             Getting started: dotnet CLI, project structure, how code runs
/turler/                Types, variables, conversions
/operatorler/           Operators and expressions
/stringler/             Strings and formatting
/kontrol-akisi/         Conditions, switch, pattern matching, loops
/metotlar/              Methods
/koleksiyonlar/         Arrays and collections
/siniflar/              Classes, objects, properties, constructors, static
/record-struct-enum/    Records, structs, enums
/kalitim/               Inheritance, polymorphism, abstract, interfaces
/null-guvenligi/        Null and nullable reference types
/hatalar/               Exceptions
/generics-lambda/       Generics, delegates, lambdas
/linq/                  LINQ
/dosyalar/              File I/O and `using`
/async/                 async / await basics
/hata-ayiklama-test/    Debugging and unit testing
/yapay-zeka/            How to learn programming with AI
/ekler/                 Appendices: operator overloading, indexers, bitwise, CLR internals, Git basics
/kopya-kagidi/          One-page printable cheat sheet (print CSS)
```

## Workflow rules for Claude Code

- Work one chapter at a time. After each chapter: build the site, run
  `scripts/verify-samples`, and report what was added.
- Use plan mode for structural changes; ask before adding dependencies.
- Never mark a task done if the build or sample verification fails.
- Commit after each completed chapter with a clear message
  (`content: add LINQ chapter with 5 verified samples`).
- Keep `docs/content-spec.md` as the source of truth for scope. If you think
  content should be added or removed, propose it; don't silently change scope.
