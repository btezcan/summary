calls = 0


def fib(n: int) -> int:
    global calls
    calls += 1
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)


def fib_loop(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a


print(fib(30))
print(f"{calls:,} calls")
print(fib_loop(30))
