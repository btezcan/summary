import pytest


@pytest.mark.parametrize("n", [1, 2, 3])
def test_square_is_positive(n: int) -> None:
    assert n * n > 0


def test_zero() -> None:
    assert 0 * 0 == 0
