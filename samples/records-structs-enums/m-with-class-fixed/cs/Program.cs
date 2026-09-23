var a = new Course("CS101", 4);
var b = a with { Credits = 5 };
Console.WriteLine(b.Credits);

record Course(string Code, int Credits);
