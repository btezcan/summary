def add(item: str,
        items: list[str] = []) -> list[str]:
    items.append(item)
    return items


print(add("a"))
print(add("b"))     # expected ['b']
