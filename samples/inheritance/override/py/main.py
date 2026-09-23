class Animal:
    def speak(self) -> str:
        return "..."


class Dog(Animal):
    def speak(self) -> str:   # just redefine
        return f"Woof ({super().speak()})"


for a in [Animal(), Dog()]:
    print(a.speak())
