class HttpError(Exception):
    def __init__(self, code: int):
        super().__init__(f"HTTP {code}")
        self.code = code


for code in [404, 500]:
    try:
        raise HttpError(code)
    except HttpError as e:
        if e.code == 404:
            print("not found: handled")
        else:
            print(f"error {e.code}")
