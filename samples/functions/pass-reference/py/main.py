# Changes the list object itself
def reset(items: list[int]) -> None:
    items[0] = 0


# Rebinds only the local name
def replace(items: list[int]) -> None:
    items = [9]


data = [5, 6]
reset(data)
replace(data)
print(data[0])
