var s = new Student("Ali", 85);
s.Grade = 120;
Console.WriteLine(s);
Console.WriteLine(s.Passed);

class Student
{
    public string Name { get; }
    private int _grade;
    public int Grade
    {
        get => _grade;
        set => _grade =
            Math.Clamp(value, 0, 100);
    }

    public bool Passed => Grade >= 50;

    public Student(string name, int grade)
    {
        Name = name;
        Grade = grade;
    }

    public override string ToString() =>
        $"{Name}: {Grade}";
}
