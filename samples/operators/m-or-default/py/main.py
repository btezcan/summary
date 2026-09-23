def seats(requested: int | None) -> int:
    return requested or 10


print(seats(None))
print(seats(0))    # 0 was a real request
