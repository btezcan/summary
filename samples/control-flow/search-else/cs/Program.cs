int n = 21;
bool found = false;
for (int d = 2; d < n; d++)
{
    if (n % d != 0) continue;
    Console.WriteLine($"{n} = {d} × {n / d}");
    found = true;
    break;
}
if (!found)
    Console.WriteLine($"{n} is prime");
