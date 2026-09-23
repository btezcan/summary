nickname: str | None = None
print(len(nickname) if nickname is not None
      else 0)

if nickname is None:
    nickname = "guest"
print(nickname)
print(len(nickname))
