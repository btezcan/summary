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
var byName = students.ToDictionary(
    s => s.Name, s => s.Score);
Console.WriteLine(byName["Can"]);

var depts = students.Select(s => s.Dept)
    .ToHashSet();
Console.WriteLine(depts.Contains("EE"));
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
