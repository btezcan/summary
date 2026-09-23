def add(a: int, b: int) -> int:
    return a + b


def greet(name: str, word: str = "Hi") -> str:
    return f"{word}, {name}"


def total(*xs: int) -> int:
    return sum(xs)


def min_max(xs: list[int]) -> tuple[int, int]:
    return min(xs), max(xs)


print(add(2, 3))
print(greet("Ali"))
print(greet("Ali", "Hey"))
print(total(1, 2, 3))
lo, hi = min_max([4, 1, 9])
print(f"{lo} {hi}")
