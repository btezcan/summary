def load(text: str) -> int:
    return parse_age(text)


def parse_age(text: str) -> int:
    return int(text)


load("abc")
