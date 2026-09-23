object d = new Dog();
Console.WriteLine(d is Animal);
bool exact = d.GetType() == typeof(Animal);
Console.WriteLine(exact);
Console.WriteLine(d.GetType().Name);

class Animal { }
class Dog : Animal { }
