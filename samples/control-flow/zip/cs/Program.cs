string[] names = { "Ali", "Ayşe", "Can" };
int[] scores = { 85, 92, 58 };

foreach (var (name, score) in names.Zip(scores))
    Console.WriteLine($"{name}: {score}");
