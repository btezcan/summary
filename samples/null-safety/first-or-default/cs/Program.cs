var names = new List<string> { "Ali", "Ayşe" };
string? found =
    names.FirstOrDefault(
        n => n.StartsWith('Z'));
Console.WriteLine(found ?? "not found");
