from pathlib import Path

path = Path("data") / "g.txt"
path.parent.mkdir(exist_ok=True)
path.write_text("Ali,85\nAyşe,92\nCan,58\n",
                encoding="utf-8")

text = path.read_text(encoding="utf-8")
for line in text.splitlines():
    name, score = line.split(",")
    print(f"{name:<6}{score:>4}")
