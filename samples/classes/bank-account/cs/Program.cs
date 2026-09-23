var acc = new BankAccount("Ayşe", 100m);
acc.Deposit(50m);
Console.WriteLine(acc.TryWithdraw(500m));
Console.WriteLine(acc.TryWithdraw(30m));
Console.WriteLine(acc);
Console.WriteLine(acc.Balance);

class BankAccount
{
    public string Owner { get; }
    public decimal Balance { get; private set; }

    public BankAccount(string owner, decimal initialBalance = 0)
    {
        if (string.IsNullOrWhiteSpace(owner))
            throw new ArgumentException("Owner cannot be empty.", nameof(owner));
        Owner = owner;
        Balance = initialBalance;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentOutOfRangeException(nameof(amount), "Must be positive.");
        Balance += amount;
    }

    public bool TryWithdraw(decimal amount)
    {
        if (amount <= 0 || amount > Balance) return false;
        Balance -= amount;
        return true;
    }

    public override string ToString() => $"{Owner}: {Balance:N2} TL";
}
