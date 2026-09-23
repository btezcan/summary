// "Average of the passing scores",
// as an AI assistant might write it.
int[] scores = { 70, 45, 90, 85 };
Console.WriteLine(AveragePassing(scores));
Console.WriteLine(AveragePassing(null));

static double AveragePassing(int[]? scores)
{
    int sum = 0, count = 0;
    for (int i = 1; i < scores.Length; i++)
    {
        if (scores[i] >= 50)
        {
            sum += scores[i];
            count++;
        }
    }
    return sum / count;
}
