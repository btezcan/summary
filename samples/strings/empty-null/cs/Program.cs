string empty = "";
string? missing = null;

Console.WriteLine(empty.Length);
Console.WriteLine(empty == string.Empty);
Console.WriteLine(
    string.IsNullOrEmpty(missing));
Console.WriteLine(
    string.IsNullOrWhiteSpace("   "));
