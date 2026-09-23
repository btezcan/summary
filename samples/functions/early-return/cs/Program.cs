foreach (int n in new[] { -5, 0, 7 })
    Console.WriteLine(Classify(n));

static string Classify(int n)
{
    if (n < 0) return "negative";
    if (n == 0) return "zero";
    return "positive";
}
