string text =
    "apple pear apple cherry apple pear";
var counts = new Dictionary<string, int>();
foreach (string word in text.Split(' '))
{
    counts[word] =
        counts.TryGetValue(word, out int c)
            ? c + 1 : 1;
}
foreach (var (word, count) in counts)
    Console.WriteLine($"{word}: {count}");
