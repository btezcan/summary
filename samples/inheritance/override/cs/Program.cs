Animal[] animals = { new Animal(), new Dog() };
foreach (Animal a in animals)
    Console.WriteLine(a.Speak());

class Animal
{
    public virtual string Speak() => "...";
}

class Dog : Animal
{
    public override string Speak() =>
        "Woof (" + base.Speak() + ")";
}
