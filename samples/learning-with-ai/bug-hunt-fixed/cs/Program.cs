int[] scores = { 70, 45, 90, 85 };
Console.WriteLine(AveragePassing(scores));
Console.WriteLine(AveragePassing(null));

static double AveragePassing(int[]? scores)
{
    if (scores is null) return 0;     // bug 3
    int sum = 0, count = 0;
    foreach (int s in scores)         // bug 1
    {
        if (s >= 50)
        {
            sum += s;
            count++;
        }
    }
    if (count == 0) return 0;
    return (double)sum / count;       // bug 2
}
