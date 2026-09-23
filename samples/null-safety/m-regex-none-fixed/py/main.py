import re

match = re.match(r"\d+", "abc")
if match is not None:
    print(match.group())
else:
    print("no number at the start")
