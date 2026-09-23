class Animal:
    def speak(self) -> str:
        return "..."


class Dog(Animal):
    def speek(self) -> str:      # typo
        return "Woof"


print(Dog().speak())
