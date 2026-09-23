import json
from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class Course:
    code: str
    title: str
    credits: int


course = Course("CS101", "Giriş", 4)
text = json.dumps(asdict(course))
print(text)

back = Course(**json.loads(text))
print(back == course)

print(json.dumps(asdict(course), ensure_ascii=False))
