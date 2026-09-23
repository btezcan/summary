def load_port(line: str) -> int:
    try:
        return int(line.split("=")[1])
    except ValueError as e:
        msg = "Bad config line"
        raise RuntimeError(msg) from e


try:
    load_port("port=abc")
except RuntimeError as e:
    print(e)
    print(type(e.__cause__).__name__)
