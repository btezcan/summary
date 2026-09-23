int calls = 0;
Console.WriteLine(Fib(30));
Console.WriteLine($"{calls:N0} calls");
Console.WriteLine(FibLoop(30));

long Fib(int n)
{
    calls++;
    return n < 2 ? n : Fib(n - 1) + Fib(n - 2);
}

static long FibLoop(int n)
{
    long a = 0, b = 1;
    for (int i = 0; i < n; i++)
        (a, b) = (b, a + b);
    return a;
}
