int[] scores = new int[3];     // fixed size, 0s
scores[0] = 85;
Console.WriteLine(string.Join(", ", scores));
Console.WriteLine(scores.Length);

string[] names = { "Ali", "Ayşe", "Can" };
Console.WriteLine(names[^1]);  // last item
