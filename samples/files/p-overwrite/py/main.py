from pathlib import Path

p = Path("a.txt")
p.write_text("one\n", encoding="utf-8")
p.write_text("two\n", encoding="utf-8")
with open(p, "a", encoding="utf-8") as f:
    f.write("three\n")
print(p.read_text(encoding="utf-8"), end="")
