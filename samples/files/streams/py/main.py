with open("log.txt", "w",
          encoding="utf-8") as f:
    f.write("first\n")
    f.write("second\n")
# closed and flushed here

with open("log.txt", encoding="utf-8") as f:
    for line in f:       # one line at a time
        print(f"> {line.rstrip()}")
