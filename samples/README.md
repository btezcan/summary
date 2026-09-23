# Samples

Every code example and every output on the site comes from this folder. Pages
never copy code by hand: the `<Pair>`, `<Sample>`, `<Predict>`, `<Mistake>`,
`<Compare>` and `<Quiz>` components read these files at build time.

## Layout

One concept, two languages, one id:

```
samples/<chapter>/<example>/cs/Program.cs     C# file-based app (dotnet run Program.cs)
samples/<chapter>/<example>/py/main.py        Python script (python main.py)
```

Each language folder can also contain:

```
input.txt               (optional) text typed on the keyboard (standard input)
sample.json             (optional) settings, see below
expected-output.txt     standard output          ┐
expected-error.txt      compile error/exception  ├ written by verify-samples --update
expected-warnings.txt   warnings                 ┘
```

`<Pair id="types/overflow" />` shows `types/overflow/cs` and `types/overflow/py`
side by side. A concept that exists in only one language has only that folder.

A C# sample that needs several files gets a `.csproj` in its folder; show a file
with `<Sample id="..." lang="cs" file="Student.cs" />`. A Python sample can have
extra modules next to `main.py`.

## sample.json

| Setting | Meaning |
|---|---|
| `"expect": "compile-error"` | A compile error (C#) or `SyntaxError` (Python) is expected — the wrong side of a Mistake. |
| `"expect": "exception"` | An uncaught exception is expected; the header (C#) or full traceback (Python) is stored. |
| `"expect": "test"` | C# project run with `dotnet test`. |
| `"culture": true` | Locale data enabled. The sample must set its culture/locale explicitly in code. |
| `"langVersion": "13"` | C# only: uses a feature newer than C# 12. Add `<Note type="version">` on the page. |
| `"minPython": "3.13"` | Python only: needs a version newer than 3.12. Add `<Note type="version">` on the page. |
| `"buildOnly": true` | Compiled but not run (e.g. needs the internet). |
| `"nondeterministic": true` | Python only: output may change with the hash seed. Combine with `normalize`. |
| `"normalize": [...]` | Makes variable output stable: `{ "pattern": "\\d+ ms", "replace": "<time> ms" }`. |
| `"wide": true` | Lines may exceed 48 characters; `<Pair>` then shows the sample stacked. |
| `"timeoutMs": 5000` | Instead of the default timeout. |

## Rules the script enforces

- **C# 12** is the default language version (`Directory.Build.props`).
- **Python 3.14** runs every sample, and **Python 3.12** must run it the same way
  unless `minPython` says otherwise.
- **Invariant culture** (C#) and no locale (Python) by default: `3.5`, not `3,5`.
- **No unexpected warnings**: a compiler warning or Python `SyntaxWarning` fails
  the sample unless it is stored in `expected-warnings.txt` (because the warning is
  the point of the example).
- **Hash-order independence**: Python samples run with two `PYTHONHASHSEED` values
  and must print the same thing. Sort sets before printing them.
- **Line length**: at most 48 characters per line, so a pair fits side by side.
- `// #region name` … `// #endregion` (C#) and `# region name` … `# endregion`
  (Python) mark a part of a file that a page can show on its own.

## Commands

```sh
npm run verify                                  # everything
npm run verify -- --filter types                # one chapter
npm run verify -- --filter types/overflow --update   # save a new sample's output
```

`--update` saves whatever the program printed: read the output and make sure it is
right before committing it.
