try
{
    Withdraw(balance: 100m, amount: 250m);
}
catch (InsufficientBalanceException e)
{
    Console.WriteLine(e.Message);
    Console.WriteLine(e.Missing);
}

static void Withdraw(decimal balance,
    decimal amount)
{
    if (amount > balance)
        throw new InsufficientBalanceException(
            amount - balance);
}

class InsufficientBalanceException(
    decimal missing) : Exception(
        $"{missing:N2} TL short")
{
    public decimal Missing { get; } = missing;
}
