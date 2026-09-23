class Base:
    def hidden(self) -> str:
        return "Base"

    def overridden(self) -> str:
        return "Base"


class Derived(Base):
    def hidden(self) -> str:
        return "Derived"

    def overridden(self) -> str:
        return "Derived"


b: Base = Derived()
print(b.hidden())
print(b.overridden())
