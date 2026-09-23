var names = new List<string>
    { "Zeynep", "Ali", "Can", "Ayşe" };

names.Sort((a, b) =>
    a.Length.CompareTo(b.Length));
Console.WriteLine(string.Join(" ", names));

var byLast = names.OrderBy(n => n[^1]);
Console.WriteLine(string.Join(" ", byLast));
