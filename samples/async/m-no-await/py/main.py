import asyncio


async def save() -> None:
    await asyncio.sleep(0.1)
    print("saved")


async def main() -> None:
    print("start")
    save()                    # not awaited!
    print("end")

asyncio.run(main())
