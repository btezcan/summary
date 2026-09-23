from collections.abc import Callable


def keep(
    items: list[int],
    rule: Callable[[int], bool],
) -> list[int]:
    return [x for x in items if rule(x)]


nums = [1, 5, 8, 12, 3]
print(keep(nums, lambda n: n > 4))
print(keep(nums, lambda n: n % 2 == 0))
