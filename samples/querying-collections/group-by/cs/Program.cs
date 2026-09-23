// #region data
var students = new List<Student>
{
    new("Ayşe", "CS", 85),
    new("Mehmet", "EE", 92),
    new("Can", "CS", 58),
    new("Zeynep", "ME", 74),
    new("Emre", "EE", 66),
};
// #endregion

// #region query
var byDept = students
    .GroupBy(s => s.Dept)
    .Select(g => new
    {
        Dept = g.Key,
        Count = g.Count(),
        Avg = g.Average(s => s.Score),
    });
foreach (var d in byDept)
    Console.WriteLine(
        $"{d.Dept}: {d.Count}, avg {d.Avg:F1}");
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
