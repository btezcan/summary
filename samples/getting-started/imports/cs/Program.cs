using System.Text;   // for StringBuilder

// Math lives in System, which is imported
// automatically (implicit usings).
Console.WriteLine(Math.Sqrt(16));

var sb = new StringBuilder("C#");
sb.Append(" and Python");
Console.WriteLine(sb);
