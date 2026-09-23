import locale

locale.setlocale(locale.LC_ALL, "tr_TR.UTF-8")

a = locale.atof("3,14")
b = locale.atof("3.14")   # '.' groups thousands
c = float("3.14")         # ignores the locale

print(a)
print(b)
print(c)
print(locale.format_string("%.1f", 1234.5,
                           grouping=True))
