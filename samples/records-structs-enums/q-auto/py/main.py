from enum import Enum, auto


class Color(Enum):
    RED = auto()
    GREEN = auto()


print(Color.RED.value, Color.GREEN.value)
