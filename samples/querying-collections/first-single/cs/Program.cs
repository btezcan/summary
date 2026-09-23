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
var top = students.First(s => s.Score > 90);
Console.WriteLine(top.Name);

var none = students.FirstOrDefault(
    s => s.Score > 100);
Console.WriteLine(none is null);

var me = students.Single(s => s.Dept == "ME");
Console.WriteLine(me.Name);
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
