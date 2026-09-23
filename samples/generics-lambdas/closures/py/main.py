from collections.abc import Callable


def make_counter() -> Callable[[], int]:
    count = 0

    def next_value() -> int:
        nonlocal count    # the outer count
        count += 1
        return count

    return next_value


counter = make_counter()
print(counter())
print(counter())

other = make_counter()
print(other())
