try:
    n = int("abc")
except ValueError as e:
    print(type(e).__name__)
finally:
    print("done")

try:
    value = int("42")
except ValueError:
    pass
else:
    print(value)

try:
    raise ValueError("negative")
except ValueError as e:
    print(e)
