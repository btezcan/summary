from types import TracebackType


class Resource:
    def __init__(self, name: str):
        self.name = name
        print(f"{name}: open")

    def __enter__(self) -> "Resource":
        return self

    def __exit__(
        self,
        kind: type | None,
        error: BaseException | None,
        tb: TracebackType | None,
    ) -> None:
        print(f"{self.name}: closed")


with Resource("export"):
    print("working")

try:
    with Resource("import"):
        raise ValueError("bad data")
except ValueError as e:
    print(f"error: {e}")
