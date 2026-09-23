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
Console.WriteLine(students.Count);
Console.WriteLine(students.Sum(s => s.Score));
Console.WriteLine(students.Average(
    s => s.Score));
Console.WriteLine(students.Max(s => s.Score));
Console.WriteLine(students.Any(
    s => s.Score < 50));
Console.WriteLine(students.All(
    s => s.Score > 50));
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
