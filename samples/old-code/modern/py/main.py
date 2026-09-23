from pathlib import Path

# Today: f-strings and pathlib
name = "Ali"
count = 1
print(f"{name} has {count} items")
path = Path("data") / "grades.csv"
print(path.suffix)
