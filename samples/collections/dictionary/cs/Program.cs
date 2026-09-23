var ages = new Dictionary<string, int>
{
    ["Ali"] = 20,
    ["Ayşe"] = 22,
};
ages["Can"] = 19;            // add or replace
Console.WriteLine(ages.Count);
Console.WriteLine(ages.ContainsKey("Can"));

if (ages.TryGetValue("Zeynep", out int age))
    Console.WriteLine(age);
else
    Console.WriteLine("no Zeynep");

foreach (var (name, a) in ages)
    Console.WriteLine($"{name}: {a}");
