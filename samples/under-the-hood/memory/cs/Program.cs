// .NET's GC is generational: objects that
// survive a collection move to an older
// generation, which is collected less often.
var data = new int[10];
Console.WriteLine(GC.GetGeneration(data));
GC.Collect();
Console.WriteLine(GC.GetGeneration(data));
GC.Collect();
Console.WriteLine(GC.GetGeneration(data));
GC.KeepAlive(data);
