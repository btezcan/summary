from decimal import Decimal

print(0.1 + 0.2 == 0.3)
print(0.1 + 0.2)

# Decimal: base-10, exact for 0.1
a, b = Decimal("0.1"), Decimal("0.2")
print(a + b == Decimal("0.3"))
print(a + b)
