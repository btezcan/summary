var words = new List<string>
    { "pear", "fig", "apple", "kiwi" };

words.Sort();                     // in place
Console.WriteLine(string.Join(" ", words));

words.Sort((a, b) =>
    a.Length.CompareTo(b.Length)); // length
Console.WriteLine(string.Join(" ", words));

var desc = words.OrderByDescending(w => w);
Console.WriteLine(string.Join(" ", desc));
