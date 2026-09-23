from pathlib import Path

Path("data").mkdir(exist_ok=True)
path = Path("data") / "notes.txt"

path.write_text("one\ntwo\n", encoding="utf-8")
with open(path, "a", encoding="utf-8") as f:
    f.write("three\n")
text = path.read_text(encoding="utf-8")
print(len(text.splitlines()))

with open(path, encoding="utf-8") as f:
    for line in f:
        print(line.rstrip("\n").upper())
