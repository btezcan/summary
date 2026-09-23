n = 21
for d in range(2, n):
    if n % d == 0:
        print(f"{n} = {d} × {n // d}")
        break
else:                      # no break happened
    print(f"{n} is prime")
