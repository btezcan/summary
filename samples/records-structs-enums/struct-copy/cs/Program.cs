var p1 = new Point { X = 1, Y = 2 };
var p2 = p1;          // copies the struct
p2.X = 100;
Console.WriteLine(p1.X);
Console.WriteLine(p2.X);

struct Point
{
    public int X { get; set; }
    public int Y { get; set; }
}
