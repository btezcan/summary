import pytest


def total(prices: list[float]) -> float:
    return sum(prices)


def test_total() -> None:
    expected = pytest.approx(0.3)
    assert total([0.1, 0.2]) == expected
