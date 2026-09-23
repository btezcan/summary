import dis


def add(a: int, b: int) -> int:
    return a + b


dis.dis(add)
