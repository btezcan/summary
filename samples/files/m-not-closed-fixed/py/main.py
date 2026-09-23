with open("out.txt", "w",
          encoding="utf-8") as f:
    f.write("hello")
# the with block closed and flushed the file

with open("out.txt", encoding="utf-8") as g:
    print(f"[{g.read()}]")
