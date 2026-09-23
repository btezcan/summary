Func<int, int> square = x => x * x;
Func<int, int, int> add = (a, b) => a + b;
Action<string> greet =
    name => Console.WriteLine($"Hello {name}");
Predicate<int> isEven = n => n % 2 == 0;

Console.WriteLine(square(5));
Console.WriteLine(add(2, 3));
greet("Deniz");
Console.WriteLine(isEven(4));
