from pathlib import Path

Path("log.txt").write_text("", encoding="utf-8")
for who in ["Ali", "Can"]:
    with open("log.txt", "a",
              encoding="utf-8") as f:
        f.write(who + "\n")

print(Path("log.txt").read_text(
    encoding="utf-8"), end="")
