from pathlib import Path

Path("names.txt").write_text("Ayşe Çağrı",
                             encoding="utf-8")

print(Path("names.txt").read_text(
    encoding="utf-8"))
