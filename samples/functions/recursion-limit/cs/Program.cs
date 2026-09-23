try
{
    Console.WriteLine(Countdown(5));
}
catch (Exception)
{
    Console.WriteLine("caught");   // never runs
}

static int Countdown(int n) =>
    1 + Countdown(n - 1);   // no base case!
