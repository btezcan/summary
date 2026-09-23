def larger[T: (int, float, str)](
        a: T, b: T) -> T:
    return a if a >= b else b


print(larger(3, "x"))
