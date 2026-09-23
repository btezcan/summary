f = open("out.txt", "w", encoding="utf-8")
f.write("hello")
# forgot to close: the text is still buffered

with open("out.txt", encoding="utf-8") as g:
    print(f"[{g.read()}]")
