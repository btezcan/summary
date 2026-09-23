from pathlib import Path

p = Path("reports") / "2026" / "grades.csv"
print(p)
print(p.name)
print(p.stem)
print(p.suffix)
print(p.parent)
