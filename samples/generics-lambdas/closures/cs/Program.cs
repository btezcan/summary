var next = MakeCounter();
Console.WriteLine(next());
Console.WriteLine(next());

var other = MakeCounter();
Console.WriteLine(other());

// The lambda keeps "count" alive
static Func<int> MakeCounter()
{
    int count = 0;
    return () => ++count;
}
