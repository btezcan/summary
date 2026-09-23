var a = new Money(5, "TL");
var b = new Money(5, "TL");
Console.WriteLine(a.Equals(b));
var set = new HashSet<Money> { a, b };
Console.WriteLine(set.Count);

class Money(decimal amount, string currency)
{
    public decimal Amount { get; } = amount;
    public string Currency { get; } = currency;

    public override bool Equals(object? obj) =>
        obj is Money m
        && m.Amount == Amount
        && m.Currency == Currency;

    public override int GetHashCode() =>
        HashCode.Combine(Amount, Currency);
}
