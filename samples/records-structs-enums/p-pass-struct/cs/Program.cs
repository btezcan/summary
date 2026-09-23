var p = new Point { X = 1 };
Move(p);
Console.WriteLine(p.X);

static void Move(Point pt) => pt.X += 10;

struct Point
{
    public int X { get; set; }
}
