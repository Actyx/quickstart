import { Pond, Semantics, OnStateChange, Subscription, FishTypeImpl } from '@actyx/pond'

// Each fish keeps some local state it remembers from all the events it has seen
type State = { time: string, name: string, msg: string, } | undefined

const ForgetfulChatFish: FishTypeImpl<State, string, string, State> = FishTypeImpl.of({
    // The kind of fish is identified by the meaning of its event stream, the semantics
    semantics: Semantics.of('ForgetfulChatFish'),

    // When the fish first wakes up, it computes its initial state and event subscriptions
    initialState: (_name, _sourceId) => ({
        state: undefined, // start without information about previous event
        subscriptions: [Subscription.of(ForgetfulChatFish)] // subscribe across all names
    }),

    // Upon each new event, keep some details of that event in the state
    onEvent: (_state, event) => ({
        time: new Date(event.timestamp / 1000).toISOString(),
        name: event.source.name,
        msg: event.payload
    }),

    // Show the state computed above to the outside world (see Pond.observe below)
    onStateChange: OnStateChange.publishPrivateState(),

    // Upon each received command message generate one event
    onCommand: (_state, msg) => [msg],
});

(global as any).WebSocket = require('ws');
(async () => {
    // get started with a Pond
    const pond = await Pond.default().catch(ex => {
        console.log('cannot start Pond, is ActyxOS running in development mode on this computer?', ex)
        process.exit(1)
    })
    // figure out the name of the fish we want to wake up
    const myName = process.argv[2] || pond.info().sourceId
    // wake up fish of kind ForgetfulChatFish with name myName and log its published states
    pond.observe(ForgetfulChatFish, myName).subscribe(console.log)
    // send a message every 5sec to generate a new event
    setInterval(() => pond.feed(ForgetfulChatFish, myName)('ping').subscribe(), 5000)
})()
