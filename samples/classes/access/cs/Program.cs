var acc = new Account();
acc.balance = -500;    // private: not allowed
Console.WriteLine("changed");

class Account
{
    private decimal balance = 100;

    public decimal Balance => balance;
}
