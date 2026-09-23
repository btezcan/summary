for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0) continue;  // skip evens
    if (i > 7) break;          // stop the loop
    Console.Write($"{i} ");
}
Console.WriteLine();
