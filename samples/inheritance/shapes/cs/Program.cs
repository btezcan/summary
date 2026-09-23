List<Shape> shapes =
    [new Circle(1), new Rect(2, 3)];
foreach (Shape s in shapes)
    Console.WriteLine(s);

abstract class Shape
{
    public abstract double Area();

    public override string ToString() =>
        $"{GetType().Name}: {Area():F2}";
}

class Circle(double radius) : Shape
{
    public override double Area() =>
        Math.PI * radius * radius;
}

class Rect(double w, double h) : Shape
{
    public override double Area() => w * h;
}
