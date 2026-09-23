// Value type: the value is copied
int a = 5;
int b = a;
b = 10;
Console.WriteLine(a);

// Reference type: two names, one array
int[] x = { 1, 2, 3 };
int[] y = x;
y[0] = 99;
Console.WriteLine(x[0]);
