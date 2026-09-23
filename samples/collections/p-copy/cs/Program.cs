var a = new List<int> { 1, 2 };
var b = a;
var c = new List<int>(a);
b.Add(3);
Console.WriteLine(
    $"{a.Count} {b.Count} {c.Count}");
