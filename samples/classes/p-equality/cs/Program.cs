var a = new Point(1, 2);
var b = new Point(1, 2);
var c = a;
Console.WriteLine(a == b);
Console.WriteLine(a == c);

class Point(int x, int y)
{
    public int X { get; } = x;
    public int Y { get; } = y;
}
