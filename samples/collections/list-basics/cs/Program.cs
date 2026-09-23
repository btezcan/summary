var grades = new List<int> { 85, 42, 91, 67 };
grades.Add(73);
grades.Remove(42);
grades.Sort();
Console.WriteLine(string.Join(", ", grades));
Console.WriteLine(grades.Count);
