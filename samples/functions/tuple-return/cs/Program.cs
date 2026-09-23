var (lo, hi) = MinMax(new[] { 4, 9, 1, 7 });
Console.WriteLine($"{lo} - {hi}");

static (int Min, int Max) MinMax(int[] values)
{
    int min = values[0], max = values[0];
    foreach (int v in values)
    {
        if (v < min) min = v;
        if (v > max) max = v;
    }
    return (min, max);
}
