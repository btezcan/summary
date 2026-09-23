Console.WriteLine($"{Shapes.Area(1):F2}");
Console.WriteLine(Shapes.Area(2, 3));

static class Shapes
{
    // Same name, different parameters
    public static double Area(double radius) =>
        Math.PI * radius * radius;

    public static double Area(
        double w, double h) => w * h;
}
