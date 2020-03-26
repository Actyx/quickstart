import { Pond, Semantics, OnStateChange, Subscription, FishTypeImpl } from '@actyx/pond'

type State = {
    time: string,
    name: string,
    msg: string,
} | undefined

const myFish: FishTypeImpl<State, string, string, State> = FishTypeImpl.of({
    // each kind of fish needs an identifier: its semantics
    semantics: Semantics.of('myFish'),
    initialState: (_name, _sourceId) => ({
        state: undefined, // start without information about previous event
        subscriptions: [Subscription.of(myFish)] // subscribe across all names & sources
    }),
    // keep some details of the most recent event in the state
    onEvent: (_state, event) => ({
        time: new Date(event.timestamp / 1000).toISOString(),
        name: event.source.name,
        msg: event.payload
    }),
    // show the state computed above to the outside world (see Pond.observe below)
    onStateChange: OnStateChange.publishPrivateState(),
    // generate one event straight from each message sent to this fish
    onCommand: (_state, msg) => [msg],
});

(global as any).WebSocket = require('ws');
(async () => {
    // get started with a Pond
    const pond = await Pond.default()
    // figure out the name of the fish we want to wake up
    const myName = process.argv[2] || pond.info().sourceId
    // wake up fish of kind myFish with name myName and log its published states
    pond.observe(myFish, myName).subscribe(console.log)
    // send a message every 5sec to generate a new event
    setInterval(() => pond.feed(myFish, myName)('ping').subscribe(), 5000)
})()
