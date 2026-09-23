var d = new Dog("Rex");
Console.WriteLine(d.Describe());

class Animal
{
    public string Name { get; }

    public Animal(string name)
    {
        Console.WriteLine("Animal constructor");
        Name = name;
    }

    public string Describe() =>
        $"{Name} is a {GetType().Name}";
}

class Dog : Animal
{
    public Dog(string name) : base(name)
    {
        Console.WriteLine("Dog constructor");
    }
}
