from decimal import ROUND_HALF_UP, Decimal

d = 9.99
print(int(d))                   # truncates
print(int(-d))

# Banker's rounding: .5 goes to the even number
print(round(2.5))
print(round(3.5))
print(Decimal("2.5").quantize(
    Decimal("1"), rounding=ROUND_HALF_UP))
