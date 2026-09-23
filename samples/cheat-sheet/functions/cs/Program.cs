Console.WriteLine(Add(2, 3));
Console.WriteLine(Greet("Ali"));
Console.WriteLine(Greet("Ali", "Hey"));
Console.WriteLine(Sum(1, 2, 3));
var (min, max) = MinMax([4, 1, 9]);
Console.WriteLine($"{min} {max}");

static int Add(int a, int b) => a + b;

static string Greet(string name,
                    string word = "Hi") =>
    $"{word}, {name}";

static int Sum(params int[] xs) => xs.Sum();

static (int, int) MinMax(int[] xs) =>
    (xs.Min(), xs.Max());
