from decimal import Decimal


class InsufficientBalanceError(Exception):
    def __init__(self, missing: Decimal):
        text = f"{missing:,.2f} TL short"
        super().__init__(text)
        self.missing = missing


def withdraw(balance: Decimal,
             amount: Decimal) -> None:
    if amount > balance:
        raise InsufficientBalanceError(
            amount - balance)


try:
    withdraw(Decimal("100"), Decimal("250"))
except InsufficientBalanceError as e:
    print(e)
    print(e.missing)
