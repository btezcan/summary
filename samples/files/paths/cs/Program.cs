string p = Path.Combine("reports", "2026",
    "grades.csv");
Console.WriteLine(p);
Console.WriteLine(Path.GetFileName(p));
Console.WriteLine(
    Path.GetFileNameWithoutExtension(p));
Console.WriteLine(Path.GetExtension(p));
Console.WriteLine(Path.GetDirectoryName(p));
