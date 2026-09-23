namespace Proje;

public class Student(string name)
{
    public string Name { get; } = name;
    public override string ToString() => $"Öğrenci: {Name}";
}
