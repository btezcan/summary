var ali = new Student("Ali", null);
var can = new Student("Can",
    new Student("Prof. Demir", null));

foreach (var s in new[] { ali, can })
    Console.WriteLine(
        s.Advisor?.Name ?? "no advisor");

record Student(string Name, Student? Advisor);
