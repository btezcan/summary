def sum_of_squares(values: list[int]) -> int:
    def square(x: int) -> int:  # nested
        return x * x

    return sum(square(v) for v in values)


print(sum_of_squares([1, 2, 3]))
