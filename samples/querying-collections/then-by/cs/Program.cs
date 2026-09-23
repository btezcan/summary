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
var ordered = students
    .OrderBy(s => s.Dept)
    .ThenByDescending(s => s.Score);
foreach (var s in ordered)
    Console.WriteLine(
        $"{s.Dept} {s.Score} {s.Name}");
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
