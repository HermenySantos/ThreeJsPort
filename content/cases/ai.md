# An AI response is not ready just because the model finished

**Operator-controlled AI for live events · Dorier · 2026**

Generated text, approval state, audio playback and audience displays have to agree before a live-event reply is heard. I built the operator workflows that control that transition.

## My responsibility

I took primary implementation responsibility across the React operator interfaces, Python/FastAPI services, model integration and audience delivery. The work evolved across event-specific versions and subsequent product development, with colleagues contributing to the wider platform and delivery.

**React · TypeScript · Python · FastAPI · OpenAI / Azure OpenAI · WebRTC · WebSockets · Cosmos DB · Three.js**

## Two users, different needs

The product has two very different users. The backstage operator needs control and visibility: listening segments, notes, draft review, and explicit actions. The audience needs a coherent experience: the right response, audible at the right time, with a display that reflects what is happening.

The backend connects the operator workflows, provider integration, session state, and signaling. Audience surfaces consume live media and generated clips through different delivery paths. Conversation, panel, Q&A, workshop, and moderated-stage capabilities evolved across versions rather than one interface serving every format.

```text
BACKSTAGE                      APPLICATION CORE                  AUDIENCE
React operator console  <---->  FastAPI session / control  <---->  Stage and audience UI
  listening and notes            prompt construction               visualizer
  draft / approve / discard      provider integration               playback state
                                 session persistence
                                       |
                              OpenAI / Azure integration
                                       |
                         Realtime media and generated speech
```

WebRTC carries real-time media; WebSockets coordinate state and notifications. Stored clips also travel over HTTP. Each workflow combines these paths according to how the operator and audience need to interact.

## Separating a draft from permission to speak

For the moderated stage workflow, I separated drafting from permission to speak. The operator can review, approve or discard a response before it reaches the audience.

The important paths are:

- A usable draft enters review and exposes the approval action.
- A failed or empty draft must not become a blank approval card.
- Approval starts delivery once; a second click while the first is being handled must not dispatch the same response again.
- Discarding a draft ends that candidate's path to the audience.

I added guards around these transitions and component tests for the two particularly awkward cases: double-tapping approval and receiving an empty response after generation. Testing the sequence matters because the bug can live between otherwise valid components—the button, asynchronous request, and playback action each look reasonable in isolation.

**Tradeoff:** the operator remains in the loop, which adds an interaction step. It also creates an explicit point where an unsuitable answer can be stopped before stage delivery.

## Preventing the same response from starting twice

A fresh-audio notification and an intentional replay can race for the same stored clip. Two valid messages can therefore produce an invalid audience experience: the same response beginning twice.

I consolidated playback through a shared dispatch guard that compares the clip version and the time it last played. Repeated delivery of the same version within **1.5 seconds** is suppressed, and the version/time bookkeeping happens **before** invoking the audio callback. That ordering matters if another callback re-enters the path immediately.

```text
Incoming clip / replay
       |
Same version played within 1.5 seconds? -- yes --> suppress duplicate
       |
       no
       |
Record version and dispatch time
       |
Invoke audio playback
```

**Tradeoff:** a bounded window preserves later intentional replay but can also suppress a deliberate replay requested inside that window. It is a targeted race guard, not permanent deduplication of a clip.

## Recovering when notifications or browser audio get in the way

The stored-audio hook uses HTTP polling as a recovery path and WebSocket notifications for faster discovery. An in-flight fetch is not started twice; if a notification arrives while one is running, a pending flag requests another fetch afterward. Replay intent is preserved in a separate pending flag.

The browser introduces another boundary: playback may be blocked until a user gesture unlocks audio. Fetching and marking a version as consumed too early could skip the first audible clip. The hook can therefore remain disabled until the audience surface is ready.

For late arrivals, server-time alignment supports a playback offset. The first clip starts at its beginning; later clips only skip when sufficiently behind, retain a short lead-in and cap the amount skipped. This balances room synchronization against cutting the beginning off a sentence.

These mechanisms complement coordination between live WebRTC audio and generated speech. I also worked on lowering competing live audio during generated speech and on operator-side mute behaviour.

## Keeping model behaviour inside an operable product

Prompt construction is treated as application logic, with mode-specific builders and tests. Operator context and notes shape the request, while provider abstraction keeps the integration from being scattered across individual screens.

Prompt constraints guide the model; they do not replace review or guarantee perfect grounding. The more useful engineering boundary is the one the application can enforce: which draft is eligible for approval and which playback action is dispatched.

## Result

I delivered event workflows combining real-time AI with explicit human control and tested playback behaviour. Later work organised capabilities into configurable modules, extending the engineering beyond a single event interface.

## What I would improve next

I would consolidate the session and transport behaviour shared by the operator experiences, then extend scenario tests around reconnects, stale notifications, failed generation, and replay during an in-flight fetch. I would measure approval-to-audible-output time separately from model response time: they answer different product questions.
