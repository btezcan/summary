import locale

# The locale is set explicitly here.
locale.setlocale(locale.LC_ALL, "tr_TR.UTF-8")
print("exit".upper())
print(locale.atof("3,5"))
print(locale.format_string("%.1f", 3.5))
