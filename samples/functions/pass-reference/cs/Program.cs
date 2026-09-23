int[] data = { 5, 6 };
Reset(data);
Replace(data);
Console.WriteLine(data[0]);

// Changes the array object itself
static void Reset(int[] arr) => arr[0] = 0;

// Changes only the local parameter
static void Replace(int[] arr) =>
    arr = new[] { 9 };
