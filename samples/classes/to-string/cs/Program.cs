var p = new Point(3, 4);
Console.WriteLine(p);
Console.WriteLine($"Point is {p}");

class Point(int x, int y)     // C# 12
{
    public int X { get; } = x;
    public int Y { get; } = y;

    public override string ToString() =>
        $"({X}, {Y})";
}
