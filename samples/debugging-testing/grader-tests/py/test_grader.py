import pytest

from grader import letter_grade


@pytest.mark.parametrize("score, expected", [
    (95, "AA"),
    (90, "AA"),    # boundary
    (89, "DD"),    # boundary
    (50, "DD"),    # boundary
    (49, "FF"),    # boundary
])
def test_letter_grade(score: int,
                      expected: str) -> None:
    assert letter_grade(score) == expected


def test_rejects_negative() -> None:
    with pytest.raises(ValueError):
        letter_grade(-1)
