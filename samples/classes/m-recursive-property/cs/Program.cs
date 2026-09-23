var s = new Student();
s.Name = "Ali";
Console.WriteLine(s.Name);

class Student
{
    public string Name
    {
        get => Name;         // calls itself!
        set => Name = value;
    }
}
