int[] scores = { 70, 80, 90 };
Console.WriteLine(Average(scores));   // 80?

static double Average(int[] values)
{
    int sum = 0;
    for (int i = 1; i < values.Length; i++)
    {
        sum += values[i];
        Console.WriteLine($"i={i}, sum={sum}");
    }
    return (double)sum / values.Length;
}
