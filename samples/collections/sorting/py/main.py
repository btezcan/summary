words = ["pear", "fig", "apple", "kiwi"]

words.sort()                 # in place
print(" ".join(words))

words.sort(key=len)          # by length
print(" ".join(words))

desc = sorted(words, reverse=True)  # new list
print(" ".join(desc))
