var names = new List<string> { "Can", "Ali" };
names.Insert(0, "Zeynep");
names.Add("Ayşe");
Console.WriteLine(string.Join(", ", names));

Console.WriteLine(names.Contains("Ali"));
Console.WriteLine(names.IndexOf("Ali"));
names.RemoveAt(0);
Console.WriteLine(string.Join(", ", names));
Console.WriteLine(
    string.Join(", ", names.GetRange(0, 2)));
