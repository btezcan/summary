using System.Globalization;

var inv = CultureInfo.InvariantCulture;
var scores = new List<decimal>();
foreach (string line in
    File.ReadLines("grades.csv").Skip(1))
{
    string score = line.Split(',')[1];
    scores.Add(decimal.Parse(score, inv));
}

decimal avg = scores.Average();
string report =
    $"Students: {scores.Count}\n" +
    $"Average: {avg.ToString("F2", inv)}\n";
File.WriteAllText("report.txt", report);
Console.Write(File.ReadAllText("report.txt"));
