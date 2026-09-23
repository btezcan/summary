from collections.abc import Callable

square: Callable[[int], int] = lambda x: x * x
add: Callable[[int, int], int] = (
    lambda a, b: a + b)


def greet(name: str) -> None:
    print(f"Hello {name}")


def is_even(n: int) -> bool:
    return n % 2 == 0


print(square(5))
print(add(2, 3))
greet("Deniz")
print(is_even(4))
