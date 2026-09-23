from pathlib import Path

Path("names.txt").write_text("Ayşe Çağrı",
                             encoding="utf-8")

# What a Turkish Windows PC used as the default
# before Python 3.15:
print(Path("names.txt").read_text(
    encoding="cp1254"))
