import asyncio


async def work(name: str) -> None:
    print(f"{name} started")
    await asyncio.sleep(0.05)
    print(f"{name} done")


async def main() -> None:
    coro = work("A")          # created here
    print("created")
    await coro

asyncio.run(main())
