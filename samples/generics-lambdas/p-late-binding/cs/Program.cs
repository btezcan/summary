var fromFor = new List<Func<int>>();
for (int i = 0; i < 3; i++)
    fromFor.Add(() => i);

var fromForeach = new List<Func<int>>();
foreach (int i in new[] { 0, 1, 2 })
    fromForeach.Add(() => i);

Console.WriteLine(
    string.Join(" ", fromFor.Select(f => f())));
Console.WriteLine(
    string.Join(" ", fromForeach.Select(f => f())));
