def classify(n: int) -> str:
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    return "positive"


for n in [-5, 0, 7]:
    print(classify(n))
