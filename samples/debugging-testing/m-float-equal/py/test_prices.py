def total(prices: list[float]) -> float:
    return sum(prices)


def test_total() -> None:
    assert total([0.1, 0.2]) == 0.3
