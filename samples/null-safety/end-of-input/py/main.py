# With no more input, input() raises EOFError
try:
    line: str | None = input()
except EOFError:
    line = None

if line is None:
    print("no input")
else:
    print(line.upper())
