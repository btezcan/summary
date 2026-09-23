using System.Collections;

// Pre-2005 style: untyped collections, casts,
// numbered format placeholders
ArrayList names = new ArrayList();
names.Add("Ali");
names.Add(42);                  // anything goes
string first = (string)names[0]!;
Console.WriteLine(String.Format("{0} has {1} items",
    first, names.Count));
