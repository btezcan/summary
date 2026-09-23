string s = "Python";

Console.WriteLine(s[0]);
Console.WriteLine(s[^1]);        // from the end
Console.WriteLine(s[1..4]);      // end excluded
Console.WriteLine(s.Substring(1, 3));
Console.WriteLine(string.Concat(s.Reverse()));
