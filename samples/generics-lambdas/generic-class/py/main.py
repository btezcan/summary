class Box[T]:                    # Python 3.12
    def __init__(self, value: T):
        self.value = value

    def __repr__(self) -> str:
        return f"Box({self.value!r})"


number = Box(42)
word = Box("hi")
print(number.value + 1)
print(word.value.upper())
print(number)
