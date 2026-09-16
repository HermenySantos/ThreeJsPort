# A useful answer starts with the right source

**Museum AI concierge · Working prototype · Dorier · 2026**

A museum visitor can ask a question, speak naturally or point a camera at an object. The application has to decide which information is relevant and how to respond. I built a concierge prototype with a visitor interface and an operator cockpit—a diagnostic view of the decisions behind the conversation.

## My responsibility

I was the primary engineer across the React interface, TypeScript API, grounding integration and orchestration. The result is a working Azure development/demo application with an English/French interface and recorded visitor and cockpit flows.

**React · TypeScript · Express · Azure AI Search · Azure Speech · Vitest**

## A visitor interface and a view behind it

The visitor gets a focused interface for voice, text and camera input. The operator cockpit exposes the behaviour behind that interface: source selection, monitoring estimates, and whether a strategy is newly issued or carried over from a previous turn.

The recorded demo shows voice and text interaction, language switching and the diagnostic cockpit. The cockpit makes it possible to examine source selection and adaptation alongside the visitor-facing experience.

## Connecting conversation, monitoring and adaptation

```text
Visitor PWA
    |
Express turn handler
    |
Guide provider <------- catalog / source-selection logic
    |
Append finalized visitor + assistant transcript
    |
Monitor provider
    |
Trigger event? ---- no ----> retain current session state
    |
   yes
    |
Rule-based strategy selection
    |
Rule-based intervention / Gamification selection
    |
Store active strategy and rules
    |
Response + diagnostic trace --> visitor UI / cockpit
```

The Guide and Monitor providers handle conversation and monitoring according to the runtime configuration. When the Monitor produces a trigger, synchronous rule-based functions select a strategy and an intervention. This makes the adaptation logic explicit and available to inspect.

## Monitoring the answer the visitor actually received

The turn handler runs the Guide first. The provider may rewrite the draft response before returning, so the application appends the visitor/assistant pair to the session transcript only after that final response is available.

The Monitor then receives the finalized text, the visitor input, source-record information, and recent state snapshots. That ordering keeps the next decision aligned with what the visitor actually saw rather than an intermediate draft.

**Tradeoff:** the ordinary turn path is sequential. Guide completion precedes monitoring and adaptation, so the orchestration boundary must be considered when evaluating end-to-end response time. Splitting responsibilities does not automatically make them concurrent or cheaper.

## When a search match is the wrong source

Catalog retrieval was not simply a matter of asking search for a result. Lexical overlap could bind an unrelated question to a museum record and make the answer appear more grounded than it was.

I worked on several parts of that boundary:

- Minimum-score filtering rejects weak lexical matches before they become an answer source.
- Relevance checks examine whether a candidate record actually fits the question, rather than relying solely on the ranking score.
- Camera-related records and nonvisual factual questions need different treatment; a camera cue should not automatically dominate a general factual question.
- Allow-listed source matching also needs relevance checks, so a common verb or connector does not create a false match.
- When the available sources do not support the question, the response path can expose uncertainty rather than forcing a catalog answer.

**Tradeoff:** a single global search-score threshold cannot resolve every query. Longer irrelevant questions can score above shorter legitimate ones. Adding a relevance check addresses that mismatch but introduces another component with its own failure behaviour. On some relevance-model failures, the check fails open: it allows the request to continue without a successful relevance check. That favours availability but leaves a source-selection risk to address.

The engineering lesson is to evaluate source selection separately from fluent answer generation. An answer can sound good while pointing to the wrong evidence.

## Making adaptation decisions explicit

The Monitor produces estimates and trigger events; the application retains recent snapshots and scores for subsequent turns. When a trigger exists, strategy selection examines the trigger, signals, session state, and conversation transcript.

The strategy function prioritizes diagnosed causes such as an unresolved visual reference, cognitive overload, or a mismatch in relevance. It then produces a recommended approach, tone, things to avoid, and target changes.

Intervention selection uses that strategy and its confidence:

- Below **0.4** confidence, the selection favours quiet or pause-oriented behaviour.
- From **0.4** to below **0.7**, it favours a gentler probe.
- At higher confidence, it can select the primary intervention for the diagnosed cause.
- A calmness constraint can override an overly stimulating choice for the visitor profile.

These thresholds are implementation choices, not psychological ground truth. Their value is that the decisions are explicit enough to inspect, test, and revise.

## Keeping a strategy across turns

A strategy can remain active after the turn that issued it. The cockpit exposes this distinction: a gate can be quiet on the current turn while the session still carries a previous strategy.

The cockpit labels a carried strategy separately from a new trigger. A turn can therefore show the Guide and Monitor running, a quiet adaptation gate and a strategy retained from earlier in the conversation. That distinction helps explain why the system is continuing an approach without choosing it again.

## Result

I delivered a working development/demo application connecting visitor interaction, source-based response behaviour, monitoring, rule-based adaptation and a diagnostic cockpit. The project includes mock and Azure runtime configurations, unit and integration tests, and probes for checking how the components cooperate.

The prototype demonstrates the complete turn flow in a recorded development environment. A public museum rollout remains a separate milestone.

## What I would improve next

I would build a compact evaluation set covering relevant catalog queries, tempting-but-irrelevant matches, false adaptation triggers, and language continuity. The report should show source accuracy, response time, and model usage separately.

I would also harden session persistence and operating limits for a public rollout. The API keeps sessions and rate-limit counters in process memory, so process restarts and multi-instance deployment require explicit shared-state work.
