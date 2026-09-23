# Content Specification — C# Reference Guide

This is the source of truth for **what** each page covers. `CLAUDE.md` defines
**how** pages are built. For every chapter below you'll find:

- **Goal** — what a student should be able to do after reading.
- **Must cover** — the topics, in order.
- **Key examples** — starting code. Treat them as seeds: turn each into a verified
  sample under `samples/`, run it, and use the real output. Expected outputs noted
  here are for orientation only; the running program is the authority.
- **Common mistakes** — to build `<Mistake>` blocks from.
- **Predict / quiz ideas** — seeds for exercises.
- **Leave out** — things deliberately not covered (or moved to appendices).

Comments inside the seed code are in Turkish where they would appear on the site.

---

## Changes compared to the original course slides

Added (missing from the slides, essential today): dotnet CLI workflow, string
interpolation, `var`, nullable reference types and null operators, switch
expressions and pattern matching, `List<T>` / `Dictionary<TKey,TValue>` and other
generic collections, records, exceptions, generics, delegates and lambdas, LINQ,
`using` / `IDisposable`, async/await, debugging, unit testing, working with AI.

Reduced or moved to appendices: CLR/PE-header internals (one short "under the hood"
section), .NET tool list (Ngen, TlbImp, Regsvc…), destructors (a short note:
finalizers are rare; use `IDisposable`), operator overloading, indexers,
`Buffer`/`BitConverter`, the long `Directory`/`File` method catalogs, bitwise
operators in depth.

Corrected facts (the slides had these wrong — make sure the site gets them right):
- `decimal` is **16 bytes**, not 12.
- `long` range is about **±9.22 × 10¹⁸**; `ulong` max is about **1.84 × 10¹⁹**.
- .NET's garbage collector is a **tracing, generational** collector, not reference counting.
- "Value types live on the stack" is an oversimplification: a value-type field
  inside a class object lives on the heap with that object.
- C# is multi-paradigm, not "100% object-oriented"; not everything is a class
  (`int` is a struct, there are also records, enums, delegates, interfaces).
- Keywords are lowercase (`class`, not `Class`); code must use straight quotes `"`.

---

## 0. Home page (`/`)

**Goal:** Students understand what this site is and how to use it.

- One short paragraph: this is a review and reference guide, not a first course.
- "How to use this guide": read Özet first; try Predict exercises *before* revealing;
  run the samples yourself; don't copy — type.
- Topic map grouped into: Temeller (basics), Nesneler (OOP), Modern C#,
  Araçlar ve Pratik (tools and practice).
- Progress checklist (localStorage).
- Link to `/yapay-zeka/` with one sentence: "AI can write code; this site helps
  you understand, check and improve it."

---

## 1. Başlarken — Getting started (`/baslarken/`)

**Goal:** Create, run, and understand the structure of a C# program with the dotnet CLI.

**Must cover**
1. Installing the .NET SDK, checking with `dotnet --version`.
2. `dotnet new console -n HelloApp`, `cd HelloApp`, `dotnet run`. What files are
   created (`Program.cs`, `.csproj`, `bin/`, `obj/`).
3. Top-level statements vs the classic `Main` method — both are valid; the compiler
   generates `Main` for you.
4. `using` directives and namespaces; `Console.WriteLine`, `Console.ReadLine`.
5. How code runs (short): C# → compiler → IL in an assembly (.dll) → CLR's JIT →
   machine code. One diagram. Mention garbage collector in one sentence.
6. Editors: VS Code with C# Dev Kit, Visual Studio, Rider. No screenshots-heavy tutorials.

**Key examples**

```csharp
// Program.cs — top-level statements
Console.WriteLine("Merhaba Dünya!");
```

```csharp
// Aynı program, klasik yapı
namespace HelloApp;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Merhaba Dünya!");
    }
}
```

```csharp
Console.Write("Adınız: ");
string? name = Console.ReadLine();
Console.WriteLine($"Hoş geldin, {name}!");
```

**Common mistakes**
- `Class Program` (capital C) → compile error; C# is case-sensitive.
- Curly quotes `“Merhaba”` copied from Word/slides → compile error.
- Missing `;`.
- Running `dotnet run` outside the project folder.

**Predict:** What does `Console.Write("A"); Console.WriteLine("B"); Console.Write("C");` print? (`AB` then `C` on the next line.)

**Leave out:** PE header layout, `_CorExeMain`, Ngen, ILDasm details (appendix only).

---

## 2. Türler ve Değişkenler — Types and variables (`/turler/`)

**Goal:** Choose the right type, declare variables, convert safely between types,
and understand value vs reference semantics.

**Must cover**
1. Declaring variables; definite assignment (a local must be assigned before use).
2. `var` — type inferred at compile time; still statically typed.
3. Built-in types table (correct values):

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

   Generate this table's numbers from a sample program that prints `MinValue`/`MaxValue`
   and `sizeof`, and state that on the page.
4. Which type when: `int` for counting, `double` for measurements/science,
   `decimal` for money, `long` for big integers, `bool` for flags.
5. `const` (compile-time) vs `readonly` (set once at runtime) — short.
6. Value types vs reference types: copy semantics, with a stack/heap diagram
   including the nuance that value-type fields of objects live on the heap.
7. Conversions: implicit (widening), explicit cast (narrowing, may lose data),
   `int.Parse`, `int.TryParse` (preferred for user input), `Convert.ToInt32`
   (note: `Convert.ToInt32(null)` returns 0, `int.Parse(null)` throws).
8. Overflow: default unchecked wrap-around; `checked` throws `OverflowException`.
9. Nullable value types: `int?`, `.HasValue`, `??`.
10. Boxing/unboxing — one short section: what it is, why it costs, generics avoid it.

**Key examples**

```csharp
// Değer türü: kopyalanır
int a = 5;
int b = a;
b = 10;
Console.WriteLine(a); // 5

// Referans türü: aynı nesneyi gösterir
int[] x = { 1, 2, 3 };
int[] y = x;
y[0] = 99;
Console.WriteLine(x[0]); // 99
```

```csharp
Console.WriteLine(0.1 + 0.2 == 0.3);     // False
Console.WriteLine(0.1m + 0.2m == 0.3m);  // True
Console.WriteLine(0.1 + 0.2);            // 0.30000000000000004
```
Explanation: `double` is binary floating point and cannot represent 0.1 exactly;
`decimal` is base-10. Use `decimal` for money.

```csharp
int max = int.MaxValue;
max++;
Console.WriteLine(max); // -2147483648 (taşma, sessizce başa sarar)

try
{
    int y2 = checked(int.MaxValue + 1);
}
catch (OverflowException)
{
    Console.WriteLine("Taşma yakalandı");
}
```
(Note for Claude Code: `checked(int.MaxValue + 1)` with constants is a compile-time
error. Use a variable: `int m = int.MaxValue; int y2 = checked(m + 1);`. Verify.)

```csharp
Console.Write("Yaşınız: ");
if (int.TryParse(Console.ReadLine(), out int age))
    Console.WriteLine($"Gelecek yıl {age + 1} yaşında olacaksınız.");
else
    Console.WriteLine("Lütfen geçerli bir sayı girin.");
```

```csharp
double d = 9.99;
int n = (int)d;
Console.WriteLine(n); // 9 — kesilir, yuvarlanmaz
Console.WriteLine(Math.Round(2.5)); // 2 — varsayılan "banker's rounding"
Console.WriteLine(Math.Round(2.5, MidpointRounding.AwayFromZero)); // 3
```

**Common mistakes**
- Using an unassigned local variable → CS0165.
- `int.Parse("12,5")` or `int.Parse("")` → `FormatException`; use `TryParse`.
- Expecting `(int)9.99` to round.
- Using `double` for money.
- Assuming `char` can hold every Unicode character (emoji need two `char`s).

**Predict ideas:** `byte b = 255; b++;` → 0. `var v = 5 / 2;` type and value (`int`, 2).
`string s1 = "a"; string s2 = s1; s2 += "b";` → s1 is still "a" (strings are immutable).

**Leave out:** CTS/CLS theory, full `Convert` method list.

---

## 3. Operatörler — Operators (`/operatorler/`)

**Goal:** Predict the result of expressions, including integer division, precedence,
and short-circuit evaluation.

**Must cover**
1. Arithmetic: `+ - * / %`; **integer division truncates**; `%` sign follows the dividend.
2. Increment/decrement: prefix vs postfix.
3. Comparison, equality (`==` on strings compares content).
4. Logical `&& || !` with **short-circuit**; `&` and `|` on bools do not short-circuit.
5. Compound assignment `+=` etc.
6. Conditional `?:`, null operators `??`, `??=`, `?.` (link to null chapter).
7. Precedence table (short) + advice: use parentheses when in doubt.
8. `is`, `as`, `typeof`, `nameof` — one line each, link to later chapters.
9. Bitwise operators — brief; full coverage in appendix.

**Key examples**

```csharp
Console.WriteLine(7 / 2);    // 3
Console.WriteLine(7 / 2.0);  // 3.5
Console.WriteLine(7 % 3);    // 1
Console.WriteLine(-7 % 3);   // -1

int i = 5;
Console.WriteLine(i++); // 5
Console.WriteLine(++i); // 7
```

```csharp
int[] scores = { };
// Kısa devre: ilk koşul false olduğu için ikinci koşul hiç çalışmaz
if (scores.Length > 0 && scores[0] > 50)
    Console.WriteLine("İlk not geçer.");
else
    Console.WriteLine("Not yok ya da geçmez.");
```

```csharp
int total = 7, count = 2;
double avg1 = total / count;          // 3 — önce tamsayı bölmesi yapılır!
double avg2 = (double)total / count;  // 3.5
```

**Common mistakes**
- Average calculated with integer division.
- `if (x > 0 & arr[0] > 0)` with empty array → exception (no short-circuit).
- Confusing `=` and `==` (C# blocks `if (x = 5)` for ints — show the compiler error).

**Predict ideas:** `Console.WriteLine(1 + 2 + "3" + 4 + 5);` → `3345`.
`int a = 10; a += a++ + ++a;` — use as "don't write code like this" example only after verifying the result.

---

## 4. Stringler — Strings (`/stringler/`)

**Goal:** Build, format, search and compare text correctly — including Turkish text.

**Must cover**
1. Strings are immutable reference types; `string.Empty`, `null` vs `""`.
2. Interpolation `$"..."`, format specifiers (`{x:F2}`, `{x:N0}`, `{date:dd.MM.yyyy}`),
   alignment (`{name,-10}`).
3. Verbatim `@"C:\temp"` and raw string literals `"""..."""`.
4. Common methods: `Length`, `ToUpper/ToLower`, `Trim`, `Contains`, `StartsWith`,
   `IndexOf`, `Substring`, `Replace`, `Split`, `string.Join`, `string.IsNullOrWhiteSpace`.
5. Culture: decimal separator (`3,14` vs `3.14`), and the **Turkish I problem**
   (`i` → `İ` in tr-TR). Use `ToUpperInvariant` / `StringComparison.OrdinalIgnoreCase`
   for identifiers, file names, commands.
6. `StringBuilder` for building strings in loops.
7. `char` helpers: `char.IsDigit`, `char.IsLetter`.

**Key examples**

```csharp
string name = "Ayşe";
double gpa = 3.456;
Console.WriteLine($"{name} — GNO: {gpa:F2}");  // Ayşe — GNO: 3.46
Console.WriteLine($"|{name,-8}|{gpa,6:F1}|");   // |Ayşe    |   3.5|
```

```csharp
using System.Globalization;

string cmd = "exit";
var tr = new CultureInfo("tr-TR");
Console.WriteLine(cmd.ToUpper(tr));           // EXİT
Console.WriteLine(cmd.ToUpperInvariant());    // EXIT
Console.WriteLine(string.Equals("FILE", "file", StringComparison.OrdinalIgnoreCase)); // True
```
Explanation: when a program runs on a Turkish-locale computer, `"exit".ToUpper() == "EXIT"`
can be **false**. This is a real bug in software written abroad; Turkish students
should know it first.

```csharp
string csv = "Ali;85;Bilgisayar";
string[] parts = csv.Split(';');
Console.WriteLine(parts[0]); // Ali
Console.WriteLine(string.Join(" | ", parts)); // Ali | 85 | Bilgisayar
```

```csharp
using System.Text;

var sb = new StringBuilder();
for (int i = 1; i <= 5; i++)
    sb.Append(i).Append(i < 5 ? ", " : "");
Console.WriteLine(sb.ToString()); // 1, 2, 3, 4, 5
```

**Common mistakes**
- `s.ToUpper();` without assigning — strings are immutable, the result is discarded.
- `Substring` with wrong length → `ArgumentOutOfRangeException`.
- `double.Parse("3.14")` on a Turkish-locale machine → 314 or exception; use
  `CultureInfo.InvariantCulture` for data files.
- String concatenation in a large loop (performance).

---

## 5. Kontrol Akışı — Control flow (`/kontrol-akisi/`)

**Goal:** Choose the right structure (if / switch / loop) and avoid classic loop bugs.

**Must cover**
1. `if / else if / else`; always use braces (explain the dangling-else and stray `;` bugs).
2. `switch` statement (no fall-through in C#; `case` must end with `break`/`return`).
3. **Switch expressions and pattern matching**: relational (`>= 90`), logical
   (`and`, `or`, `not`), type patterns (`is int n`), property patterns (short).
4. Loops: `for`, `while`, `do-while`, `foreach`; which to choose.
5. `break`, `continue`, `return`; avoid `goto`.
6. Nested loops, e.g. multiplication table.

**Key examples**

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
(Explain that the grading scale is an example; universities differ.)

```csharp
object value = 42;
if (value is int n && n > 40)
    Console.WriteLine($"Büyük bir tamsayı: {n}");
```

```csharp
// Kullanıcı doğru girene kadar sor: do-while'ın klasik kullanımı
int number;
do
{
    Console.Write("1-10 arası bir sayı: ");
} while (!int.TryParse(Console.ReadLine(), out number) || number < 1 || number > 10);
Console.WriteLine($"Teşekkürler: {number}");
```

```csharp
for (int row = 1; row <= 3; row++)
{
    for (int col = 1; col <= 3; col++)
        Console.Write($"{row * col,4}");
    Console.WriteLine();
}
```

**Common mistakes**
- `if (x > 5);` — the stray semicolon makes the block always run.
- Off-by-one: `for (int i = 0; i <= arr.Length; i++)` → `IndexOutOfRangeException`.
- Infinite `while` because the loop variable is never updated.
- Modifying the loop variable inside `for`.

**Predict ideas:** a `for` with `continue` on even numbers; a `switch` expression
with `_` placement; `while (i < 3) i++;` final value.

---

## 6. Metotlar — Methods (`/metotlar/`)

**Goal:** Write small, well-named methods with clear inputs and outputs.

**Must cover**
1. Anatomy: access modifier, `static`, return type, name, parameters.
2. Why methods: reuse, naming, testing. "One method, one job."
3. Return values vs `void`; early return.
4. Optional parameters and named arguments.
5. Overloading.
6. Parameter passing: by value (default), `ref`, `out`, `in`; passing a reference
   type by value (the object can change, the variable can't be reassigned).
7. `params` arrays.
8. Expression-bodied methods (`=>`), local functions.
9. Tuples for returning multiple values: `(int min, int max) MinMax(int[] a)`.
10. Recursion: base case, call stack, `StackOverflowException`, when to prefer a loop.

**Key examples**

```csharp
static double Average(params int[] numbers)
{
    if (numbers.Length == 0) return 0;
    int sum = 0;
    foreach (int n in numbers) sum += n;
    return (double)sum / numbers.Length;
}

Console.WriteLine(Average(70, 80, 95)); // 81.66666666666667
Console.WriteLine($"{Average(70, 80, 95):F2}"); // 81.67
```

```csharp
static void Swap(ref int a, ref int b) => (a, b) = (b, a);

int x = 1, y = 2;
Swap(ref x, ref y);
Console.WriteLine($"{x}, {y}"); // 2, 1
```

```csharp
static void Reset(int[] arr) { arr[0] = 0; }      // nesneyi değiştirir
static void Replace(int[] arr) { arr = new int[] { 9 }; } // sadece yerel kopyayı değiştirir

int[] data = { 5, 6 };
Reset(data);
Replace(data);
Console.WriteLine(data[0]); // 0
```

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

```csharp
static long Factorial(int n) => n <= 1 ? 1 : n * Factorial(n - 1);
Console.WriteLine(Factorial(20)); // 2432902008176640000
// Factorial(21) long'a sığmaz — sessizce taşar. Bunu gösterin.
```

Also include Fibonacci recursive vs iterative, with a note on why naive recursive
Fibonacci is exponentially slow (show call counts for n = 30).

**Common mistakes**
- Forgetting to use the return value (`Math.Abs(x);` alone does nothing).
- Recursion without a base case.
- Using `out` when a return value or tuple is clearer.
- Methods that print instead of returning (hard to reuse and test).

---

## 7. Diziler ve Koleksiyonlar — Arrays and collections (`/koleksiyonlar/`)

**Goal:** Pick the right collection and use it correctly.

**Must cover**
1. Arrays: fixed size, zero-based, `Length`, initialization forms, default values.
2. Multi-dimensional `int[,]` vs jagged `int[][]` — short, with a diagram.
3. `Array.Sort`, `Array.IndexOf`, `Array.Reverse`.
4. `List<T>`: `Add`, `Remove`, `Insert`, `Count`, `Contains`, indexer, `Sort`.
5. `Dictionary<TKey, TValue>`: add, `TryGetValue`, `ContainsKey`, iterate `KeyValuePair`.
6. `HashSet<T>`, `Queue<T>`, `Stack<T>` — one example each.
7. Collection expressions `[1, 2, 3]` (C# 12) — note with version label.
8. Choosing a collection table: need order? index? unique? key lookup? FIFO/LIFO?
9. Big-O intuition in one table (List lookup O(n), Dictionary lookup ~O(1)).

**Key examples**

```csharp
var grades = new List<int> { 85, 42, 91, 67 };
grades.Add(73);
grades.Remove(42);
grades.Sort();
Console.WriteLine(string.Join(", ", grades)); // 67, 73, 85, 91
Console.WriteLine(grades.Count);              // 4
```

```csharp
// Kelime sayma — Dictionary'nin klasik kullanımı
string text = "elma armut elma kiraz elma armut";
var counts = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
{
    counts[word] = counts.TryGetValue(word, out int c) ? c + 1 : 1;
}
foreach (var (word, count) in counts)
    Console.WriteLine($"{word}: {count}");
// elma: 3, armut: 2, kiraz: 1 (verify order and format)
```

```csharp
int[,] matrix = { { 1, 2, 3 }, { 4, 5, 6 } };
Console.WriteLine(matrix.GetLength(0)); // 2 satır
Console.WriteLine(matrix.GetLength(1)); // 3 sütun
Console.WriteLine(matrix[1, 2]);        // 6
```

```csharp
var queue = new Queue<string>();
queue.Enqueue("Ali"); queue.Enqueue("Veli");
Console.WriteLine(queue.Dequeue()); // Ali (ilk giren ilk çıkar)

var stack = new Stack<string>();
stack.Push("Ali"); stack.Push("Veli");
Console.WriteLine(stack.Pop());     // Veli (son giren ilk çıkar)
```

**Common mistakes**
- Removing items from a `List` inside `foreach` → `InvalidOperationException`.
  Fix: `RemoveAll`, iterate backwards with `for`, or build a new list.
- `dict[key]` for a missing key → `KeyNotFoundException`; use `TryGetValue`.
- Confusing `Length` (arrays) and `Count` (collections).
- Assuming dictionary iteration order is guaranteed.

**Leave out:** `ArrayList`/`Hashtable` (history note only), `Array.CreateInstance`.

---

## 8. Sınıflar ve Nesneler — Classes and objects (`/siniflar/`)

**Goal:** Design small classes with encapsulated state and meaningful behavior.

**Must cover**
1. Class vs object; `new`; references (two variables, one object).
2. Fields vs properties; why public fields are avoided.
3. Auto-properties, `{ get; private set; }`, `init`, `required` (C# 11, version note),
   computed properties (`public double Area => Width * Height;`).
4. Validation in property setters or methods.
5. Constructors, overloading, `this(...)` chaining, `this` keyword.
6. Object initializers `new Student { Name = "Ali" }`.
7. `static` members and static classes; when static is appropriate (utilities, counters).
8. Access modifiers: `public`, `private`, `protected`, `internal` — table.
9. Overriding `ToString()`.
10. Primary constructors (C# 12) — short version note.
11. Finalizers: one short note — rarely needed, GC timing is not deterministic,
    resource cleanup uses `IDisposable` (see Files chapter).

**Key examples**

```csharp
public class BankAccount
{
    public string Owner { get; }
    public decimal Balance { get; private set; }

    public BankAccount(string owner, decimal initialBalance = 0)
    {
        if (string.IsNullOrWhiteSpace(owner))
            throw new ArgumentException("Hesap sahibi boş olamaz.", nameof(owner));
        Owner = owner;
        Balance = initialBalance;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentOutOfRangeException(nameof(amount), "Tutar pozitif olmalı.");
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
Usage: deposit, failed withdraw, successful withdraw, print. Explain why `Balance`
has a private setter: the class protects its own rules (encapsulation).

```csharp
public class Rectangle
{
    public double Width { get; }
    public double Height { get; }
    public double Area => Width * Height;

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public Rectangle(double side) : this(side, side) { } // kare
}
```

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

**Common mistakes**
- Public fields that let callers break invariants (`account.Balance = -500`).
- Calling an instance member from `static Main` without an object → CS0120.
- `NullReferenceException` from an object that was declared but never created.
- Recursive property: `public string Name { get => Name; }` → stack overflow.

---

## 9. Record, Struct, Enum (`/record-struct-enum/`)

**Goal:** Know when to use a class, record, struct, or enum.

**Must cover**
1. Records: value-based equality, concise syntax, `with` expressions, good for data.
2. Structs: value types, small immutable data (`Point`), copy semantics; `readonly struct`.
3. Enums: named constants, underlying `int`, `switch` on enums, `Enum.TryParse`,
   `[Flags]` (short).
4. Comparison table: class / record / struct — equality, copy, mutability, typical use.

**Key examples**

```csharp
public record Course(string Code, string Title, int Credits);

var c1 = new Course("BLM101", "Programlamaya Giriş", 4);
var c2 = new Course("BLM101", "Programlamaya Giriş", 4);
Console.WriteLine(c1 == c2);   // True — değer eşitliği
Console.WriteLine(c1);         // Course { Code = BLM101, Title = Programlamaya Giriş, Credits = 4 }

var c3 = c1 with { Credits = 5 };
Console.WriteLine(c3.Credits); // 5
```
Contrast with the same data in a `class` → `==` is `False` (reference equality).

```csharp
public enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }

static bool IsWeekend(Day d) => d is Day.Saturday or Day.Sunday;
Console.WriteLine(IsWeekend(Day.Sunday)); // True
Console.WriteLine((int)Day.Wednesday);    // 2
```

```csharp
public struct Point { public int X; public int Y; }

var p1 = new Point { X = 1, Y = 2 };
var p2 = p1;
p2.X = 100;
Console.WriteLine(p1.X); // 1 — struct kopyalandı
```

---

## 10. Kalıtım ve Çok Biçimlilik — Inheritance and polymorphism (`/kalitim/`)

**Goal:** Use inheritance and interfaces to write code that works with many types,
and know when *not* to use inheritance.

**Must cover**
1. Base and derived classes, `: Base`, `base(...)` constructor call, constructor order.
2. `protected`.
3. `virtual` / `override`; calling `base.Method()`.
4. Polymorphism: a `List<Shape>` holding different shapes, each computing its own area.
5. `abstract` classes and methods.
6. `sealed`.
7. Method hiding with `new` — short, mainly to explain compiler warning CS0108 and
   why `override` is usually what you want.
8. Interfaces: contracts, multiple interfaces, naming `I...`; programming to an interface.
9. Abstract class vs interface table.
10. Composition over inheritance ("has-a" vs "is-a") with a small example.
11. `object` members: `ToString`, `Equals`, `GetHashCode` (short).

**Key examples**

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

```csharp
public interface INotifier
{
    void Send(string to, string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string to, string message) =>
        Console.WriteLine($"E-posta → {to}: {message}");
}

public class SmsNotifier : INotifier
{
    public void Send(string to, string message) =>
        Console.WriteLine($"SMS → {to}: {message}");
}

public class ExamService
{
    private readonly INotifier _notifier;
    public ExamService(INotifier notifier) => _notifier = notifier;
    public void AnnounceResult(string student, int score) =>
        _notifier.Send(student, $"Sınav notunuz: {score}");
}
```
Explain: `ExamService` doesn't know or care *how* messages are sent. This is the
idea behind dependency injection and makes testing easy.

Also include a `virtual` vs `new` example showing different results when called
through a base-class reference.

**Common mistakes**
- Forgetting `override` (hides instead of overrides → wrong method called).
- Deep inheritance trees for code reuse ("Penguin : Bird" with `Fly()`).
- Trying to instantiate an abstract class → CS0144.

---

## 11. Null Güvenliği — Null safety (`/null-guvenligi/`)

**Goal:** Understand `null`, avoid `NullReferenceException`, read nullable warnings.

**Must cover**
1. What `null` means; `NullReferenceException` and how to read it.
2. Nullable reference types (`string?` vs `string`), compiler warnings (CS8600, CS8602),
   enabled by default in new projects.
3. Operators: `?.`, `??`, `??=`, `!` (null-forgiving — use rarely, explain the risk).
4. Guard clauses: `ArgumentNullException.ThrowIfNull(x)`.
5. `is null` / `is not null`.

**Key examples**

```csharp
string? nickname = null;
Console.WriteLine(nickname?.Length ?? 0);   // 0
nickname ??= "misafir";
Console.WriteLine(nickname);                // misafir
```

```csharp
Student? found = students.FirstOrDefault(s => s.Name == "Zeynep");
if (found is null)
    Console.WriteLine("Öğrenci bulunamadı.");
else
    Console.WriteLine(found.Id);
```

**Common mistakes:** ignoring warnings; sprinkling `!` to silence the compiler;
`Console.ReadLine()` returning `null` at end of input.

---

## 12. Hatalar (Exceptions) (`/hatalar/`)

**Goal:** Handle errors deliberately: catch what you can handle, let the rest surface.

**Must cover**
1. What an exception is; reading a stack trace (show a real one, annotated).
2. `try / catch / finally`; catching specific exceptions first.
3. `throw` and `throw;` (rethrow preserving stack trace) vs `throw ex;`.
4. Common exception types table: `FormatException`, `NullReferenceException`,
   `IndexOutOfRangeException`, `ArgumentException` family, `InvalidOperationException`,
   `DivideByZeroException` (integers only — `1.0 / 0` is `Infinity`), `FileNotFoundException`.
5. Exception filters `catch (X ex) when (...)` — short.
6. Custom exceptions — short.
7. Guidelines: don't use exceptions for normal control flow (`TryParse` pattern);
   never swallow with an empty `catch`; validate arguments early.

**Key examples**

```csharp
try
{
    int[] a = new int[3];
    a[5] = 1;
}
catch (IndexOutOfRangeException ex)
{
    Console.WriteLine($"Hata: {ex.Message}");
}
finally
{
    Console.WriteLine("finally bloğu her durumda çalışır.");
}
```

```csharp
Console.WriteLine(1.0 / 0);  // ∞ (verify exact output: "∞" or "Infinity")
int zero = 0;
Console.WriteLine(1 / zero); // DivideByZeroException
```

```csharp
public class InsufficientBalanceException : Exception
{
    public InsufficientBalanceException(decimal requested, decimal available)
        : base($"İstenen {requested:N2} TL, mevcut {available:N2} TL.") { }
}
```

**Common mistakes:** `catch (Exception) { }` hiding bugs; catching general `Exception`
before specific ones (CS0160); using exceptions where an `if` is enough.

---

## 13. Generics, Delegate ve Lambda (`/generics-lambda/`)

**Goal:** Read and write generic methods and lambdas — required for LINQ and modern APIs.

**Must cover**
1. Why generics: `List<int>` vs untyped `ArrayList` (type safety, no boxing).
2. Generic method `T Max<T>(T a, T b) where T : IComparable<T>`; generic class `Box<T>` — short.
3. Delegates as "a variable that holds a method"; `Func<>`, `Action<>`, `Predicate<>`.
4. Lambda syntax: `x => x * 2`, `(a, b) => a + b`, statement lambdas.
5. Capturing variables (closures) — short.
6. Events — one short example (button click / timer idea), no deep dive.

**Key examples**

```csharp
static T Max<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) >= 0 ? a : b;

Console.WriteLine(Max(3, 7));          // 7
Console.WriteLine(Max("elma", "armut")); // elma
```

```csharp
Func<int, int> square = x => x * x;
Func<int, int, int> add = (a, b) => a + b;
Action<string> greet = name => Console.WriteLine($"Merhaba {name}");
Predicate<int> isEven = n => n % 2 == 0;

Console.WriteLine(square(5));  // 25
Console.WriteLine(add(2, 3));  // 5
greet("Deniz");                // Merhaba Deniz
Console.WriteLine(isEven(4));  // True
```

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
Explain: this hand-written `Filter` is what LINQ's `Where` does — bridge to next chapter.

---

## 14. LINQ (`/linq/`)

**Goal:** Query collections declaratively and understand what LINQ does under the hood.

**Must cover**
1. Method syntax (primary) and query syntax (short).
2. `Where`, `Select`, `OrderBy/OrderByDescending/ThenBy`, `First/FirstOrDefault`,
   `Single`, `Any/All`, `Count`, `Sum/Average/Min/Max`, `GroupBy`, `Distinct`,
   `Take/Skip`, `ToList/ToDictionary`.
3. Deferred execution and why `ToList()` matters.
4. Same query written with a `foreach` loop, side by side — LINQ is not magic.
5. Readability: when a loop is clearer.

**Key examples** — use one shared dataset:

```csharp
public record Student(string Name, string Department, int Score);

var students = new List<Student>
{
    new("Ayşe",   "Bilgisayar", 85),
    new("Mehmet", "Elektrik",   92),
    new("Can",    "Bilgisayar", 58),
    new("Zeynep", "Makine",     74),
    new("Emre",   "Elektrik",   66),
};
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

```csharp
var byDept = students
    .GroupBy(s => s.Department)
    .Select(g => new { Department = g.Key, Count = g.Count(), Avg = g.Average(s => s.Score) });

foreach (var d in byDept)
    Console.WriteLine($"{d.Department}: {d.Count} öğrenci, ort. {d.Avg:F1}");
```

```csharp
var numbers = new List<int> { 1, 2, 3 };
var big = numbers.Where(n => n > 1);   // henüz çalışmadı
numbers.Add(4);
Console.WriteLine(big.Count());        // 3 — sorgu şimdi çalıştı ve 4'ü de gördü
```

**Common mistakes:** `First()` on an empty sequence (`InvalidOperationException`);
enumerating an expensive query multiple times; very long chained queries that no
one can read.

---

## 15. Dosyalar — Files and `using` (`/dosyalar/`)

**Goal:** Read and write text files safely, and understand resource cleanup.

**Must cover**
1. Simple API first: `File.ReadAllText`, `File.ReadAllLines`, `File.WriteAllText`,
   `File.AppendAllText`, `File.Exists`.
2. `Path.Combine`, relative vs absolute paths, where the program's working directory is.
3. Streams for large files: `StreamReader` / `StreamWriter` with `using`.
4. `IDisposable` and `using` declarations — why files must be closed.
5. `Directory.CreateDirectory`, `Directory.GetFiles` — short.
6. A small CSV example (read, parse with `CultureInfo.InvariantCulture`, compute, write report).
7. JSON with `System.Text.Json` — one short example (serialize/deserialize a record).

**Key examples**

```csharp
string path = Path.Combine("data", "notlar.txt");
Directory.CreateDirectory("data");
File.WriteAllLines(path, new[] { "Ali,85", "Ayşe,92", "Can,58" });

foreach (string line in File.ReadAllLines(path))
{
    var parts = line.Split(',');
    Console.WriteLine($"{parts[0],-6} {int.Parse(parts[1]),3}");
}
```

```csharp
using var writer = new StreamWriter("log.txt", append: true);
writer.WriteLine($"{DateTime.Now:yyyy-MM-dd HH:mm} program başladı");
// writer, kapsam bittiğinde otomatik kapatılır (Dispose)
```

```csharp
using System.Text.Json;

var course = new Course("BLM101", "Programlamaya Giriş", 4);
string json = JsonSerializer.Serialize(course);
Console.WriteLine(json);
var back = JsonSerializer.Deserialize<Course>(json);
Console.WriteLine(back == course); // True
```
(Check how Turkish characters are escaped in the JSON output and explain it.)

**Common mistakes:** hard-coded `C:\Users\...` paths; forgetting `using` (file locked);
`FileNotFoundException` because the working directory is `bin/Debug/...`.

**Leave out:** full `Directory`/`FileInfo`/`DirectoryInfo` method catalogs, `BinaryReader`
(one-line mention), `FileStream` byte-level details.

---

## 16. async / await (`/async/`)

**Goal:** Understand what async code is for and read/write basic async methods.

**Must cover**
1. Why: waiting for I/O (network, disk) without blocking.
2. `Task`, `Task<T>`, `async`, `await`; async Main via top-level statements.
3. Running tasks concurrently with `Task.WhenAll`.
4. `HttpClient` example (optional; mark as needing internet).
5. Pitfalls: `.Result` / `.Wait()` blocking, `async void` (only for event handlers),
   forgetting `await`.

**Key example**

```csharp
using System.Diagnostics;

static async Task<string> DownloadAsync(string name, int ms)
{
    await Task.Delay(ms); // gerçek bir indirme yerine bekleme
    return $"{name} indirildi";
}

var sw = Stopwatch.StartNew();
string[] results = await Task.WhenAll(
    DownloadAsync("A", 1000),
    DownloadAsync("B", 1000));
Console.WriteLine(string.Join(", ", results));
Console.WriteLine($"Süre: ~{sw.Elapsed.TotalSeconds:F0} sn"); // ~1 sn, 2 değil
```
Compare with awaiting them one after another (~2 s).

---

## 17. Hata Ayıklama ve Test — Debugging and testing (`/hata-ayiklama-test/`)

**Goal:** Find bugs systematically and check code (including AI-written code) with tests.

**Must cover**
1. Reading compiler errors: error code (CS0103…), file, line. Table of the 10 most
   common beginner errors with meaning and fix.
2. Reading runtime exceptions and stack traces.
3. Debugger in VS Code / Visual Studio: breakpoints, step over/into, watch, call stack.
   Keep UI-specific text short; focus on concepts.
4. Debugging strategy: reproduce → isolate → hypothesize → check → fix → add a test.
5. Unit testing with **xUnit**: `dotnet new xunit`, `[Fact]`, `[Theory]` + `[InlineData]`,
   Arrange–Act–Assert, `dotnet test`. Testing edge cases (empty, zero, negative, max).
6. Solution layout: `src/GradeApp`, `tests/GradeApp.Tests`, project reference.

**Key example**

```csharp
public static class Grader
{
    public static string LetterGrade(int score) => score switch
    {
        < 0 or > 100 => throw new ArgumentOutOfRangeException(nameof(score)),
        >= 90 => "AA",
        >= 50 => "DD",   // kısaltılmış örnek
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
Explain boundary values (90, 89, 50, 49) — this is where bugs live.

---

## 18. Yapay Zekâ ile Programlama Öğrenmek — Learning with AI (`/yapay-zeka/`)

**Goal:** Students use AI as a tutor and reviewer, not as a replacement for thinking.

**Must cover**
1. Honest framing: AI writes plausible code quickly, and it is sometimes wrong in
   subtle ways. Your value is understanding, judging and verifying.
2. When to avoid AI: while first learning a concept, in labs/exams where not allowed,
   when you can't yet explain the code it would give you.
3. Good learning prompts (examples in Turkish):
   - "Bu hatayı açıkla ama çözümü yazma: …"
   - "Bu kodu satır satır açıkla, sonra bana anladığımı ölçen 3 soru sor."
   - "Yazdığım kodu incele; hataları söyle ama düzeltilmiş kodu verme."
   - "Bana bu konuda çıktıyı tahmin et tarzında 5 alıştırma ver."
4. Verification checklist for any AI-generated code: Does it compile? Can I explain
   every line? What happens with empty/null/negative/huge input? Are there tests?
   Does it use APIs that actually exist? Is it modern C#?
5. An exercise: an AI-style solution with 3 hidden bugs (integer-division average,
   off-by-one loop, missing null check). Students find them. Provide the answers in `<Predict>`.
6. Academic integrity: follow course rules; cite AI help when required.

---

## 19. Ekler — Appendices (`/ekler/`)

Short pages, each with 1–2 examples:
- **Operator overloading** — `Complex` or `Money` type with `+` and `==`.
- **Indexers** — a `Gradebook` class with `this[string name]`.
- **Bitwise operators** — `& | ^ ~ << >>`, flags example with `[Flags] enum Permission`.
- **Under the hood** — IL, JIT, assemblies, GC generations; show `dotnet build` output
  and optionally IL of a tiny method. Clearly marked as optional.
- **Date and time** — `DateTime`, `DateOnly`, `TimeSpan`, formatting, age calculation.
- **Git basics** — `init`, `add`, `commit`, `status`, `log`, `.gitignore` for .NET, GitHub.
- **Old code you may see** — `ArrayList`, `Hashtable`, destructors, `csc.exe`,
  .NET Framework vs modern .NET; what to use instead.

---

## 20. Kopya Kâğıdı — Printable cheat sheet (`/kopya-kagidi/`)

One page (A4 when printed, two columns) with the most-used syntax: variable declarations,
types, string formatting, if/switch expression, loops, method, class with property and
constructor, record, List/Dictionary, LINQ basics, try/catch, file read/write, async.
Every snippet must also exist as a verified sample.

---

## Mini projects (optional, add at the end)

Small end-to-end programs linking several chapters, each with a short spec, starter
checklist, and a reference solution hidden behind `<details>`:

1. **Not Hesaplayıcı** — read student scores from CSV, compute averages and letter
   grades, write a report. (Strings, collections, LINQ, files, exceptions.)
2. **Kütüphane Sistemi** — books, members, borrowing rules with classes, interfaces,
   and xUnit tests. (OOP, testing.)
3. **Adam Asmaca / Hangman** console game. (Loops, strings, methods.)
