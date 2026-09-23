import csv
from decimal import Decimal
from pathlib import Path

with open("grades.csv", newline="",
          encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
scores = [Decimal(r["score"]) for r in rows]

avg = sum(scores) / len(scores)
report = (f"Students: {len(scores)}\n"
          f"Average: {avg:.2f}\n")
out = Path("report.txt")
out.write_text(report, encoding="utf-8")
print(out.read_text(encoding="utf-8"), end="")
