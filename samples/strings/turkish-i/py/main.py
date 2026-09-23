cmd = "exit"

print(cmd.upper())          # never locale-based
print("ı".upper())          # dotless ı → I
print("İ".lower())          # i + combining dot
print(len("İ".lower()))
print("FILE".casefold() == "file".casefold())
