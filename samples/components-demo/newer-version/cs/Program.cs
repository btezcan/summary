// C# 13: params works with List<T> too.
static int Sum(params List<int> numbers) =>
    numbers.Sum();

Console.WriteLine(Sum(1, 2, 3));
