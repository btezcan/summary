def find_nickname(name: str) -> str | None:
    return "Aliko" if name == "Ali" else None


for name in ["Ali", "Can"]:
    nick = find_nickname(name)
    if nick is None:
        print(f"{name}: no nickname")
    else:
        print(f"{name}: {nick.upper()}")
