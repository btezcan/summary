def greeting(name: str, word: str = "Hello",
             shout: bool = False) -> str:
    text = f"{word}, {name}!"
    return text.upper() if shout else text


print(greeting("Ali"))
print(greeting("Ali", "Hi"))
print(greeting("Ali", shout=True))
