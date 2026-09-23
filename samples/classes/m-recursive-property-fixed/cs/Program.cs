var s = new Student();
s.Name = "Ali";
Console.WriteLine(s.Name);

class Student
{
    private string _name = "";

    public string Name
    {
        get => _name;
        set => _name = value;
    }
}
