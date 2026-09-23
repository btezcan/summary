# Content Specification — C# & Python Comparative Reference Guide

This is the source of truth for **what** each page covers. `CLAUDE.md` defines
**how** pages are built. For every chapter below you'll find:

- **Goal** — what a student should be able to do after reading.
- **Must cover** — the topics, in order, with the C# ↔ Python correspondence.
- **Key pairs** — starting code in both languages. Treat them as seeds: turn each
  into a verified sample pair under `samples/<chapter>/<example>/{cs,py}/`, run it,
  and use the real output. Outputs noted here are for orientation only; the running
  program is the authority.
- **Where they differ** — the behaviors that look the same but aren't. These are
  the most valuable parts of each page; build Predict and Quiz items from them.
- **Common mistakes** — per language, to build `<Mistake>` blocks from.
- **Predict / quiz ideas** — seeds for exercises.
- **Leave out** — things deliberately not covered (or moved to appendices).

---

## Proposed scope changes (for the instructor's review)

The move from "C# only, Turkish" to "C# and Python, English" changes some chapters.
Nothing below is final until the instructor approves it.

**Renamed**
- Ch. 6 "Methods" → **"Methods and Functions"** (`/functions/`).
- Ch. 14 "LINQ" → **"Querying Collections"** (`/querying-collections/`): LINQ and
  Python comprehensions, generators, `sorted`, `itertools`.
- All URLs are English (see the site structure in `CLAUDE.md`).

**Added (Python-only topics that students need)**
- Slicing (ch. 7), `*args` / `**kwargs` (ch. 6), comprehensions and generators
  (ch. 14), multiple inheritance and MRO (ch. 10, short), context managers and
  `with` (ch. 15), dunder methods (appendix, next to operator overloading),
  `dis` and CPython bytecode (appendix "Under the hood").
- The "old code you may see" appendix gains a Python 2 section.

**Kept as C#-only topics** (with a note naming the closest Python idiom)
- `struct` / value types, `ref` / `out` / `in`, `checked` arithmetic, LINQ query
  syntax (short), events (short), `const` vs `readonly`.

**Changed in scope**
- **Cheat sheet:** two columns (C# | Python) need about two A4 pages instead of one.
- **Mini projects:** a reference solution in both languages.
- **Testing (ch. 17):** Python tests use **pytest**, which is a new dependency and
  needs approval. The fallback is the built-in `unittest`.
- **Type-checker examples** (ch. 2, 11, 13) would use **mypy**, also a new
  dependency needing approval. Without it, those points are made in prose only.

**Removed**
- Nothing from the original spec.

---

## Facts that must be right (both languages)

C# (these were wrong in the old slides):
- `decimal` is **16 bytes**, not 12.
- `long` range is about **±9.22 × 10¹⁸**; `ulong` max is about **1.84 × 10¹⁹**.
- .NET's garbage collector is a **tracing, generational** collector, not reference counting.
- "Value types live on the stack" is an oversimplification: a value-type field
  inside a class object lives on the heap with that object.
- C# is multi-paradigm, not "100% object-oriented"; not everything is a class
  (`int` is a struct, there are also records, enums, delegates, interfaces).
- Keywords are lowercase (`class`, not `Class`); code must use straight quotes `"`.

Python:
- CPython manages memory with **reference counting plus a cyclic garbage
  collector**. This is a real difference from .NET, not a mistake to "correct".
- Python `int` has **arbitrary precision**: it never overflows. `float` is an IEEE
  754 double (same as C# `double`), so `0.1 + 0.2 != 0.3` in both.
- `bool` is a subclass of `int` (`True + True == 2`).
- Python has no `char` type: a one-character string is still a `str`.
- `dict` preserves insertion order (guaranteed since 3.7). C#'s `Dictionary` does
  **not** guarantee order.
- Python is dynamically **and strongly** typed: `"1" + 2` is a `TypeError`
  (C# gives `"12"`).
- Type hints are **not enforced at runtime**; only a type checker (mypy, pyright)
  reads them.

---

## 0. Home page (`/`)

**Goal:** Students understand what this site is and how to use it.

- One short paragraph: a review and reference guide that teaches each concept in
  C# and Python side by side; not a first course.
- "How to use this guide": read the Summary first; try Predict exercises *before*
  revealing; run the samples yourself in both languages; don't copy — type.
- "Why two languages": seeing the same idea in a statically typed, compiled language
  and a dynamically typed, interpreted one makes the idea itself clearer.
- Topic map grouped into: Basics, Objects, Modern Features, Tools & Practice.
- Progress checklist (localStorage).
- Link to `/learning-with-ai/` with one sentence: "AI can write code; this site
  helps you understand, check and improve it."

---

## 1. Getting Started (`/getting-started/`)

**Goal:** Create, run, and understand the structure of a program in both languages.

**Must cover**
1. Installing the .NET SDK (`dotnet --version`) and Python 3.14 (official installer
   or `uv`; `python --version`). Why not to rely on the system Python.
2. C#: `dotnet new console -n HelloApp`, `cd HelloApp`, `dotnet run`; files
   (`Program.cs`, `.csproj`, `bin/`, `obj/`). File-based apps: `dotnet run hello.cs`
   (.NET 10, version note).
   Python: `python hello.py`; the REPL; a virtual environment (`python -m venv .venv`
   or `uv venv`) — what it is for, in two sentences.
3. Program structure: top-level statements vs `Main` (C#); a script runs top to
   bottom, `if __name__ == "__main__":` (Python, short).
4. `using` directives and namespaces ↔ `import` and modules. Output and input:
   `Console.WriteLine` / `Console.ReadLine` ↔ `print` / `input`.
5. How code runs — one diagram with two lanes:
   C# → compiler → IL in an assembly → CLR JIT → machine code.
   Python → CPython compiles to bytecode (`__pycache__`) → interpreter loop.
   Memory: .NET tracing GC ↔ CPython reference counting + cycle collector
   (one sentence each).
6. Editors: VS Code (C# Dev Kit, Python extension), Visual Studio, Rider, PyCharm.

**Key pairs**

```csharp
// Program.cs — top-level statements
Console.WriteLine("Hello, World!");
```
```python
# main.py
print("Hello, World!")
```

```csharp
Console.Write("Your name: ");
string? name = Console.ReadLine();
Console.WriteLine($"Welcome, {name}!");
```
```python
name = input("Your name: ")
print(f"Welcome, {name}!")
```

C# only: the classic `Main` form, shown once for recognition.

**Where they differ**
- `Console.ReadLine()` returns `string?` (null at end of input); `input()` raises
  `EOFError` at end of input.
- Semicolons and braces ↔ newlines and indentation.

**Common mistakes**
- C#: `Class Program` (capital C) → compile error; curly quotes `“Hello”` copied
  from Word/slides; missing `;`; running `dotnet run` outside the project folder.
- Python: mixing tabs and spaces / wrong indentation → `IndentationError`;
  `print "x"` (Python 2 syntax) → `SyntaxError`; running `python` that points to an
  old system Python.

**Predict:** `Console.Write("A"); Console.WriteLine("B"); Console.Write("C");` ↔
`print("A", end=""); print("B"); print("C", end="")` (`AB` then `C`).
`print("a", "b", sep="-")`.

**Leave out:** PE header layout, `_CorExeMain`, Ngen, ILDasm details, packaging
Python projects (appendix only).

---

## 2. Types and Variables (`/types/`)

**Goal:** Choose the right type, declare variables, convert safely, and understand
static vs dynamic typing and value vs reference semantics in both languages.

**Must cover**
1. Declaring variables. C#: static typing, `var` is still statically typed,
   definite assignment. Python: a name is bound to an object; the *object* has a
   type, the name doesn't. Type hints (`age: int = 20`) are optional and not
   enforced at runtime.
2. Built-in numeric types. C# table (generate the numbers from a sample that prints
   `MinValue`/`MaxValue` and `sizeof`, and say so on the page):

| C# | .NET | Size | Range / precision |
|---|---|---|---|
| `bool` | Boolean | — | `true` / `false` |
| `byte` | Byte | 1 | 0 … 255 |
| `sbyte` | SByte | 1 | −128 … 127 |
| `short` | Int16 | 2 | −32 768 … 32 767 |
| `ushort` | UInt16 | 2 | 0 … 65 535 |
| `int` | Int32 | 4 | −2 147 483 648 … 2 147 483 647 |
| `uint` | UInt32 | 4 | 0 … 4 294 967 295 |
| `long` | Int64 | 8 | ≈ ±9.22 × 10¹⁸ |
| `ulong` | UInt64 | 8 | 0 … ≈ 1.84 × 10¹⁹ |
| `float` | Single | 4 | ~6–9 significant digits |
| `double` | Double | 8 | ~15–17 significant digits |
| `decimal` | Decimal | 16 | 28–29 significant digits, base-10 |
| `char` | Char | 2 | one UTF-16 code unit |
| `string` | String | reference | text, immutable |

   Python table: `int` (arbitrary precision), `float` (IEEE double — show
   `sys.float_info.max` and `.dig`), `decimal.Decimal`, `bool`, `str`, `None`.
   A mapping column: which Python type students should use where C# uses which.
3. Which type when: counting, measurements, money (`decimal` ↔ `Decimal`), flags.
4. Value vs reference semantics. C#: value types are copied, reference types share
   one object; stack/heap diagram with the nuance that value-type fields of objects
   live on the heap. Python: *every* variable is a reference to an object; what
   matters is whether the object is **mutable** (`list`) or **immutable** (`int`,
   `str`, `tuple`). Diagram: names → objects.
5. `const` / `readonly` (C#) ↔ convention `MAX_SIZE = 10` and `typing.Final`
   (Python; not enforced at runtime).
6. Conversions: implicit widening and explicit casts (C#) ↔ constructor calls
   `int()`, `float()`, `str()` (Python). Parsing user input: `int.Parse`,
   `int.TryParse` (preferred) ↔ `int()` inside `try/except ValueError`.
   `Convert.ToInt32(null)` returns 0; `int.Parse(null)` throws.
7. Overflow: C# default unchecked wrap-around, `checked` throws
   `OverflowException` ↔ Python ints just grow.
8. Nullable value types `int?`, `.HasValue`, `??` ↔ `None`, `int | None`
   (details in ch. 11).
9. Boxing/unboxing (C# only, short): what it is, why it costs, generics avoid it.
   Python note: every value is already an object.

**Key pairs**

```csharp
// Value type: copied
int a = 5;
int b = a;
b = 10;
Console.WriteLine(a); // 5

// Reference type: both names see one array
int[] x = { 1, 2, 3 };
int[] y = x;
y[0] = 99;
Console.WriteLine(x[0]); // 99
```
```python
a = 5
b = a
b = 10          # rebinds b; a is untouched
print(a)        # 5

x = [1, 2, 3]
y = x           # same list object
y[0] = 99
print(x[0])     # 99
```
Explain: the output matches, but the reason differs. In C#, `int` is a value type
and is copied. In Python, `b = 10` makes `b` refer to a *different* object; ints
are immutable so nothing is shared that could change.

```csharp
Console.WriteLine(0.1 + 0.2 == 0.3);     // False
Console.WriteLine(0.1m + 0.2m == 0.3m);  // True
Console.WriteLine(0.1 + 0.2);            // 0.30000000000000004
```
```python
from decimal import Decimal

print(0.1 + 0.2 == 0.3)                  # False
print(Decimal("0.1") + Decimal("0.2")
      == Decimal("0.3"))                 # True
print(0.1 + 0.2)                         # 0.30000000000000004
```
Note the Python pitfall: `Decimal(0.1)` (from a float) carries the float's error;
build `Decimal` from strings.

```csharp
int max = int.MaxValue;
max++;
Console.WriteLine(max); // -2147483648 (silent wrap-around)

int m = int.MaxValue;
try
{
    int y2 = checked(m + 1);
}
catch (OverflowException)
{
    Console.WriteLine("Overflow caught");
}
```
```python
big = 2_147_483_647
big += 1
print(big)          # 2147483648 — no overflow
print(2 ** 100)     # a 31-digit integer
```
(`checked(int.MaxValue + 1)` with constants is a compile-time error — use a
variable, as above. Verify.)

```csharp
Console.Write("Age: ");
if (int.TryParse(Console.ReadLine(), out int age))
    Console.WriteLine($"Next year: {age + 1}");
else
    Console.WriteLine("Please enter a number.");
```
```python
try:
    age = int(input("Age: "))
    print(f"Next year: {age + 1}")
except ValueError:
    print("Please enter a number.")
```

```csharp
double d = 9.99;
int n = (int)d;
Console.WriteLine(n); // 9 — truncated, not rounded
Console.WriteLine(Math.Round(2.5)); // 2 — banker's rounding
Console.WriteLine(Math.Round(2.5, MidpointRounding.AwayFromZero)); // 3
```
```python
print(int(9.99))      # 9 — truncated toward zero
print(round(2.5))     # 2 — banker's rounding, same rule as C#
print(round(3.5))     # 4
```

**Where they differ**
- Integer overflow: wraps (C#) vs never happens (Python).
- A variable's type: fixed at compile time (C#) vs belongs to the object (Python);
  `x = 5; x = "five"` is legal Python and a compile error in C#.
- `"1" + 2`: `"12"` in C# vs `TypeError` in Python (strong typing without static
  typing).
- `char`: C# has one; Python uses 1-length strings. Emoji need two `char`s in C#
  (`"😀".Length == 2`) but `len("😀") == 1` in Python (code points).

**Common mistakes**
- C#: unassigned local → CS0165; `int.Parse("12,5")` / `int.Parse("")` →
  `FormatException`; expecting `(int)9.99` to round; `double` for money.
- Python: `int("12.5")` → `ValueError` (use `float` first or `Decimal`);
  `Decimal(0.1)`; assuming a type hint stops a wrong value (it doesn't);
  `input()` returns a string, so `input() + 1` → `TypeError`.

**Predict ideas:** `byte b = 255; b++;` → 0 ↔ no Python equivalent (why?).
`var v = 5 / 2;` → `int` 2 ↔ `v = 5 / 2` → `float` 2.5.
`True + True` → 2. `string s1 = "a"; string s2 = s1; s2 += "b";` ↔ the same in
Python — `s1` stays `"a"` in both (strings are immutable).

**Leave out:** CTS/CLS theory, full `Convert` method list, `numpy` types.

---

## 3. Operators (`/operators/`)

**Goal:** Predict the result of expressions, including integer division, modulo on
negatives, precedence, and short-circuit evaluation — and where the two languages
disagree.

**Must cover**
1. Arithmetic. C#: `/` on two ints truncates toward zero. Python: `/` always
   gives a `float`, `//` floors, `**` is power. `%` follows the dividend's sign in
   C# and the divisor's sign in Python.
2. Increment/decrement: C# prefix vs postfix ↔ Python has no `++`/`--`
   (`i += 1`). `i++` is a `SyntaxError`, and `++i` is legal but does nothing (two
   unary pluses).
3. Comparison and equality. C# `==` on strings compares content. Python `==`
   compares values, `is` compares identity; never use `is` with literals
   (`SyntaxWarning`). Python chained comparisons `0 <= x < 10`.
4. Logical: `&& || !` ↔ `and or not`, both short-circuit. C# `&`/`|` on bools
   don't short-circuit. Python `and`/`or` return one of the operands, not always a
   bool.
5. Compound assignment `+=` etc. (both).
6. Conditional: `c ? a : b` ↔ `a if c else b`. Null operators `??`, `??=`, `?.`
   ↔ no direct Python operators (link to ch. 11; warn about `x or default`).
7. Precedence table (short, both) + advice: use parentheses when in doubt.
8. `is`, `as`, `typeof`, `nameof` (C#) ↔ `isinstance`, `type()`, `is` (Python) —
   one line each, link to later chapters.
9. Bitwise operators — brief (same symbols in both); full coverage in the appendix.

**Key pairs**

```csharp
Console.WriteLine(7 / 2);    // 3
Console.WriteLine(7 / 2.0);  // 3.5
Console.WriteLine(7 % 3);    // 1
Console.WriteLine(-7 % 3);   // -1
Console.WriteLine(-7 / 2);   // -3 (toward zero)
```
```python
print(7 // 2)     # 3
print(7 / 2)      # 3.5
print(7 % 3)      # 1
print(-7 % 3)     # 2
print(-7 // 2)    # -4 (floor)
```

```csharp
int i = 5;
Console.WriteLine(i++); // 5
Console.WriteLine(++i); // 7
```
```python
i = 5
i += 1
print(i)      # 6
print(++i)    # 6 — two unary pluses, not an increment
```

```csharp
int[] scores = { };
// Short-circuit: the second condition never runs
if (scores.Length > 0 && scores[0] > 50)
    Console.WriteLine("First score passes.");
else
    Console.WriteLine("No scores, or it fails.");
```
```python
scores = []
if scores and scores[0] > 50:
    print("First score passes.")
else:
    print("No scores, or it fails.")
```

```csharp
int total = 7, count = 2;
double avg1 = total / count;          // 3 — integer division first!
double avg2 = (double)total / count;  // 3.5
```
```python
total, count = 7, 2
print(total / count)    # 3.5
print(total // count)   # 3
```

**Where they differ**
- `/` on ints, `%` and `//` on negatives (the table above).
- `++` exists only in C#.
- `1 + 2 + "3" + 4 + 5` → `"3345"` in C#; `TypeError` in Python.
- `x or default` in Python treats `0`, `""` and `[]` as missing; C#'s `??` only
  replaces `null`.

**Common mistakes**
- C#: average with integer division; `if (x > 0 & arr[0] > 0)` on an empty array
  (no short-circuit); `if (x = 5)` → show the compiler error.
- Python: `++i` expecting an increment; `if x is 5` (`SyntaxWarning`, may be
  false); `count = count or 10` when `0` is a valid count.

**Predict ideas:** `-7 % 3` in both; `print(++i)`; `print(1 < 2 < 3)` and
`print(3 > 2 > 1)`; `Console.WriteLine(1 + 2 + "3" + 4 + 5);`.
`int a = 10; a += a++ + ++a;` — "don't write code like this", C# only, only after
verifying the result.

---

## 4. Strings (`/strings/`)

**Goal:** Build, format, search and compare text correctly in both languages —
including Turkish text on Turkish-locale machines.

**Must cover**
1. Strings are immutable in both. C#: `string.Empty`, `null` vs `""`. Python:
   `""`, no `null` string; `None` is a different type.
2. Interpolation: `$"..."` ↔ f-strings. Format specifiers side by side:
   `{x:F2}` ↔ `{x:.2f}`, `{x:N0}` ↔ `{x:,}`, `{date:dd.MM.yyyy}` ↔
   `{date:%d.%m.%Y}`, alignment `{name,-10}` ↔ `{name:<10}`.
3. Verbatim `@"C:\temp"` and raw string literals `"""..."""` (C# 11+) ↔ raw
   strings `r"C:\temp"` and triple-quoted strings.
4. Common methods table (C# | Python): `Length` ↔ `len()`, `ToUpper` ↔ `upper`,
   `Trim` ↔ `strip`, `Contains` ↔ `in`, `StartsWith` ↔ `startswith`, `IndexOf` ↔
   `find` / `index`, `Substring` ↔ slicing, `Replace` ↔ `replace`, `Split` ↔
   `split`, `string.Join` ↔ `"sep".join`, `IsNullOrWhiteSpace` ↔ `not s.strip()`.
5. Culture and locale:
   - C#: many string and number operations depend on the current culture.
     `"i".ToUpper()` on a tr-TR machine gives `"İ"`. `double.Parse("3.14")` may
     fail or give 314. Use `ToUpperInvariant`, `StringComparison.OrdinalIgnoreCase`
     and `CultureInfo.InvariantCulture` for identifiers, commands and data files.
   - Python: `str.upper()` and `float()` **never** depend on locale
     (`"i".upper() == "I"` everywhere). The Turkish-specific trap is different:
     `"İ".lower()` gives `"i̇"` (two code points) and `"ı".upper()` gives `"I"`.
     Correct Turkish casing needs extra work. `locale` only affects explicitly
     locale-aware functions (`locale.atof`, `f"{x:n}"`).
   - Tell students which languages' defaults protect them, and which don't.
6. Building strings in loops: `StringBuilder` ↔ collect in a list, then
   `"".join(parts)`.
7. Characters: `char.IsDigit`, `char.IsLetter` ↔ `str.isdigit`, `str.isalpha`.

**Key pairs**

```csharp
string name = "Ayşe";
double gpa = 3.456;
Console.WriteLine($"{name} — GPA: {gpa:F2}");  // Ayşe — GPA: 3.46
Console.WriteLine($"|{name,-8}|{gpa,6:F1}|");   // |Ayşe    |   3.5|
```
```python
name = "Ayşe"
gpa = 3.456
print(f"{name} — GPA: {gpa:.2f}")     # Ayşe — GPA: 3.46
print(f"|{name:<8}|{gpa:6.1f}|")      # |Ayşe    |   3.5|
```

```csharp
using System.Globalization;

string cmd = "exit";
var tr = new CultureInfo("tr-TR");
Console.WriteLine(cmd.ToUpper(tr));           // EXİT
Console.WriteLine(cmd.ToUpperInvariant());    // EXIT
Console.WriteLine(string.Equals("FILE", "file",
    StringComparison.OrdinalIgnoreCase));    // True
```
```python
cmd = "exit"
print(cmd.upper())            # EXIT — never locale-dependent
print("İ".lower())            # i̇ (i + combining dot)
print(len("İ".lower()))       # 2
print("FILE".casefold() == "file".casefold())  # True
```
Explanation: on a Turkish-locale computer, `"exit".ToUpper() == "EXIT"` can be
**false** in C#. This is a real bug in software written abroad, and students in
Turkey should know it first. Python avoids that one, but has its own Turkish
casing surprise.

```csharp
string csv = "Ali;85;Computer Eng.";
string[] parts = csv.Split(';');
Console.WriteLine(parts[0]);                  // Ali
Console.WriteLine(string.Join(" | ", parts)); // Ali | 85 | Computer Eng.
```
```python
csv = "Ali;85;Computer Eng."
parts = csv.split(";")
print(parts[0])              # Ali
print(" | ".join(parts))     # Ali | 85 | Computer Eng.
```

```csharp
using System.Text;

var sb = new StringBuilder();
for (int i = 1; i <= 5; i++)
    sb.Append(i).Append(i < 5 ? ", " : "");
Console.WriteLine(sb.ToString()); // 1, 2, 3, 4, 5
```
```python
parts = [str(i) for i in range(1, 6)]
print(", ".join(parts))       # 1, 2, 3, 4, 5
```

Python-only pair partner: slicing `s[1:4]`, `s[::-1]`, `s[-1]` ↔ `Substring`,
ranges `s[1..4]` and `s[^1]` (C# 8 indices and ranges).

**Where they differ**
- Culture: C# is culture-sensitive by default; Python's core string and number
  functions are not.
- `IndexOf` returns −1 ↔ `find` returns −1 but `index` raises `ValueError`.
- `Substring(start, length)` takes a *length*; Python slices take an *end index*.

**Common mistakes**
- Both: `s.ToUpper();` / `s.upper()` without assigning — strings are immutable,
  the result is discarded.
- C#: `Substring` with the wrong length → `ArgumentOutOfRangeException`;
  `double.Parse("3.14")` on a Turkish-locale machine; concatenation in a big loop.
- Python: `"Total: " + 5` → `TypeError`; `s[10]` → `IndexError` but `s[10:]` →
  `""` (slices never raise).

---

## 5. Control Flow (`/control-flow/`)

**Goal:** Choose the right structure (if / switch / match / loop) and avoid
classic loop bugs in both languages.

**Must cover**
1. `if / else if / else` ↔ `if / elif / else`. C#: always use braces (dangling
   else, stray `;`). Python: indentation *is* the block.
2. `switch` statement (C#; no fall-through, each `case` ends with `break` /
   `return`).
3. **Switch expressions and pattern matching** (C#) ↔ **`match`** (Python 3.10).
   Relational, logical (`and`, `or`, `not`) and type patterns in C#. Literal,
   capture, class and guard (`case x if x > 90`) patterns in Python. Note: Python
   `match` has no relational patterns — use guards; plain `if/elif` is often
   clearer.
4. Loops: `for (int i = 0; i < n; i++)` ↔ `for i in range(n)`; `while` (both);
   `do-while` (C# only; Python idiom `while True: ... break`); `foreach` ↔ `for x
   in items`. `enumerate` and `zip` (Python) ↔ index loops / `Zip` (C#).
5. `break`, `continue`, `return` (both); `goto` (C# only — avoid). Python's
   loop `else` clause (short, "Python only").
6. Nested loops, e.g. a multiplication table.

**Key pairs**

```csharp
string LetterGrade(int score) => score switch
{
    < 0 or > 100 => throw new ArgumentOutOfRangeException(nameof(score)),
    >= 90 => "AA",
    >= 85 => "BA",
    >= 80 => "BB",
    >= 75 => "CB",
    >= 70 => "CC",
    >= 60 => "DC",
    >= 50 => "DD",
    _ => "FF"
};

Console.WriteLine(LetterGrade(87)); // BA
```
```python
def letter_grade(score: int) -> str:
    if not 0 <= score <= 100:
        raise ValueError(f"score out of range: {score}")
    for limit, grade in [(90, "AA"), (85, "BA"),
                         (80, "BB"), (75, "CB"),
                         (70, "CC"), (60, "DC"),
                         (50, "DD")]:
        if score >= limit:
            return grade
    return "FF"

print(letter_grade(87))  # BA
```
(Explain that the grading scale is an example; universities differ. Show that a
`match` version needs guards on every case, which is why a table is more idiomatic
here.)

```csharp
object value = 42;
if (value is int n && n > 40)
    Console.WriteLine($"A big integer: {n}");
```
```python
value: object = 42
match value:
    case int(n) if n > 40:
        print(f"A big integer: {n}")
```

```csharp
// Ask until the input is valid: the classic do-while
int number;
do
{
    Console.Write("A number from 1 to 10: ");
} while (!int.TryParse(Console.ReadLine(), out number) || number < 1 || number > 10);
Console.WriteLine($"Thanks: {number}");
```
```python
while True:
    text = input("A number from 1 to 10: ")
    if text.isdigit() and 1 <= int(text) <= 10:
        break
number = int(text)
print(f"Thanks: {number}")
```

```csharp
for (int row = 1; row <= 3; row++)
{
    for (int col = 1; col <= 3; col++)
        Console.Write($"{row * col,4}");
    Console.WriteLine();
}
```
```python
for row in range(1, 4):
    for col in range(1, 4):
        print(f"{row * col:4}", end="")
    print()
```

**Where they differ**
- `range(1, 4)` excludes 4. A C# loop `i <= 3` includes 3.
- Changing the loop variable inside the loop: in C# `for` it affects the loop, in
  Python `for` it doesn't (the next value comes from the iterator).
- Python `match` checks cases in order and has no fall-through, like C#.

**Common mistakes**
- C#: `if (x > 5);` — the stray semicolon makes the block always run; off-by-one
  `i <= arr.Length` → `IndexOutOfRangeException`; infinite `while`.
- Python: `range(1, 10)` expecting 10 to be included; wrong indentation that
  moves a line out of the loop (runs once, no error!); `case max_score:` in `match`
  captures instead of comparing (use a dotted name or a guard).

**Predict ideas:** a loop with `continue` on even numbers (both); `for i in
range(3): i += 10` — what does it print?; `while (i < 3) i++;` final value; a `for`
with `else` (Python only).

---

## 6. Methods and Functions (`/functions/`)

**Goal:** Write small, well-named methods/functions with clear inputs and outputs,
and understand how arguments are passed in each language.

**Must cover**
1. Anatomy: access modifier, `static`, return type, name, parameters ↔ `def`,
   name, parameters, optional type hints, `return`. A method belongs to a type;
   a Python function can stand alone.
2. Why: reuse, naming, testing. "One method, one job."
3. Return values vs `void` ↔ implicit `return None`. Early return.
4. Optional parameters and named arguments (both). Python keyword-only
   parameters (`*,`) — short.
5. Overloading (C#) ↔ none in Python (default arguments, or a different name).
6. Parameter passing. C#: by value (default), `ref`, `out`, `in`; passing a
   reference type by value (the object can change, the variable can't be
   reassigned). Python: "pass by object reference" — a function can mutate a
   mutable argument but cannot rebind the caller's variable. Same diagram for both.
7. `params` arrays ↔ `*args`; Python `**kwargs` (Python only, short).
8. Expression-bodied methods (`=>`) and local functions ↔ one-line `def` / nested
   functions.
9. Returning multiple values: tuples `(int Min, int Max)` ↔ tuples `return lo, hi`
   with unpacking in both.
10. Recursion: base case, call stack, `StackOverflowException` (process crash) ↔
    `RecursionError` (catchable; default limit about 1000). When to prefer a loop.

**Key pairs**

```csharp
static double Average(params int[] numbers)
{
    if (numbers.Length == 0) return 0;
    int sum = 0;
    foreach (int n in numbers) sum += n;
    return (double)sum / numbers.Length;
}

Console.WriteLine(Average(70, 80, 95));         // 81.66666666666667
Console.WriteLine($"{Average(70, 80, 95):F2}"); // 81.67
```
```python
def average(*numbers: int) -> float:
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)

print(average(70, 80, 95))          # 81.66666666666667
print(f"{average(70, 80, 95):.2f}") # 81.67
```

```csharp
static void Reset(int[] arr) { arr[0] = 0; }            // changes the object
static void Replace(int[] arr) { arr = new int[] { 9 }; } // changes only the local copy

int[] data = { 5, 6 };
Reset(data);
Replace(data);
Console.WriteLine(data[0]); // 0
```
```python
def reset(items: list[int]) -> None:
    items[0] = 0           # changes the object

def replace(items: list[int]) -> None:
    items = [9]            # rebinds the local name only

data = [5, 6]
reset(data)
replace(data)
print(data[0])  # 0
```
Explain: identical behavior, identical reason. This is the most important
"the languages agree" example on the page.

```csharp
static void Swap(ref int a, ref int b) => (a, b) = (b, a);

int x = 1, y = 2;
Swap(ref x, ref y);
Console.WriteLine($"{x}, {y}"); // 2, 1
```
```python
x, y = 1, 2
x, y = y, x      # no function needed; ref doesn't exist
print(f"{x}, {y}")  # 2, 1
```
(C# only note: `ref`/`out`. Python returns tuples instead.)

```csharp
static (int Min, int Max) MinMax(int[] values)
{
    int min = values[0], max = values[0];
    foreach (var v in values)
    {
        if (v < min) min = v;
        if (v > max) max = v;
    }
    return (min, max);
}

var (lo, hi) = MinMax(new[] { 4, 9, 1, 7 });
Console.WriteLine($"{lo} - {hi}"); // 1 - 9
```
```python
def min_max(values: list[int]) -> tuple[int, int]:
    return min(values), max(values)

lo, hi = min_max([4, 9, 1, 7])
print(f"{lo} - {hi}")  # 1 - 9
```

```csharp
static long Factorial(int n) => n <= 1 ? 1 : n * Factorial(n - 1);
Console.WriteLine(Factorial(20)); // 2432902008176640000
// Factorial(21) doesn't fit in long — it silently overflows. Show this.
```
```python
def factorial(n: int) -> int:
    return 1 if n <= 1 else n * factorial(n - 1)

print(factorial(20))  # 2432902008176640000
print(factorial(21))  # 51090942171709440000 — no overflow
```

Also include Fibonacci recursive vs iterative in both, with call counts for n = 30
and a note on why naive recursion is exponentially slow. Python bonus:
`functools.cache` (short).

**Where they differ**
- Overflow in recursion results (above).
- Deep recursion: C# crashes the process; Python raises `RecursionError`.
- Default argument values: C# requires compile-time constants; Python evaluates
  the default **once**, at `def` time — the mutable default pitfall.

**Common mistakes**
- Both: ignoring the return value (`Math.Abs(x);` / `abs(x)` alone does nothing);
  recursion without a base case; printing instead of returning.
- C#: using `out` when a return value or tuple is clearer.
- Python: `def add(item, items=[])` — the list is shared between calls; forgetting
  `return` (the function returns `None`).

---

## 7. Arrays and Collections (`/collections/`)

**Goal:** Pick the right collection and use it correctly in both languages.

**Must cover**
1. C# arrays: fixed size, zero-based, `Length`, initialization forms, default
   values ↔ Python has no fixed-size array in the core language; `list` is the
   default.
2. Multi-dimensional `int[,]` vs jagged `int[][]` (C#) ↔ lists of lists (Python),
   with a diagram. Python pitfall: `[[0] * 3] * 2` makes two references to one row.
3. `List<T>` ↔ `list`: add/append, remove, insert, count/len, contains/`in`,
   indexer, sort/`sort()` and `sorted()`. Slicing (Python only; C# ranges `[1..3]`
   on arrays, short).
4. `Dictionary<TKey,TValue>` ↔ `dict`: add, `TryGetValue` ↔ `get`, `ContainsKey`
   ↔ `in`, iterating pairs. `collections.Counter` and `defaultdict` (Python,
   short).
5. `HashSet<T>` ↔ `set`, `Queue<T>` ↔ `collections.deque`, `Stack<T>` ↔ `list`
   (`append`/`pop`) — one example each. Tuples (both).
6. Collection expressions `[1, 2, 3]` (C# 12, version note) ↔ list/dict/set
   literals.
7. Choosing a collection table: need order? index? unique? key lookup? FIFO/LIFO?
   (both columns).
8. Big-O intuition in one table (list lookup O(n), dictionary lookup ~O(1)) — the
   same for both languages.

**Key pairs**

```csharp
var grades = new List<int> { 85, 42, 91, 67 };
grades.Add(73);
grades.Remove(42);
grades.Sort();
Console.WriteLine(string.Join(", ", grades)); // 67, 73, 85, 91
Console.WriteLine(grades.Count);              // 4
```
```python
grades = [85, 42, 91, 67]
grades.append(73)
grades.remove(42)
grades.sort()
print(", ".join(map(str, grades)))  # 67, 73, 85, 91
print(len(grades))                  # 4
```

```csharp
// Word count — the classic use of a Dictionary
string text = "apple pear apple cherry apple pear";
var counts = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
{
    counts[word] = counts.TryGetValue(word, out int c) ? c + 1 : 1;
}
foreach (var (word, count) in counts)
    Console.WriteLine($"{word}: {count}");
```
```python
from collections import Counter

text = "apple pear apple cherry apple pear"
counts: dict[str, int] = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
for word, count in counts.items():
    print(f"{word}: {count}")

print(Counter(text.split()).most_common(1))
```
(Verify order and format. Point out that Python guarantees this order and C#
does not, even when the output happens to match.)

```csharp
int[,] matrix = { { 1, 2, 3 }, { 4, 5, 6 } };
Console.WriteLine(matrix.GetLength(0)); // 2 rows
Console.WriteLine(matrix.GetLength(1)); // 3 columns
Console.WriteLine(matrix[1, 2]);        // 6
```
```python
matrix = [[1, 2, 3], [4, 5, 6]]
print(len(matrix))       # 2 rows
print(len(matrix[0]))    # 3 columns
print(matrix[1][2])      # 6
```

```csharp
var queue = new Queue<string>();
queue.Enqueue("Ali"); queue.Enqueue("Veli");
Console.WriteLine(queue.Dequeue()); // Ali (first in, first out)

var stack = new Stack<string>();
stack.Push("Ali"); stack.Push("Veli");
Console.WriteLine(stack.Pop());     // Veli (last in, first out)
```
```python
from collections import deque

queue = deque(["Ali", "Veli"])
print(queue.popleft())   # Ali

stack = ["Ali", "Veli"]
print(stack.pop())       # Veli
```

**Where they differ**
- Removing items while iterating: C# throws `InvalidOperationException`; Python
  **silently skips elements** (and a `dict` raises `RuntimeError`). The Python
  version is the more dangerous one.
- `list.sort()` returns `None`, so `x = lst.sort()` loses the list; C#'s
  `List.Sort()` returns `void`, so the equivalent doesn't compile.
- `list.remove(x)` raises `ValueError` if `x` is missing; `List.Remove` returns
  `false`.
- Dictionary order (above). Missing key: `KeyNotFoundException` ↔ `KeyError`.

**Common mistakes**
- C#: modifying a `List` inside `foreach` (fix: `RemoveAll`, iterate backwards,
  build a new list); `dict[key]` for a missing key; confusing `Length` and
  `Count`.
- Python: removing inside `for` (fix: a comprehension); `[[0] * 3] * 2`;
  `x = lst.sort()`; relying on `set` order.

**Leave out:** `ArrayList` / `Hashtable` (history note only),
`Array.CreateInstance`, the `array` module, `numpy`.

---

## 8. Classes and Objects (`/classes/`)

**Goal:** Design small classes with encapsulated state and meaningful behavior in
both languages, and understand how differently they enforce encapsulation.

**Must cover**
1. Class vs object; `new` ↔ calling the class; references (two variables, one
   object) — the same in both.
2. Fields vs properties (C#; why public fields are avoided) ↔ attributes and
   `@property` (Python; start with plain attributes, add a property when you need
   validation — no caller changes).
3. Auto-properties, `{ get; private set; }`, `init`, `required` (C# 11, version
   note), computed properties ↔ `@property` without a setter (read-only),
   `@x.setter` with validation.
4. Access modifiers table (`public`, `private`, `protected`, `internal`) ↔ Python
   conventions: `_name` ("internal, please don't touch") and `__name` (name
   mangling). Python trusts the caller; C# enforces access.
5. Constructors, overloading, `this(...)` chaining, `this` ↔ `__init__`, `self`
   (explicit!), alternative constructors with `@classmethod`.
6. Object initializers `new Student { Name = "Ali" }` ↔ keyword arguments.
7. `static` members and static classes ↔ class attributes, `@staticmethod`,
   `@classmethod`, and module-level functions (often the better Python answer).
8. `ToString()` ↔ `__str__` and `__repr__`.
9. Primary constructors (C# 12) — short version note.
10. Finalizers (C#) ↔ `__del__` (Python): one short note — rarely needed. Use
    `IDisposable`/`using` ↔ context managers/`with` (see ch. 15).

**Key pairs**

```csharp
public class BankAccount
{
    public string Owner { get; }
    public decimal Balance { get; private set; }

    public BankAccount(string owner, decimal initialBalance = 0)
    {
        if (string.IsNullOrWhiteSpace(owner))
            throw new ArgumentException("Owner cannot be empty.", nameof(owner));
        Owner = owner;
        Balance = initialBalance;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount must be positive.");
        Balance += amount;
    }

    public bool TryWithdraw(decimal amount)
    {
        if (amount <= 0 || amount > Balance) return false;
        Balance -= amount;
        return true;
    }

    public override string ToString() => $"{Owner}: {Balance:N2} TL";
}
```
```python
from decimal import Decimal


class BankAccount:
    def __init__(self, owner: str,
                 initial_balance: Decimal = Decimal("0")):
        if not owner.strip():
            raise ValueError("Owner cannot be empty.")
        self.owner = owner
        self._balance = initial_balance

    @property
    def balance(self) -> Decimal:
        return self._balance

    def deposit(self, amount: Decimal) -> None:
        if amount <= 0:
            raise ValueError("Amount must be positive.")
        self._balance += amount

    def try_withdraw(self, amount: Decimal) -> bool:
        if amount <= 0 or amount > self._balance:
            return False
        self._balance -= amount
        return True

    def __str__(self) -> str:
        return f"{self.owner}: {self._balance:,.2f} TL"
```
Usage: deposit, failed withdraw, successful withdraw, print — in both. Explain
why `Balance` has a private setter and `balance` has no setter: the class protects
its own rules (encapsulation). Then show that Python can't *stop*
`account._balance = -500`; it only signals "don't". (These seeds exceed the
48-character line limit: split lines, or mark the samples `"wide"` and show them
stacked.)

```csharp
public class Student
{
    private static int _nextId = 1;
    public int Id { get; }
    public string Name { get; }

    public Student(string name)
    {
        Id = _nextId++;
        Name = name;
    }
}
// new Student("Ali").Id → 1, new Student("Ayşe").Id → 2
```
```python
class Student:
    _next_id = 1   # class attribute, shared

    def __init__(self, name: str):
        self.id = Student._next_id
        Student._next_id += 1
        self.name = name
```

Also include the `Rectangle` seed (C# constructor chaining `this(side, side)` ↔
Python `@classmethod def square(cls, side)`), with a computed `Area` / `area`
property.

**Where they differ**
- Access control: enforced by the compiler (C#) vs by convention (Python).
- `self` is explicit in Python, `this` is implicit in C#.
- Adding attributes: Python objects accept new attributes at runtime
  (`s.nickname = "x"` works — a typo creates a new attribute silently); C# rejects
  unknown members at compile time.

**Common mistakes**
- C#: public fields that let callers break invariants; calling an instance member
  from `static Main` → CS0120; `NullReferenceException` from an object that was
  never created; a property that returns itself (`get => Name`) → stack overflow.
- Python: forgetting `self` in a method definition or in `self.x = x`;
  `self._next_id += 1` (creates an instance attribute instead of updating the
  class attribute); a property whose getter returns `self.name` → `RecursionError`.

---

## 9. Records, Structs, Enums (`/records-structs-enums/`)

**Goal:** Know when to use a class, record, struct, or enum, and what Python uses
for each.

**Must cover**
1. Records (C#): value-based equality, concise syntax, `with` expressions ↔
   `@dataclass` (Python): generated `__init__`, `__repr__` and `__eq__`;
   `frozen=True` for immutability; `dataclasses.replace` ↔ `with`. `NamedTuple`
   (short).
2. Structs (C# only): value types, small immutable data (`Point`), copy semantics,
   `readonly struct`. Python note: there are no user-defined value types; a frozen
   dataclass gives the *immutability* but not the *copying*.
3. Enums: named constants, underlying `int`, `switch` on enums, `Enum.TryParse`,
   `[Flags]` (short) ↔ `enum.Enum`, `auto()`, `IntEnum`, `Flag`, lookup by name
   (`Day["SUNDAY"]`) and value (`Day(7)`).
4. Comparison table: class / record / struct ↔ class / dataclass / frozen
   dataclass / NamedTuple — equality, copying, mutability, typical use.

**Key pairs**

```csharp
public record Course(string Code, string Title, int Credits);

var c1 = new Course("CS101", "Intro to Programming", 4);
var c2 = new Course("CS101", "Intro to Programming", 4);
Console.WriteLine(c1 == c2);   // True — value equality
Console.WriteLine(c1);         // Course { Code = CS101, Title = Intro to Programming, Credits = 4 }

var c3 = c1 with { Credits = 5 };
Console.WriteLine(c3.Credits); // 5
```
```python
from dataclasses import dataclass, replace


@dataclass(frozen=True)
class Course:
    code: str
    title: str
    credits: int

c1 = Course("CS101", "Intro to Programming", 4)
c2 = Course("CS101", "Intro to Programming", 4)
print(c1 == c2)   # True
print(c1)         # Course(code='CS101', title='Intro to Programming', credits=4)

c3 = replace(c1, credits=5)
print(c3.credits) # 5
```
Contrast with a plain `class` in both → `==` is `False` (reference equality /
identity by default).

```csharp
public enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }

static bool IsWeekend(Day d) => d is Day.Saturday or Day.Sunday;
Console.WriteLine(IsWeekend(Day.Sunday)); // True
Console.WriteLine((int)Day.Wednesday);    // 2
```
```python
from enum import Enum


class Day(Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7

def is_weekend(d: Day) -> bool:
    return d in (Day.SATURDAY, Day.SUNDAY)

print(is_weekend(Day.SUNDAY))   # True
print(Day.WEDNESDAY.value)      # 3
```
Point out: C# enums start at 0 by default; Python's `auto()` starts at 1.

```csharp
public struct Point { public int X; public int Y; }

var p1 = new Point { X = 1, Y = 2 };
var p2 = p1;
p2.X = 100;
Console.WriteLine(p1.X); // 1 — the struct was copied
```
(C# only. Python partner: the same code with a mutable dataclass prints 100 —
show it as "why Python has no struct".)

**Where they differ**
- A C# enum is an integer underneath (`(Day)42` compiles); a Python `Enum` member
  is not an `int` unless you use `IntEnum`, and `Day(42)` raises `ValueError`.
- `record` equality includes all positional properties; a dataclass compares
  fields in order and can exclude fields (`field(compare=False)`).

---

## 10. Inheritance and Polymorphism (`/inheritance/`)

**Goal:** Use inheritance, interfaces and protocols to write code that works with
many types, and know when *not* to use inheritance.

**Must cover**
1. Base and derived classes, `: Base`, `base(...)` constructor call, constructor
   order ↔ `class Circle(Shape)`, `super().__init__(...)`.
2. `protected` (C#) ↔ `_name` convention (Python).
3. `virtual` / `override` / `base.Method()` (C#) ↔ every method can be overridden,
   `super().method()` (Python).
4. Polymorphism: a `List<Shape>` / `list[Shape]` holding different shapes, each
   computing its own area.
5. `abstract` classes and methods ↔ `abc.ABC` and `@abstractmethod`.
6. `sealed` (C#) ↔ `typing.final` (checker-only, short).
7. Method hiding with `new` (C# only) — short, mainly to explain compiler warning
   CS0108 and why `override` is usually what you want.
8. Interfaces (C#): contracts, multiple interfaces, `I...` naming ↔ `Protocol`
   (structural typing, "duck typing with a type checker") and ABCs (Python).
9. Multiple inheritance and MRO (Python only, short): why C# forbids it for classes
   and allows many interfaces instead.
10. Abstract class vs interface/protocol table.
11. Composition over inheritance ("has-a" vs "is-a") with a small example (both).
12. `object` members `ToString`, `Equals`, `GetHashCode` ↔ `__str__`, `__eq__`,
    `__hash__` (short; defining `__eq__` removes the default `__hash__`).

**Key pairs**

```csharp
public abstract class Shape
{
    public abstract double Area();
    public override string ToString() => $"{GetType().Name}: {Area():F2}";
}

public class Circle : Shape
{
    public double Radius { get; }
    public Circle(double radius) => Radius = radius;
    public override double Area() => Math.PI * Radius * Radius;
}

public class Rectangle : Shape
{
    public double Width { get; }
    public double Height { get; }
    public Rectangle(double w, double h) { Width = w; Height = h; }
    public override double Area() => Width * Height;
}

List<Shape> shapes = [new Circle(1), new Rectangle(2, 3)];
foreach (var s in shapes)
    Console.WriteLine(s);
// Circle: 3.14
// Rectangle: 6.00
```
```python
import math
from abc import ABC, abstractmethod


class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

    def __str__(self) -> str:
        return f"{type(self).__name__}: {self.area():.2f}"


class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return math.pi * self.radius ** 2


class Rectangle(Shape):
    def __init__(self, w: float, h: float):
        self.width, self.height = w, h

    def area(self) -> float:
        return self.width * self.height


for s in [Circle(1), Rectangle(2, 3)]:
    print(s)
```
(Top-level statements must come after the type declarations in C#. Check that
this seed compiles as written, and move the statements if not.)

```csharp
public interface INotifier
{
    void Send(string to, string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string to, string message) =>
        Console.WriteLine($"Email → {to}: {message}");
}

public class ExamService
{
    private readonly INotifier _notifier;
    public ExamService(INotifier notifier) => _notifier = notifier;
    public void AnnounceResult(string student, int score) =>
        _notifier.Send(student, $"Your exam score: {score}");
}
```
```python
from typing import Protocol


class Notifier(Protocol):
    def send(self, to: str, message: str) -> None: ...


class EmailNotifier:            # no base class needed
    def send(self, to: str, message: str) -> None:
        print(f"Email → {to}: {message}")


class ExamService:
    def __init__(self, notifier: Notifier):
        self._notifier = notifier

    def announce_result(self, student: str, score: int) -> None:
        self._notifier.send(student, f"Your exam score: {score}")
```
Explain: `ExamService` doesn't know or care *how* messages are sent. This is the
idea behind dependency injection and makes testing easy. In C# the class must
*declare* `: INotifier`; in Python any object with a matching `send` works
(structural typing). Add an `SmsNotifier` in both.

Also include a `virtual` vs `new` example (C# only) showing different results when
called through a base-class reference.

**Where they differ**
- Forgetting to override: C# warns (CS0108) and calls the base method through a
  base reference; Python always calls the most-derived method.
- Instantiating an abstract class: CS0144 at compile time ↔ `TypeError` at
  runtime.
- Interfaces are nominal (C#) vs protocols are structural (Python).

**Common mistakes**
- Both: deep inheritance trees for code reuse ("Penguin : Bird" with `Fly()`).
- C#: forgetting `override` (hides instead of overrides).
- Python: forgetting `super().__init__()` (the base attributes never get set →
  `AttributeError` later); misspelling a method name in a subclass (silently adds
  a new method).

---

## 11. Null Safety (`/null-safety/`)

**Goal:** Understand `null` and `None`, avoid the resulting crashes, and read
nullable warnings.

**Must cover**
1. What `null` / `None` means; `NullReferenceException` ↔ `AttributeError:
   'NoneType' object has no attribute ...` and `TypeError: 'NoneType' object is not
   subscriptable`. How to read each.
2. Nullable reference types (`string?` vs `string`), compiler warnings (CS8600,
   CS8602), enabled by default in new projects ↔ `str | None` / `Optional[str]` +
   a type checker. Python itself never warns (with mypy: say what it would
   report, or show it if mypy is approved).
3. Operators: `?.`, `??`, `??=`, `!` (null-forgiving — use rarely, explain the
   risk) ↔ no Python equivalents; idioms: `x if x is not None else default`,
   `getattr`, `dict.get`. Warn about `x or default`.
4. Guard clauses: `ArgumentNullException.ThrowIfNull(x)` ↔ `if x is None: raise
   ValueError(...)`.
5. `is null` / `is not null` ↔ `is None` / `is not None` (never `== None`).

**Key pairs**

```csharp
string? nickname = null;
Console.WriteLine(nickname?.Length ?? 0);   // 0
nickname ??= "guest";
Console.WriteLine(nickname);                // guest
```
```python
nickname: str | None = None
print(len(nickname) if nickname is not None else 0)  # 0
if nickname is None:
    nickname = "guest"
print(nickname)                                      # guest
```

```csharp
var students = new List<Student> { new("Ali"), new("Ayşe") };
Student? found = students.FirstOrDefault(s => s.Name == "Zeynep");
if (found is null)
    Console.WriteLine("Student not found.");
else
    Console.WriteLine(found.Id);
```
```python
students = [Student("Ali"), Student("Ayşe")]
found = next((s for s in students if s.name == "Zeynep"), None)
if found is None:
    print("Student not found.")
else:
    print(found.id)
```
(`FirstOrDefault` and `next(...)` come before the Querying chapter. Each sample
defines its own `Student`, and a one-line note links forward to ch. 14.)

**Where they differ**
- C# catches many null mistakes at compile time (warnings); Python finds them
  only at runtime unless you run a type checker.
- `x or "default"` replaces `""` and `0` too; `x ?? "default"` replaces only
  `null`.

**Common mistakes**
- C#: ignoring warnings; sprinkling `!` to silence the compiler;
  `Console.ReadLine()` returning `null` at end of input.
- Python: `== None` instead of `is None`; a function that forgets to `return` and
  gives `None`; `list.sort()` returning `None`; `input()` raising `EOFError`.

---

## 12. Exceptions (`/exceptions/`)

**Goal:** Handle errors deliberately: catch what you can handle, let the rest
surface — in both languages.

**Must cover**
1. What an exception is; reading a stack trace ↔ a traceback (show real ones,
   annotated). **.NET stack traces list the most recent call first; Python
   tracebacks list it last** ("most recent call last").
2. `try / catch / finally` ↔ `try / except / else / finally`. Catch specific
   exceptions first (both). Python's `else` block (short).
3. `throw` / `throw;` (rethrow preserving the trace) vs `throw ex;` ↔ `raise`,
   bare `raise`, `raise X from e` (chaining ↔ `InnerException`).
4. Common exception types table (C# | Python): `FormatException` ↔ `ValueError`,
   `NullReferenceException` ↔ `AttributeError`/`TypeError`,
   `IndexOutOfRangeException` ↔ `IndexError`, `KeyNotFoundException` ↔ `KeyError`,
   `ArgumentException` family ↔ `ValueError`/`TypeError`,
   `InvalidOperationException` ↔ `RuntimeError`, `DivideByZeroException` ↔
   `ZeroDivisionError`, `FileNotFoundException` ↔ `FileNotFoundError`.
5. Exception filters `catch (X ex) when (...)` (C#) ↔ `except X as e:` + `if`
   (short).
6. Custom exceptions — short, both.
7. Guidelines: EAFP ("easier to ask forgiveness", idiomatic in Python) vs LBYL
   (`TryParse`, `TryGetValue`, idiomatic in C#); never swallow with an empty
   `catch` / `except: pass`; validate arguments early.

**Key pairs**

```csharp
try
{
    int[] a = new int[3];
    a[5] = 1;
}
catch (IndexOutOfRangeException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
finally
{
    Console.WriteLine("finally always runs.");
}
```
```python
try:
    a = [0] * 3
    a[5] = 1
except IndexError as e:
    print(f"Error: {e}")
finally:
    print("finally always runs.")
```

```csharp
Console.WriteLine(1.0 / 0);  // ∞ or Infinity — verify (depends on culture)
int zero = 0;
Console.WriteLine(1 / zero); // DivideByZeroException
```
```python
import math

print(math.inf)       # inf
print(1.0 / 0)        # ZeroDivisionError — even for floats!
```
Key difference: C# `double` division by zero gives Infinity; Python raises for
both `int` and `float`.

```csharp
public class InsufficientBalanceException : Exception
{
    public InsufficientBalanceException(decimal requested, decimal available)
        : base($"Requested {requested:N2} TL, available {available:N2} TL.") { }
}
```
```python
from decimal import Decimal


class InsufficientBalanceError(Exception):
    def __init__(self, requested: Decimal, available: Decimal):
        super().__init__(
            f"Requested {requested:,.2f} TL, "
            f"available {available:,.2f} TL.")
```
Naming: `...Exception` (C#) ↔ `...Error` (Python).

**Common mistakes:** `catch (Exception) { }` ↔ `except Exception: pass` hiding
bugs; bare `except:` catching `KeyboardInterrupt` (Python); catching general
`Exception` before specific ones (CS0160 in C#; in Python the specific handler is
silently unreachable); using exceptions where an `if` is enough.

---

## 13. Generics, Delegates and Lambdas (`/generics-lambdas/`)

**Goal:** Read and write generic code and lambdas in both languages — required for
querying collections and modern APIs.

**Must cover**
1. Why generics: `List<int>` vs untyped `ArrayList` (type safety, no boxing) ↔
   Python lists already hold anything; type parameters in hints
   (`list[int]`) exist **for the type checker only** and are not enforced at
   runtime. C# generics are real at runtime (reified).
2. Generic method `T Max<T>(T a, T b) where T : IComparable<T>` ↔ PEP 695 syntax
   `def larger[T](a: T, b: T) -> T` (Python 3.12); the older `TypeVar` form as
   "you may see this". Generic class `Box<T>` ↔ `class Box[T]` — short.
3. Delegates as "a variable that holds a method"; `Func<>`, `Action<>`,
   `Predicate<>` ↔ functions are ordinary objects; `Callable[[int], int]`.
4. Lambda syntax: `x => x * 2`, `(a, b) => a + b`, statement lambdas ↔
   `lambda x: x * 2`, `lambda a, b: a + b`. Python lambdas are a single
   expression; anything longer is a nested `def`.
5. Capturing variables (closures) — both; Python `nonlocal` (short).
6. Events (C#) — one short example ↔ a list of callbacks (Python).

**Key pairs**

```csharp
static T Max<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) >= 0 ? a : b;

Console.WriteLine(Max(3, 7));             // 7
Console.WriteLine(Max("apple", "pear"));  // pear
```
```python
def larger[T](a: T, b: T) -> T:
    return a if a >= b else b   # needs a bound for a type checker

print(larger(3, 7))             # 7
print(larger("apple", "pear"))  # pear
```
(Python 3.12 syntax, within the teaching limit. Explain that `larger(3, "x")` runs
until `>=` fails at runtime, while `Max(3, "x")` doesn't compile.)

```csharp
Func<int, int> square = x => x * x;
Func<int, int, int> add = (a, b) => a + b;
Action<string> greet = name => Console.WriteLine($"Hello {name}");
Predicate<int> isEven = n => n % 2 == 0;

Console.WriteLine(square(5));  // 25
Console.WriteLine(add(2, 3));  // 5
greet("Deniz");                // Hello Deniz
Console.WriteLine(isEven(4));  // True
```
```python
from collections.abc import Callable

square: Callable[[int], int] = lambda x: x * x
add = lambda a, b: a + b
is_even = lambda n: n % 2 == 0

def greet(name: str) -> None:
    print(f"Hello {name}")

print(square(5))    # 25
print(add(2, 3))    # 5
greet("Deniz")      # Hello Deniz
print(is_even(4))   # True
```
Note PEP 8: assigning a lambda to a name is discouraged in real code — use `def`.
Shown here only to mirror the C# delegates.

```csharp
static List<int> Filter(List<int> items, Func<int, bool> rule)
{
    var result = new List<int>();
    foreach (var item in items)
        if (rule(item)) result.Add(item);
    return result;
}

var nums = new List<int> { 1, 5, 8, 12, 3 };
Console.WriteLine(string.Join(", ", Filter(nums, n => n > 4))); // 5, 8, 12
```
```python
def keep(items: list[int],
         rule: Callable[[int], bool]) -> list[int]:
    return [x for x in items if rule(x)]

nums = [1, 5, 8, 12, 3]
print(keep(nums, lambda n: n > 4))  # [5, 8, 12]
```
Explain: these hand-written filters are what `Where` and comprehensions / `filter`
do — the bridge to the next chapter.

**Where they differ**
- Late-binding closures: `[lambda: i for i in range(3)]` all return 2 in Python.
  C# `foreach` captures a fresh variable per iteration (C# 5+), but a `for` loop
  variable is shared — show both.
- Generics are enforced by the C# compiler and runtime; Python type parameters are
  documentation for tools.

---

## 14. Querying Collections (`/querying-collections/`)

**Goal:** Query collections declaratively with LINQ and with Python
comprehensions/built-ins, and understand what each does under the hood.

**Must cover**
1. LINQ method syntax (primary) and query syntax (short, C# only) ↔ list/dict/set
   comprehensions and generator expressions.
2. Mapping table (C# | Python): `Where` ↔ `if` in a comprehension / `filter`;
   `Select` ↔ the expression part / `map`; `OrderBy`/`ThenBy`/`OrderByDescending`
   ↔ `sorted(key=..., reverse=True)` with tuple keys; `First`/`FirstOrDefault` ↔
   `next(iter)` / `next(iter, None)`; `Single` ↔ unpacking `(x,) = ...`;
   `Any`/`All` ↔ `any`/`all`; `Count` ↔ `len`/`sum(1 for ...)`;
   `Sum`/`Average`/`Min`/`Max` ↔ `sum`/`statistics.mean`/`min`/`max`; `GroupBy`
   ↔ `defaultdict(list)` or `itertools.groupby` (**needs sorted input**);
   `Distinct` ↔ `set` / `dict.fromkeys` (keeps order); `Take`/`Skip` ↔ slicing /
   `itertools.islice`; `ToList`/`ToDictionary` ↔ `list(...)` / dict
   comprehension.
3. Deferred execution (LINQ re-runs the query on every enumeration) ↔ generators
   (lazy **and single-use**: the second loop over the same generator gets
   nothing). Why `ToList()` / `list()` matters.
4. The same query written as a plain loop, side by side — neither LINQ nor
   comprehensions are magic.
5. Readability: when a loop is clearer (both).

**Key pairs** — one shared dataset:

```csharp
public record Student(string Name, string Department, int Score);

var students = new List<Student>
{
    new("Ayşe",   "Computer",   85),
    new("Mehmet", "Electrical", 92),
    new("Can",    "Computer",   58),
    new("Zeynep", "Mechanical", 74),
    new("Emre",   "Electrical", 66),
};
```
```python
from dataclasses import dataclass


@dataclass(frozen=True)
class Student:
    name: str
    department: str
    score: int

students = [
    Student("Ayşe", "Computer", 85),
    Student("Mehmet", "Electrical", 92),
    Student("Can", "Computer", 58),
    Student("Zeynep", "Mechanical", 74),
    Student("Emre", "Electrical", 66),
]
```

```csharp
var passed = students
    .Where(s => s.Score >= 60)
    .OrderByDescending(s => s.Score)
    .Select(s => s.Name);
Console.WriteLine(string.Join(", ", passed)); // Mehmet, Ayşe, Zeynep, Emre

Console.WriteLine(students.Average(s => s.Score)); // 75 (verify)
Console.WriteLine(students.Any(s => s.Score < 50)); // False
```
```python
from statistics import mean

passed = [s.name for s in sorted(
    students, key=lambda s: s.score, reverse=True)
    if s.score >= 60]
print(", ".join(passed))   # Mehmet, Ayşe, Zeynep, Emre

print(mean(s.score for s in students))    # 75
print(any(s.score < 50 for s in students))  # False
```

```csharp
var byDept = students
    .GroupBy(s => s.Department)
    .Select(g => new { Department = g.Key, Count = g.Count(), Avg = g.Average(s => s.Score) });

foreach (var d in byDept)
    Console.WriteLine($"{d.Department}: {d.Count} students, avg {d.Avg:F1}");
```
```python
from collections import defaultdict

groups: dict[str, list[int]] = defaultdict(list)
for s in students:
    groups[s.department].append(s.score)

for dept, scores in groups.items():
    print(f"{dept}: {len(scores)} students, "
          f"avg {mean(scores):.1f}")
```
Also show `itertools.groupby` *without* sorting first, as a Mistake (it splits
groups).

```csharp
var numbers = new List<int> { 1, 2, 3 };
var big = numbers.Where(n => n > 1);   // not run yet
numbers.Add(4);
Console.WriteLine(big.Count());        // 3 — the query runs now and sees 4
Console.WriteLine(big.Count());        // 3 — and runs again
```
```python
numbers = [1, 2, 3]
big = (n for n in numbers if n > 1)   # lazy
numbers.append(4)
print(sum(1 for _ in big))            # 3 — sees 4 (verify)
print(sum(1 for _ in big))            # 0 — generator exhausted
```

**Common mistakes:** `First()` on an empty sequence (`InvalidOperationException`)
↔ `next()` without a default (`StopIteration`); enumerating an expensive query
multiple times ↔ reusing an exhausted generator; `groupby` without sorting; very
long chained queries / nested comprehensions that no one can read.

---

## 15. Files and Resource Cleanup (`/files/`)

**Goal:** Read and write text files safely, and understand resource cleanup
(`using` ↔ `with`).

**Must cover**
1. Simple API first: `File.ReadAllText`, `ReadAllLines`, `WriteAllText`,
   `AppendAllText`, `File.Exists` ↔ `Path.read_text`, `write_text`,
   `open(..., "a")`, `Path.exists` (pathlib).
2. Paths: `Path.Combine` ↔ `Path("data") / "grades.txt"`; relative vs absolute;
   the program's working directory (both).
3. **Encoding:** C# defaults to UTF-8. Python's `open()` uses the locale's encoding
   unless told otherwise — on Windows in Turkey that can be cp1254. Always pass
   `encoding="utf-8"`. (Check the current Python release notes on UTF-8 mode
   defaults before writing this section.)
4. Streams for large files: `StreamReader`/`StreamWriter` with `using` ↔
   iterating a file object line by line inside `with`.
5. `IDisposable` and `using` declarations ↔ context managers and `with` — why
   files must be closed; the same idea in both.
6. `Directory.CreateDirectory` / `GetFiles` ↔ `Path.mkdir(parents=True,
   exist_ok=True)` / `Path.glob` — short.
7. A small CSV example (read, parse with `CultureInfo.InvariantCulture` ↔ the
   `csv` module, compute, write a report).
8. JSON: `System.Text.Json` ↔ `json` — serialize/deserialize a record ↔
   dataclass (`asdict`).

**Key pairs**

```csharp
string path = Path.Combine("data", "grades.txt");
Directory.CreateDirectory("data");
File.WriteAllLines(path, new[] { "Ali,85", "Ayşe,92", "Can,58" });

foreach (string line in File.ReadAllLines(path))
{
    var parts = line.Split(',');
    Console.WriteLine($"{parts[0],-6} {int.Parse(parts[1]),3}");
}
```
```python
from pathlib import Path

path = Path("data") / "grades.txt"
path.parent.mkdir(exist_ok=True)
path.write_text("Ali,85\nAyşe,92\nCan,58\n",
                encoding="utf-8")

for line in path.read_text(encoding="utf-8").splitlines():
    name, score = line.split(",")
    print(f"{name:<6} {int(score):3}")
```

```csharp
using var writer = new StreamWriter("log.txt", append: true);
writer.WriteLine($"{DateTime.Now:yyyy-MM-dd HH:mm} program started");
// writer is closed automatically at the end of the scope (Dispose)
```
```python
from datetime import datetime

with open("log.txt", "a", encoding="utf-8") as f:
    f.write(f"{datetime.now():%Y-%m-%d %H:%M} program started\n")
# f is closed automatically when the block ends
```
(Output depends on the clock: verify with `normalize`, or print only the fact that
the file exists and how many lines it has.)

```csharp
using System.Text.Json;

var course = new Course("CS101", "Programlamaya Giriş", 4);
string json = JsonSerializer.Serialize(course);
Console.WriteLine(json);
var back = JsonSerializer.Deserialize<Course>(json);
Console.WriteLine(back == course); // True
```
```python
import json
from dataclasses import asdict

course = Course("CS101", "Programlamaya Giriş", 4)
text = json.dumps(asdict(course))
print(text)
back = Course(**json.loads(text))
print(back == course)   # True
print(json.dumps(asdict(course), ensure_ascii=False))
```
(Deliberately a Turkish title: check how Turkish characters are escaped in both
languages' JSON output — both escape non-ASCII by default — and show the option
that turns it off in each: `JavaScriptEncoder.UnsafeRelaxedJsonEscaping` ↔
`ensure_ascii=False`.)

**Common mistakes:** hard-coded `C:\Users\...` paths (both); forgetting `using` /
`with` (file stays open or unflushed); `FileNotFoundException` /
`FileNotFoundError` because the working directory isn't what you think (C#:
`bin/Debug/...`); Python: forgetting `encoding="utf-8"`, and `"\n"` handling on
Windows (`newline=""` for the `csv` module).

**Leave out:** full `Directory`/`FileInfo` catalogs, `os.path` (history note),
`BinaryReader`, binary modes in depth, `pickle` (one-line security warning only).

---

## 16. async / await (`/async/`)

**Goal:** Understand what async code is for and read/write basic async code in
both languages.

**Must cover**
1. Why: waiting for I/O (network, disk) without blocking.
2. `Task`, `Task<T>`, `async`, `await`, async top-level statements ↔ coroutines,
   `async def`, `await`, `asyncio.run(main())`.
3. Running tasks concurrently: `Task.WhenAll` ↔ `asyncio.gather` (and
   `asyncio.TaskGroup`, 3.11, short).
4. An HTTP example (optional; mark as needing internet — `buildOnly`):
   `HttpClient` ↔ a note that Python's standard library has no async HTTP
   client (third-party packages are out of scope).
5. Pitfalls: `.Result` / `.Wait()` blocking, `async void` (event handlers only) ↔
   calling `time.sleep` inside a coroutine, forgetting `await` (a coroutine that
   never runs — Python prints `RuntimeWarning: coroutine ... was never awaited`).

**Key pair**

```csharp
using System.Diagnostics;

static async Task<string> DownloadAsync(string name, int ms)
{
    await Task.Delay(ms); // instead of a real download
    return $"{name} downloaded";
}

var sw = Stopwatch.StartNew();
string[] results = await Task.WhenAll(
    DownloadAsync("A", 1000),
    DownloadAsync("B", 1000));
Console.WriteLine(string.Join(", ", results));
Console.WriteLine($"Time: ~{sw.Elapsed.TotalSeconds:F0} s"); // ~1 s, not 2
```
```python
import asyncio
import time


async def download(name: str, seconds: float) -> str:
    await asyncio.sleep(seconds)
    return f"{name} downloaded"


async def main() -> None:
    start = time.perf_counter()
    results = await asyncio.gather(
        download("A", 1), download("B", 1))
    print(", ".join(results))
    print(f"Time: ~{time.perf_counter() - start:.0f} s")

asyncio.run(main())
```
Compare with awaiting them one after another (~2 s) in both. Use `normalize` if
the rounded time is not stable in CI.

**Where they differ**
- A C# `Task` starts running when created; a Python coroutine does nothing until
  awaited or wrapped in a task.
- C# async code can run on thread-pool threads; Python `asyncio` runs on one
  thread with an event loop.

---

## 17. Debugging and Testing (`/debugging-testing/`)

**Goal:** Find bugs systematically and check code (including AI-written code) with
tests in both languages.

**Must cover**
1. Reading compiler errors: error code (CS0103…), file, line — table of the 10 most
   common C# beginner errors ↔ Python `SyntaxError`/`IndentationError`/`NameError`
   (found at compile time vs at runtime).
2. Reading runtime exceptions and tracebacks (link ch. 12).
3. Debuggers in VS Code / Visual Studio / PyCharm: breakpoints, step over/into,
   watch, call stack. Python's `breakpoint()` (short). Concepts over UI.
4. Debugging strategy: reproduce → isolate → hypothesize → check → fix → add a
   test.
5. Unit testing: **xUnit** (`dotnet new xunit`, `[Fact]`, `[Theory]` +
   `[InlineData]`, `dotnet test`) ↔ **pytest** (test functions, plain `assert`,
   `@pytest.mark.parametrize`, `pytest.raises`). Arrange–Act–Assert in both.
   Testing edge cases (empty, zero, negative, max). **pytest is a dependency —
   ask first; fallback `unittest`.**
6. Project layout: `src/GradeApp`, `tests/GradeApp.Tests` ↔ `grade_app.py`,
   `tests/test_grade_app.py`.

**Key pair**

```csharp
public static class Grader
{
    public static string LetterGrade(int score) => score switch
    {
        < 0 or > 100 => throw new ArgumentOutOfRangeException(nameof(score)),
        >= 90 => "AA",
        >= 50 => "DD",   // shortened example
        _ => "FF"
    };
}

public class GraderTests
{
    [Theory]
    [InlineData(95, "AA")]
    [InlineData(90, "AA")]
    [InlineData(50, "DD")]
    [InlineData(49, "FF")]
    public void LetterGrade_ReturnsExpected(int score, string expected) =>
        Assert.Equal(expected, Grader.LetterGrade(score));

    [Fact]
    public void LetterGrade_RejectsNegative() =>
        Assert.Throws<ArgumentOutOfRangeException>(() => Grader.LetterGrade(-1));
}
```
```python
import pytest

from grader import letter_grade


@pytest.mark.parametrize("score, expected", [
    (95, "AA"), (90, "AA"), (50, "DD"), (49, "FF"),
])
def test_letter_grade(score: int, expected: str) -> None:
    assert letter_grade(score) == expected


def test_rejects_negative() -> None:
    with pytest.raises(ValueError):
        letter_grade(-1)
```
Explain boundary values (90, 89, 50, 49) — this is where bugs live.

---

## 18. Learning Programming with AI (`/learning-with-ai/`)

**Goal:** Students use AI as a tutor and reviewer, not as a replacement for
thinking — in any language.

**Must cover**
1. Honest framing: AI writes plausible code quickly, and it is sometimes wrong in
   subtle ways. Your value is understanding, judging and verifying.
2. When to avoid AI: while first learning a concept, in labs/exams where not
   allowed, when you can't yet explain the code it would give you.
3. Good learning prompts:
   - "Explain this error but don't write the fix: …"
   - "Explain this code line by line, then ask me 3 questions that check my
     understanding."
   - "Review my code; list the problems but don't give me corrected code."
   - "Give me 5 predict-the-output exercises on this topic."
   - "Translate this C# to *idiomatic* Python and explain every place where the
     behavior could differ." (Then verify each claim by running both.)
4. Verification checklist for any AI-generated code: Does it compile/run? Can I
   explain every line? What happens with empty/null/None/negative/huge input? Are
   there tests? Does it use APIs that actually exist? Is it modern C# / modern
   Python? Is it idiomatic, or "C# written in Python"?
5. Exercise: an AI-style solution with 3 hidden bugs in each language — C#:
   integer-division average, off-by-one loop, missing null check; Python:
   `range` off-by-one, mutable default argument, `x or default` treating 0 as
   missing. Students find them; answers in `<Predict>`.
6. Academic integrity: follow course rules; cite AI help when required.

---

## 19. Appendices (`/appendices/`)

Short pages, each with 1–2 example pairs:
- **Operator overloading ↔ dunder methods** — a `Money` or `Vector` type with `+`
  and `==` (`operator +` ↔ `__add__`, `__eq__`).
- **Indexers ↔ `__getitem__`** — a `Gradebook` class with `this[string name]` ↔
  `__getitem__`/`__setitem__`.
- **Bitwise operators** — `& | ^ ~ << >>` in both; `[Flags] enum Permission` ↔
  `enum.Flag`. Python ints are unbounded, so `~5 == -6` and there's no unsigned
  shift.
- **Under the hood** — IL, JIT, assemblies, GC generations (C#) ↔ bytecode,
  `dis.dis`, reference counting (`sys.getrefcount`), the cycle collector (Python).
  Clearly marked as optional.
- **Date and time** — `DateTime`, `DateOnly`, `TimeSpan` ↔ `datetime`, `date`,
  `timedelta`; formatting; age calculation; time zones in one paragraph.
- **Git basics** — `init`, `add`, `commit`, `status`, `log`; `.gitignore` for .NET
  (`bin/`, `obj/`) and Python (`__pycache__/`, `.venv/`); GitHub.
- **Old code you may see** — C#: `ArrayList`, `Hashtable`, destructors, `csc.exe`,
  .NET Framework vs modern .NET. Python: Python 2 (`print "x"`,
  `raw_input`, `xrange`, integer `/`), `%`-formatting, `os.path`. What to use
  instead.

---

## 20. Cheat Sheet (`/cheat-sheet/`)

Two columns (C# | Python), about two A4 pages when printed, with the most-used
syntax: variables and types, string formatting, if / switch expression / match,
loops, method / function, class with property and constructor, record /
dataclass, list / dictionary, LINQ / comprehensions, try/catch / try/except, file
read/write, async. Every snippet must also exist as a verified sample.

---

## Mini projects (optional, add at the end)

Small end-to-end programs linking several chapters, each with a short spec, a
starter checklist, and reference solutions in **both languages** hidden behind
`<details>`:

1. **Grade Calculator** — read student scores from CSV, compute averages and letter
   grades, write a report. (Strings, collections, querying, files, exceptions.)
2. **Library System** — books, members, borrowing rules with classes and
   interfaces/protocols, plus tests. (OOP, testing.)
3. **Hangman** console game. (Loops, strings, functions.)
