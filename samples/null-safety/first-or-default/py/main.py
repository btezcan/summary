names = ["Ali", "Ayşe"]
found = next(
    (n for n in names if n.startswith("Z")),
    None)
print(found if found is not None
      else "not found")
