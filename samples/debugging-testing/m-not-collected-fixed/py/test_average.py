def average(values: list[float]) -> float:
    return sum(values) / len(values)


def test_average() -> None:
    assert average([1, 2]) == 1.5
