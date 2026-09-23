def greet(name: str | None) -> str:
    if name is None:
        raise ValueError("name is required")
    return f"Hello, {name}!"


print(greet("Ali"))
try:
    greet(None)
except ValueError as e:
    print(e)
