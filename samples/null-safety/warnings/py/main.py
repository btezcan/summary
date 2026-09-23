def find_nickname(name: str) -> str | None:
    return "Aliko" if name == "Ali" else None


nick: str = find_nickname("Can")
print(len(nick))
