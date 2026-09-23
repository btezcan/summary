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
var nobody = students.Where(s => s.Score > 100);
Console.WriteLine(
    nobody.All(s => s.Score > 100));
Console.WriteLine(nobody.Any());
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
