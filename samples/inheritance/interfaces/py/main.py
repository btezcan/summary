from typing import Protocol


class Notifier(Protocol):
    def send(self, to: str, msg: str) -> None:
        ...


class EmailNotifier:          # no base class
    def send(self, to: str, msg: str) -> None:
        print(f"Email {to}: {msg}")


class SmsNotifier:
    def send(self, to: str, msg: str) -> None:
        print(f"SMS {to}: {msg}")


class ExamService:
    def __init__(self, notifier: Notifier):
        self._notifier = notifier

    def announce(self, to: str,
                 score: int) -> None:
        msg = f"Score: {score}"
        self._notifier.send(to, msg)


notifiers: list[Notifier] = [
    EmailNotifier(), SmsNotifier()]
for n in notifiers:
    ExamService(n).announce("Ali", 85)
