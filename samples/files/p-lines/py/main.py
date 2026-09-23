from pathlib import Path

Path("t.txt").write_text("a\nb\n",
                         encoding="utf-8")
with open("t.txt", encoding="utf-8") as f:
    lines = f.readlines()
print(len(lines))
print(f"[{lines[0]}]")
