from abc import ABC, abstractmethod


class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...


try:
    s = Shape()
except TypeError as e:
    print(e)
