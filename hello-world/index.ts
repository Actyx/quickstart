import { allEvents, FishId, Metadata, Pond } from '@actyx/pond'

const helloWorldFish = {
  fishId: FishId.of('ax.example.HelloWorld', 'getting-started', 0),
  initialState: 'Hello world!',
  onEvent: (_oldState: any, event: any, _metadata: Metadata) => event,
  where: allEvents,
}

const main = async () => {
  const pond = await Pond.default()

  pond.observe(helloWorldFish, console.log)
}

main()
