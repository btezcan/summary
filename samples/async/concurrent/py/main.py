import asyncio
import time


async def download(name: str) -> str:
    await asyncio.sleep(0.3)
    return f"{name} downloaded"


async def main() -> None:
    start = time.perf_counter()
    await download("A")                # one after
    await download("B")                # the other
    took = time.perf_counter() - start
    print(f"sequential ≥ 0.6 s: {took >= 0.6}")

    start = time.perf_counter()
    both = await asyncio.gather(
        download("A"), download("B"))  # together
    print(", ".join(both))
    took = time.perf_counter() - start
    print(f"concurrent < 0.5 s: {took < 0.5}")

asyncio.run(main())
