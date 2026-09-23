from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)           # generates __eq__
class Money:
    amount: Decimal
    currency: str

    def __add__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("Different currencies")
        return Money(self.amount + other.amount, self.currency)

    def __gt__(self, other: "Money") -> bool:
        return self.amount > other.amount

    def __str__(self) -> str:
        return f"{self.amount:,.2f} {self.currency}"


a = Money(Decimal("10.50"), "TL")
b = Money(Decimal("4.25"), "TL")
print(a + b)
print(a + b == Money(Decimal("14.75"), "TL"))
print(a > b)
