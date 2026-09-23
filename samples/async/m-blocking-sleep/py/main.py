import asyncio
import time


async def download(name: str) -> str:
    time.sleep(0.3)      # blocks everything!
    return name


async def main() -> None:
    start = time.perf_counter()
    await asyncio.gather(download("A"),
                         download("B"))
    took = time.perf_counter() - start
    print(f"concurrent < 0.5 s: {took < 0.5}")

asyncio.run(main())
