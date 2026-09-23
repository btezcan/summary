var cs = new HashSet<string> { "Ali", "Ayşe", "Can" };
var py = new HashSet<string> { "Can", "Deniz" };

var both = new HashSet<string>(cs);
both.IntersectWith(py);
Console.WriteLine(string.Join(", ", both));

var any = new SortedSet<string>(cs);
any.UnionWith(py);
Console.WriteLine(string.Join(", ", any));
