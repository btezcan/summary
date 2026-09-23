class Team:
    members: list[str] = []  # class attribute


a = Team()
b = Team()
a.members.append("Ali")
print(b.members)
