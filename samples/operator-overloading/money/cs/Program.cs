var a = new Money(10.50m, "TL");
var b = new Money(4.25m, "TL");
Console.WriteLine(a + b);
Console.WriteLine(a + b == new Money(14.75m, "TL"));
Console.WriteLine(a > b);

readonly record struct Money(decimal Amount, string Currency)
{
    public static Money operator +(Money x, Money y) =>
        x.Currency == y.Currency
            ? new Money(x.Amount + y.Amount, x.Currency)
            : throw new InvalidOperationException("Different currencies");

    public static bool operator >(Money x, Money y) => x.Amount > y.Amount;
    public static bool operator <(Money x, Money y) => x.Amount < y.Amount;

    public override string ToString() => $"{Amount:N2} {Currency}";
}
