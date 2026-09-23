from decimal import Decimal


class BankAccount:
    def __init__(self, owner: str, initial_balance: Decimal = Decimal("0")):
        if not owner.strip():
            raise ValueError("Owner cannot be empty.")
        self.owner = owner
        self._balance = initial_balance

    @property
    def balance(self) -> Decimal:
        return self._balance

    def deposit(self, amount: Decimal) -> None:
        if amount <= 0:
            raise ValueError("Must be positive.")
        self._balance += amount

    def try_withdraw(self, amount: Decimal) -> bool:
        if amount <= 0 or amount > self._balance:
            return False
        self._balance -= amount
        return True

    def __str__(self) -> str:
        return f"{self.owner}: {self._balance:,.2f} TL"


acc = BankAccount("Ayşe", Decimal("100"))
acc.deposit(Decimal("50"))
print(acc.try_withdraw(Decimal("500")))
print(acc.try_withdraw(Decimal("30")))
print(acc)
print(acc.balance)
