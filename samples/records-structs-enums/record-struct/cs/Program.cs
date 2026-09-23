var a = new Point(1, 2);
var b = a with { X = 5 };
Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(a == new Point(1, 2));

// A small, immutable value type
readonly record struct Point(int X, int Y);
