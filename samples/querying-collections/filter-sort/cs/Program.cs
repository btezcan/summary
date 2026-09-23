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
var passed = students
    .Where(s => s.Score >= 60)
    .OrderByDescending(s => s.Score)
    .Select(s => s.Name);
Console.WriteLine(string.Join(", ", passed));
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
