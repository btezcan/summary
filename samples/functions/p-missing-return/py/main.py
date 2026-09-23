def sign(n: int) -> str:
    if n > 0:
        return "positive"
    if n < 0:
        return "negative"


print(sign(0))
