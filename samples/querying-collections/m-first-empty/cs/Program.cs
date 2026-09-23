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
var perfect = students.First(
    s => s.Score == 100);
Console.WriteLine(perfect.Name);
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
