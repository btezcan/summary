from collections.abc import Callable


class Button:
    def __init__(self) -> None:
        self._handlers: list[Callable[[], None]] = []

    def on_click(self, handler: Callable[[], None]) -> None:
        self._handlers.append(handler)

    def click(self) -> None:
        for handler in self._handlers:
            handler()


button = Button()
button.on_click(lambda: print("A"))
button.on_click(lambda: print("B"))
button.click()
