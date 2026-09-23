from datetime import datetime, timedelta

start = datetime(2026, 9, 23, 9, 30)
end = datetime(2026, 9, 23, 11, 15)

lesson = end - start
print(lesson)
print(lesson.total_seconds() / 60)
print(start + timedelta(hours=2.5))
