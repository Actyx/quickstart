import { Pond, Fish, FishId, Tag } from '@actyx/pond'

// Each fish keeps some local state it remembers from all the events it has seen
type State = { time: string, sender: string, msg: string, } | undefined
type Event = { msg: string, sender: string }
const senderTag = Tag<Event>('sender')

const mkForgetfulChatFish = (name: string): Fish<State, Event> => ({
    // The kind of fish is identified by the meaning of its event stream, the semantics
    fishId: FishId.of('ForgetfulChatFish', name, 0),

    // When the fish first wakes up, it computes its initial state and event subscriptions
    initialState: undefined, // start without information about previous event

    // Upon each new event, keep some details of that event in the state
    onEvent: (_state, { sender, msg }, metadata) =>
        ({
            time: metadata.timestampAsDate().toISOString(),
            sender,
            msg
        }),
    where: senderTag
});

// get started with a Pond
Pond.default()
    .then(pond => {
        // figure out the name of the fish we want to wake up
        const myName = process.argv[2] || pond.info().sourceId
        // wake up fish of kind ForgetfulChatFish with name myName and log its published states
        pond.observe(mkForgetfulChatFish(myName), console.log)
        // send a message every 5sec to generate a new event
        setInterval(() => pond.emit(senderTag.withId(myName), { msg: 'ping', sender: myName }), 5000)
    })
    .catch(ex => {
        console.log('cannot start Pond, is ActyxOS running in development mode on this computer?', ex)
        process.exit(1)
    })
