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

(async () => {
    // get started with a Pond
    const pond = await Pond.default()
    // figure out the name of the fish we want to wake up from the environment
    const myName = process.argv[2] || pond.info().sourceId
    // wake up fish of kind ForgetfulChatFish with name myName and log its published states
    const list = document.getElementById('list')
    pond.observe(ForgetfulChatFish, myName).subscribe(state => {
        const p = document.createElement('li')
        p.textContent = JSON.stringify(state)
        list.appendChild(p)
    });
    // install a function to send a message, to be called when clicking the UI button
    (window as any).sendMsg = () => {
        const msg = (document.getElementById('msg') as HTMLInputElement).value
        pond.feed(ForgetfulChatFish, myName)(msg).subscribe()
    }
})()
