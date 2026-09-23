var a = new Point(1, 2);
var b = a with { Y = 5 };
Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(a == new Point(1, 2));

var day = Day.Tue;
Console.WriteLine($"{day} {(int)day}");

record Point(int X, int Y);
enum Day { Mon = 1, Tue, Wed }
