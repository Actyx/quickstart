import { Pond, Fish, FishId, Tag } from '@actyx/pond'

// Each fish keeps some local state it remembers from all the events it has seen
type State = { time: string, name: string, msg: string, } | undefined
const nameTag = Tag<string>('name')

const mkForgetfulChatFish = (name: string): Fish<State, string> => ({
    // The kind of fish is identified by the meaning of its event stream, the semantics
    fishId: FishId.of('ForgetfulChatFish', name, 0),

    // When the fish first wakes up, it computes its initial state and event subscriptions
    initialState: undefined, // start without information about previous event

    // Upon each new event, keep some details of that event in the state
    onEvent: (_state, event, metadata) =>
        ({
            time: metadata.timestampAsDate().toISOString(),
            name: metadata.tags.find(x => x.startsWith(
                `${nameTag.rawTag}:`
            ))?.split(':')[1] || ":-(",
            msg: event
        }),
    where: nameTag
});

(async () => {
    // get started with a Pond
    const pond = await Pond.default()
    // figure out the name of the fish we want to wake up
    const myName = process.argv[2] || pond.info().sourceId
    // wake up fish of kind ForgetfulChatFish with name myName and log its published states
    const list = document.getElementById('list')
    pond.observe(mkForgetfulChatFish(myName), state => {
        const p = document.createElement('li')
        p.textContent = JSON.stringify(state)
        list.appendChild(p)
    });
    // install a function to send a message, to be called when clicking the UI button
    (window as any).sendMsg = () => {
        const msg = (document.getElementById('msg') as HTMLInputElement).value
        pond.emit(nameTag.withId(myName), msg).toPromise()
    }
})()
