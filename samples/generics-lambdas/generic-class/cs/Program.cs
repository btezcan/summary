var number = new Box<int>(42);
var word = new Box<string>("hi");
Console.WriteLine(number.Value + 1);
Console.WriteLine(word.Value.ToUpper());
Console.WriteLine(number);

class Box<T>(T value)
{
    public T Value { get; } = value;
    public override string ToString() =>
        $"Box<{typeof(T).Name}>({Value})";
}
