var duck = new Duck();
duck.Fly();
duck.Swim();
Console.WriteLine(duck is IFlyer);

interface IFlyer { void Fly(); }
interface ISwimmer { void Swim(); }

// one base class at most, many interfaces
class Duck : IFlyer, ISwimmer
{
    public void Fly() =>
        Console.WriteLine("flying");
    public void Swim() =>
        Console.WriteLine("swimming");
}
