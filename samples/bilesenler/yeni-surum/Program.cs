// C# 13: params artık List<T> gibi koleksiyonlarla da kullanılabilir.
static int Sum(params List<int> numbers) => numbers.Sum();

Console.WriteLine(Sum(1, 2, 3));
