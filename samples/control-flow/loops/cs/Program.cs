for (int i = 0; i < 3; i++)
    Console.Write($"{i} ");
Console.WriteLine();

string[] names = { "Ali", "Ayşe", "Can" };
foreach (string name in names)
    Console.Write($"{name} ");
Console.WriteLine();

for (int i = 0; i < names.Length; i++)
    Console.Write($"{i}:{names[i]} ");
Console.WriteLine();
