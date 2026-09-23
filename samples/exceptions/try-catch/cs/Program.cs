try
{
    int[] a = new int[3];
    a[5] = 1;
    Console.WriteLine("not reached");
}
catch (IndexOutOfRangeException e)
{
    Console.WriteLine($"Error: {e.Message}");
}
finally
{
    Console.WriteLine("finally always runs");
}
