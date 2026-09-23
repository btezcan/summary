int[] first = [1, 2, 3];
List<int> more = [4, 5];
int[] all = [.. first, .. more, 6];
Console.WriteLine(string.Join(", ", all));
