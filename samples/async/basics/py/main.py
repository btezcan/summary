import asyncio


async def download(name: str) -> int:
    print(f"downloading {name}...")
    await asyncio.sleep(0.1)  # pretend I/O
    return len(name)


async def main() -> None:
    length = await download("page")
    print(length)

asyncio.run(main())
