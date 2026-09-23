def describe(name: str, **details: str) -> str:
    extras = ", ".join(
        f"{key}={value}" for key, value in details.items())
    return f"{name} ({extras})"


print(describe("Ali", dept="Computer", year="2"))
