Animal a = new Dog();
Console.WriteLine(a.Speak());

class Animal
{
    public virtual string Speak() => "...";
}

class Dog : Animal
{
    public override string Speak() => "Woof";
}
