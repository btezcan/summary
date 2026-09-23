def average(values: list[float]) -> float:
    return sum(values) / len(values)


def check_average() -> None:        # not test_*
    assert average([1, 2]) == 99
