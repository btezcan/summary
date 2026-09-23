from typing import Final

PI: Final = 3.14159
print(PI * 2)

PI = 3      # runs! Only a type checker
print(PI)   # would report the line above.
