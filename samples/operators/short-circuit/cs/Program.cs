int[] scores = { };
// The right side runs only if needed
if (scores.Length > 0 && scores[0] > 50)
    Console.WriteLine("First score passes.");
else
    Console.WriteLine("No passing score.");
