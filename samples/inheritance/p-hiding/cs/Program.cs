Base b = new Derived();
Console.WriteLine(b.Hidden());
Console.WriteLine(b.Overridden());

class Base
{
    public string Hidden() => "Base";
    public virtual string Overridden() =>
        "Base";
}

class Derived : Base
{
    public new string Hidden() => "Derived";
    public override string Overridden() =>
        "Derived";
}
