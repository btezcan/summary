def seats(requested: int | None) -> int:
    if requested is None:
        return 10
    return requested


print(seats(None))
print(seats(0))
