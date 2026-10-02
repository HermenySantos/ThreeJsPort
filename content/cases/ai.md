# Ovee — live-event AI with a human in control

**Full-stack product engineering · Dorier · Fortune-500 tour and mci group’s CheckedIn · 2026**

Ovee listens to a live stage, drafts what an AI co-host should say, and puts that draft in front of an operator before anything reaches the room. It also turns hundreds of audience and workshop contributions into themes on the main screen in seconds.

It ran at four live events across Asia and Europe: a three-summit leadership tour for a Fortune-500 multinational, and mci group’s [CheckedIn 2026](https://checkedin.digiplace.site/) in Geneva (25–27 August), where Ovee was on the programme as a panellist alongside the group CEO. At one leadership summit it supported 600 participants across 60 roundtables, with workshop inputs becoming themes on the main display in approximately five seconds.

**At a glance**

- **CheckedIn, three event days:** ~175,000 requests, 7 server errors, average response 16–42 ms (Azure platform metrics).
- **Zero off-message moments on stage** across all four events.
- **Workshop synthesis:** 60 roundtables turned into shared themes in seconds; summaries measured at 3–6 s in testing.
- **About CHF 520 of Azure** for seven months and four events, of which roughly CHF 14 was model calls.

## My responsibility

I built Ovee: about 600 of roughly 670 commits, from the first commit in March 2026 to productisation in September. That covers the operator approval workflow, playback guards and recovery paths, the realtime audio relay, the workshop and Q&A runtimes, the audience apps, and the move from per-event builds to one configurable product.

Filipe Lopes Pires, lead immersive engineer, built the first version of the speech-approval step and the early workshop mode. Yoav Sochen, the project manager, operated Ovee live at all four events. I trained him on it and stayed on technical standby.

That standby was needed once. At the first summit, a spike in concurrent audience connections went past the server’s capacity and Ovee dropped out. It self-healed within about a minute, but participants would reconnect all at once, so I scaled the server up live before they did. It held for the rest of the event. Afterwards I moved Ovee to a larger plan and made load testing a standard step before every event.

At CheckedIn I shipped fixes between sessions and built a second simultaneous workshop room overnight, while the platform kept serving the event.

**React · TypeScript · Python · FastAPI · OpenAI / Azure OpenAI · WebRTC · WebSockets · Cosmos DB · Three.js**

## What I delivered

- Operator workflows for context, draft review and controlled stage delivery.
- Model integration and session services connecting operator and audience interfaces.
- Playback guards and recovery paths for generated speech.
- Event workflows that later evolved into configurable product modules.

## Two interfaces, one live experience

The backstage operator needs context and control. The audience needs the right response at the right time, with a display that reflects what is happening.

React interfaces connect to FastAPI services for session state, model integration and delivery. WebRTC carries live media, WebSockets coordinate state and notifications, and HTTP delivers stored audio. The combination varies by workflow.

The current Ovee wall brings ambient insights, poll takeovers and speech into one audience surface. The engineering below spans the event workflows and later product consolidation.

## A draft needs permission to reach the stage

For the moderated stage workflow, I separated generating a response from permission to speak. The operator can review, approve or discard a draft before it reaches the audience.

I added guards so an empty response cannot become a blank approval card, and a second approval click cannot dispatch the same response while the first is being handled. Component tests cover both cases.

The extra review step gives the operator a clear point to stop an unsuitable answer. This boundary applies to the moderated stage workflow; other modes have their own delivery controls.

## One response, one playback start

An audio notification and a replay request can arrive close together for the same stored clip. Without coordination, the audience can hear the same response start twice.

I consolidated playback through a shared guard that checks the clip version and its last dispatch time. It suppresses the same version within **1.5 seconds**, recording the version and time before invoking playback so an immediate second callback sees the updated state.

The bounded window allows later replay. The tradeoff is that it can also suppress an intentional replay requested within that short window.

## Recovering from missed notifications and blocked audio

WebSocket notifications help discover fresh audio quickly; HTTP polling provides a recovery path. If a notification arrives during an existing fetch, a pending flag requests another fetch afterward. Replay intent is tracked separately.

Browser audio may remain blocked until a user gesture unlocks playback. The audio hook can stay disabled until the audience surface is ready, avoiding consuming a clip version before it can be heard.

Server-time alignment also supports late arrivals. The first clip starts from the beginning; later clips can use a bounded offset while retaining a short lead-in. I also worked on lowering competing live audio during generated speech and on operator mute behaviour.

## Model behaviour as application logic

Mode-specific prompt builders and tests keep provider integration out of individual screens. Operator context and notes shape the request.

Prompt instructions help guide responses. Application state determines whether a draft can be approved and whether an audio action is dispatched. Keeping those responsibilities separate makes the system easier to test and operate.

## Delivery and further validation

The product has been delivered at four live events. Separately from the 600-person summit, a preserved event export contains six captured stage sessions, and its workshop summary records 163 contributions across six topics.

The next measurement I would add is approval-to-audible-output time, tracked separately from model response time. I would also extend scenario testing around reconnects, stale notifications and replay during an in-flight fetch.
