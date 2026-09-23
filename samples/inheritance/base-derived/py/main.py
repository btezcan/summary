class Animal:
    def __init__(self, name: str):
        print("Animal __init__")
        self.name = name

    def describe(self) -> str:
        kind = type(self).__name__
        return f"{self.name} is a {kind}"


class Dog(Animal):
    def __init__(self, name: str):
        super().__init__(name)
        print("Dog __init__")


d = Dog("Rex")
print(d.describe())
