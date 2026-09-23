# Return a tuple (ok, value), or None
def try_divide(a: int, b: int) -> float | None:
    return None if b == 0 else a / b


result = try_divide(7, 2)
if result is not None:
    print(result)
if try_divide(7, 0) is None:
    print("cannot divide by 0")
