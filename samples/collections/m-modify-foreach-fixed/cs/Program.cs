var nums = new List<int> { 1, 2, 2, 3 };
nums.RemoveAll(n => n == 2);
Console.WriteLine(string.Join(", ", nums));
