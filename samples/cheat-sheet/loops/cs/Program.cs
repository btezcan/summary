for (int i = 0; i < 3; i++)
    Console.Write(i);          // 012
Console.WriteLine();

string[] names = ["Ali", "Can"];
foreach (var name in names)
    Console.WriteLine(name);

for (int i = 0; i < names.Length; i++)
    Console.WriteLine($"{i}: {names[i]}");

int n = 0;
while (n < 3) n++;
Console.WriteLine(n);
