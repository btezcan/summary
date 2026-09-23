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
var names = new List<string>();
foreach (var s in students)
    if (s.Score >= 60)
        names.Add(s.Name);
Console.WriteLine(string.Join(", ", names));
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
