values: list[object] = [42, "hi", 3.5, 7]
for v in values:
    match v:
        case int(n) if n > 40:
            text = f"big int {n}"
        case int(n):
            text = f"int {n}"
        case str(s):
            text = f"text '{s}'"
        case _:
            text = "something else"
    print(text)
