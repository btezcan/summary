var points = new List<Point> { new() { X = 1 } };
Point p = points[0];   // a copy
p.X = 5;
points[0] = p;         // store the copy back
Console.WriteLine(points[0].X);

struct Point
{
    public int X { get; set; }
}
