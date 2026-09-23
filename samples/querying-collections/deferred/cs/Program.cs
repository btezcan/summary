var numbers = new List<int> { 1, 2, 3 };
var big = numbers.Where(n => n > 1); // lazy
numbers.Add(4);
Console.WriteLine(big.Count());  // runs now
Console.WriteLine(big.Count());  // runs again
