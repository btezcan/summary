int max = int.MaxValue;
max++;                    // wraps silently
Console.WriteLine(max);

int m = int.MaxValue;
try
{
    int next = checked(m + 1);
    Console.WriteLine(next);
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);
}
