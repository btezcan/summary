Count(3);
Console.WriteLine();

static void Count(int n)
{
    if (n == 0) return;
    Console.Write($"{n} ");
    Count(n - 1);
    Console.Write($"{n} ");
}
