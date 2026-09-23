# T may be int, float or str (Python 3.12)
def larger[T: (int, float, str)](
        a: T, b: T) -> T:
    return a if a >= b else b


print(larger(3, 7))
print(larger("apple", "pear"))
print(larger(2.5, 1.5))
