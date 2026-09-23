var s = new Student { Name = "Ali", Year = 2 };
Console.WriteLine($"{s.Name}, year {s.Year}");

var t = new Student { Name = "Can" };
Console.WriteLine($"{t.Name}, year {t.Year}");

class Student
{
    public required string Name { get; init; }
    public int Year { get; init; } = 1;
}
