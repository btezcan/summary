var a = new Course("CS101", 4);
var b = a with { Credits = 5 };
Console.WriteLine(b.Credits);

class Course(string code, int credits)
{
    public string Code { get; init; } = code;
    public int Credits { get; init; } = credits;
}
