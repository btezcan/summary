Console.WriteLine(Factorial(20));
Console.WriteLine(Factorial(21));   // too big!

static long Factorial(int n) =>
    n <= 1 ? 1 : n * Factorial(n - 1);
