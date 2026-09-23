var d = new Dog();
Console.WriteLine(d.Name);

class Animal(string name)
{
    public string Name { get; } = name;
}

class Dog : Animal
{
}
