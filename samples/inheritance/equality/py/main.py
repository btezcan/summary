class Money:
    def __init__(self, amount: int,
                 currency: str):
        self.amount = amount
        self.currency = currency

    def _key(self) -> tuple[int, str]:
        return (self.amount, self.currency)

    def __eq__(self, other: object) -> bool:
        return (isinstance(other, Money)
                and self._key() == other._key())

    def __hash__(self) -> int:
        return hash(self._key())


a = Money(5, "TL")
b = Money(5, "TL")
print(a == b)
print(len({a, b}))
