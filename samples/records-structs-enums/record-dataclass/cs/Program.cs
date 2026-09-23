var c1 = new Course("CS101", "Intro", 4);
var c2 = new Course("CS101", "Intro", 4);
Console.WriteLine(c1 == c2);
Console.WriteLine(c1);

var c3 = c1 with { Credits = 5 };
Console.WriteLine(c3.Credits);
Console.WriteLine(c1.Credits);

record Course(string Code, string Title,
    int Credits);
