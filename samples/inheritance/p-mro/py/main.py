class A:
    def hello(self) -> str:
        return "A"


class B(A):
    def hello(self) -> str:
        return "B"


class C(A):
    def hello(self) -> str:
        return "C"


class D(B, C):
    pass


print(D().hello())
print([k.__name__ for k in D.__mro__])
