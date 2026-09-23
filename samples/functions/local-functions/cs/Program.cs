int[] values = { 1, 2, 3 };
Console.WriteLine(SumOfSquares(values));

static int SumOfSquares(int[] values)
{
    // A local function, expression-bodied
    int Square(int x) => x * x;

    int total = 0;
    foreach (int v in values)
        total += Square(v);
    return total;
}
