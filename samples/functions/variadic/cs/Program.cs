Console.WriteLine(Average(70, 80, 95));
Console.WriteLine($"{Average(70, 80, 95):F2}");
Console.WriteLine(Average());

static double Average(params int[] numbers)
{
    if (numbers.Length == 0) return 0;
    int sum = 0;
    foreach (int n in numbers) sum += n;
    return (double)sum / numbers.Length;
}
