var t = new Thermostat();
t.Celsius = 21.5;
Console.WriteLine(t.Celsius);
Console.WriteLine(t.Fahrenheit);
try { t.Celsius = -300; }
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

class Thermostat
{
    private double _celsius;

    public double Celsius
    {
        get => _celsius;
        set => _celsius = value >= -273.15
            ? value
            : throw new ArgumentException(
                "Below absolute zero");
    }

    // computed and read-only: no setter
    public double Fahrenheit =>
        _celsius * 9 / 5 + 32;
}
