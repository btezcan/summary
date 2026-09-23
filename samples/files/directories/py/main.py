from pathlib import Path

notes = Path("notes")
notes.mkdir(exist_ok=True)
for name in ["b.txt", "a.txt", "c.md"]:
    (notes / name).write_text(name, encoding="utf-8")

texts = sorted(p.name for p in notes.glob("*.txt"))
print(", ".join(texts))
print((notes / "c.md").exists())
