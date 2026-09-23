class A:
    def greet(self) -> str:
        return "A"


class B(A):
    def greet(self) -> str:
        return "B+" + super().greet()


print(B().greet())
