from collections import Counter

text = "apple pear apple cherry apple pear"
counts: dict[str, int] = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
for word, count in counts.items():
    print(f"{word}: {count}")

print(Counter(text.split()).most_common(1))
