from decimal import Decimal

count: int = 3                # hint only
price = Decimal("9.99")
note: str | None = None
PI = 3.14159                  # by convention
n = int("42")
avg = 7 / 2                   # 3.5
q, r = 7 // 2, -7 % 3         # 3, 2
print(f"{count} {price} {n}")
print(f"{avg} {q} {r} {PI}")
print(note is None)
