var points = new List<Point> { new() { X = 1 } };
points[0].X = 5;
Console.WriteLine(points[0].X);

struct Point
{
    public int X { get; set; }
}
