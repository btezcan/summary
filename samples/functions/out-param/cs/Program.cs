// out: the method must assign it
if (TryDivide(7, 2, out double result))
    Console.WriteLine(result);
if (!TryDivide(7, 0, out _))
    Console.WriteLine("cannot divide by 0");

static bool TryDivide(int a, int b,
    out double result)
{
    result = b == 0 ? 0 : (double)a / b;
    return b != 0;
}
