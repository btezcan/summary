string name = "Ayşe";
double gpa = 3.456;
Console.WriteLine($"{name,-6}|{gpa:F2}");
Console.WriteLine(name.Length);
Console.WriteLine(name.Substring(1, 2));
Console.WriteLine(string.Join(", ", "a", "b"));
Console.WriteLine("a,b,c".Split(',').Length);
Console.WriteLine(name.Contains("ş"));
