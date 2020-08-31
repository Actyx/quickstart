import { Pond, FishId, noEvents, Metadata } from '@actyx/pond'

const helloWorldFish = {
  fishId: FishId.of('ax.example.HelloWorld', 'getting-started', 0),
  initialState: 'Hello world!',
  onEvent: (s: string, _event: never, _metadata: Metadata) => s,
  where: noEvents,
}

const main = async () => {
  const pond = await Pond.default()

  pond.observe(helloWorldFish, console.log)
}

main()
