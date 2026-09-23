string s = "  Hello, World  ";
string t = s.Trim();

Console.WriteLine(t.Length);
Console.WriteLine(t.ToUpper());
Console.WriteLine(t.Contains("World"));
Console.WriteLine(t.StartsWith("Hell"));
Console.WriteLine(t.IndexOf('o'));
Console.WriteLine(t.IndexOf('z'));
Console.WriteLine(t.Substring(7, 5));
Console.WriteLine(t.Replace("World", "C#"));
