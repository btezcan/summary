int[,] grid = { { 1, 2, 3 }, { 4, 5, 6 } };
Console.WriteLine(grid.GetLength(0)); // rows
Console.WriteLine(grid.GetLength(1)); // cols
Console.WriteLine(grid[1, 2]);

int[][] jagged =
    { new[] { 1 }, new[] { 2, 3 } };
Console.WriteLine(jagged[1].Length);
