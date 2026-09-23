var a = new Student("Ali");
var b = new Student("Ayşe");
Console.WriteLine($"{a.Id} {b.Id}");
Console.WriteLine(Student.Count);

class Student
{
    private static int _nextId = 1;   // shared
    public static int Count => _nextId - 1;

    public int Id { get; }
    public string Name { get; }

    public Student(string name)
    {
        Id = _nextId++;
        Name = name;
    }
}
