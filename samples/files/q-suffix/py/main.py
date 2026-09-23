from pathlib import Path

p = Path("backup") / "grades.2026.csv"
print(p.suffix, p.stem)
