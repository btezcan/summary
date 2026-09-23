def add(
    item: str, items: list[str] | None = None
) -> list[str]:
    if items is None:
        items = []   # new list on every call
    items.append(item)
    return items


print(add("a"))
print(add("b"))
