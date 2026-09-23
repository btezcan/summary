name: str | None = None

print(len(name) if name is not None else None)
print(name if name is not None else "unknown")
print(len(name) if name is not None else 0)

if name is not None:
    print(len(name))

if name is None:
    name = "Ali"
print(name)
