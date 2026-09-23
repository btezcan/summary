var r = new Rectangle(2, 3);
var s = new Rectangle(4);
Console.WriteLine(r.Area);
Console.WriteLine(s.Area);

class Rectangle
{
    public double Width { get; }
    public double Height { get; }
    public double Area => Width * Height;

    public Rectangle(double w, double h)
    {
        Width = w;
        Height = h;
    }

    // Chains to the other constructor
    public Rectangle(double side)
        : this(side, side) { }
}
