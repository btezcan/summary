(string Name, int Score) best = ("Ayşe", 92);
Console.WriteLine(best.Name);
Console.WriteLine(best);

var (name, score) = best;
Console.WriteLine($"{name} scored {score}");
