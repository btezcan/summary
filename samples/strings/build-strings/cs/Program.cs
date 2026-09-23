using System.Text;

var sb = new StringBuilder();
for (int i = 1; i <= 5; i++)
{
    if (sb.Length > 0) sb.Append(", ");
    sb.Append(i);
}
Console.WriteLine(sb.ToString());

Console.WriteLine(string.Join(", ",
    Enumerable.Range(1, 5)));
