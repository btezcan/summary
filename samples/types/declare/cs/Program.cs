int count = 3;
var price = 9.99;    // inferred: double
string name = "Ali";

Console.WriteLine(count.GetType());
Console.WriteLine(price.GetType());
Console.WriteLine(name.GetType());

// count = "three";  // doesn't compile
