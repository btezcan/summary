class Gradebook:
    def __init__(self) -> None:
        self._grades: dict[str, int] = {}

    def __getitem__(self, name: str) -> int:   # book[name]
        return self._grades.get(name, 0)

    def __setitem__(self, name: str, grade: int) -> None:
        self._grades[name] = grade

    def __len__(self) -> int:                   # len(book)
        return len(self._grades)

    def __contains__(self, name: str) -> bool:  # name in book
        return name in self._grades


book = Gradebook()
book["Ali"] = 85
book["Ayşe"] = 92
print(book["Ayşe"])
print(book["Can"])
print(len(book))
print("Ali" in book)
