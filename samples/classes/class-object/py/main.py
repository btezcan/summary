class Counter:
    def __init__(self) -> None:
        self.value = 0

    def increment(self) -> None:
        self.value += 1


a = Counter()
b = a                       # same object
a.increment()
b.increment()
print(a.value)
print(a is b)
