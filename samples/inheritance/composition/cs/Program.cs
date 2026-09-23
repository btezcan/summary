var car = new Car(new Engine(150));
Console.WriteLine(car.Start());

class Engine(int horsepower)
{
    public string Start() =>
        $"{horsepower} hp engine started";
}

// A car HAS an engine; it is not an engine
class Car(Engine engine)
{
    public string Start() =>
        "Car: " + engine.Start();
}
