var a = new Counter();
var b = a;                  // same object
a.Increment();
b.Increment();
Console.WriteLine(a.Value);
Console.WriteLine(ReferenceEquals(a, b));

class Counter
{
    public int Value { get; private set; }
    public void Increment() => Value++;
}
