# An AI guide that knows when to say “I don’t know”

**Primary engineer · Museum AI concierge · Working prototype · Dorier · 2026**

A visitor speaks, types or points a camera at an exhibit, and the guide answers in a natural conversation, but only from sources it can stand behind. I built it as a pitch prototype for a major museum. When that museum did not go ahead, we generalised it into a concierge Dorier can offer any cultural venue: voice, vision, a grounding ladder that ends in an honest “I don’t have that”, and a silent second agent that notices when a visitor is losing interest. An operator cockpit shows every decision behind the conversation as it happens.

**At a glance**

- **Two model-backed agents and two rule engines:** a Guide that talks, a Monitor that watches, and deterministic Strategy and Gamification rules that only wake when engagement drops.
- **A grounding ladder:** museum catalogue, then an allow-listed web source with a citation, then well-established facts, then “I don’t have that”.
- **Stress-tested live:** 57 behavioural and 44 edge-case probes against the deployed system; 474 automated tests passing.
- **Azure:** AI Foundry, AI Search, Speech, App Service and Key Vault.

## My responsibility

Filipe Lopes Pires, lead immersive engineer, wrote the concept, the specification and the six behaviour datasets the agents are built from, and later led a conversation-quality pass: transcript-aware context across the Guide, Monitor and retrieval, small talk and polite off-topic refusals, and identical behaviour for spoken and typed questions.

I built the rest, about 100 of 118 commits: the Azure stack, speech and vision, catalogue retrieval and the grounding tiers, the relevance gate, the operator cockpit, deployment, and the stress-testing and hardening before the demo.

**React · TypeScript · Express · Azure AI Foundry · Azure AI Search · Azure Speech · Vitest**

## Two agents talk and watch; rules decide

Each turn runs in a fixed order. The Guide answers first, and the Monitor only sees the answer once it is final, so it judges what the visitor actually heard rather than a draft the Guide later rewrote. The Monitor scores engagement and, when it drops, raises a trigger. Only then do the Strategy and Gamification rules wake up; on an ordinary turn they cost nothing.

**Tradeoff:** the turn is sequential, so the Monitor adds to response time rather than running beside the Guide. Splitting the work into agents made each one testable on its own, not faster.

## When a search match is the wrong source

Catalogue retrieval was not simply a matter of asking search for a result. Keyword search over a 43-record catalogue was too eager, and the live probes caught it binding unrelated questions to records:

- “Who won the 2018 World Cup?” grounded to Usain Bolt’s shirt.
- The connector “at” was enough to tie a question about Norway’s medals to Jesse Owens’ page.
- A camera cue tagged “motto” scored 9.38, far above any safe threshold, so a plain question about the motto answered from the wrong record.

No single score threshold separates these, because keyword scores are not normalised.

So I stopped trusting the score alone:

- A minimum score drops weak keyword matches before they can become a source.
- A relevance gate, a single yes/no model call, asks whether the top record actually answers the question.
- Camera cues are weighed differently from plain factual questions, so a tagged cue no longer hijacks a general factual question.
- The allow-listed web tier gets the same check, so a connector like “at” cannot create a match on its own.
- When nothing fits, the Guide says it doesn’t know instead of forcing a catalogue answer.

**Tradeoff:** the gate is one more component that can fail, and on some model errors it fails open, letting the turn continue unchecked. That keeps the guide talking, but it is a known source-selection risk.

The lesson: test source selection separately from answer quality. An answer can sound right while citing the wrong evidence.

## Breaking it before a visitor does

Before the demo I ran a probe campaign against the deployed system, not against mocks: grounding for every tier, off-topic questions, prompt injection and jailbreaks, PII and medical requests, malformed input (empty, 1,000 characters, right-to-left and CJK text, control characters), concurrency and rate limits.

What held: injections were refused with no prompt leaks, eight parallel sessions ran without races, and the 30-turn session cap and the per-IP rate limit returned 429 as designed. What it found: the Monitor cried wolf, reading “tell me about…” as a loss of interest and triggering interventions on engaged visitors; web over-grounding through the “at” connector; and French factual questions refusing because the fact checks matched English words only. Each fix was written test-first, from a failing reproducer to green.

Still open, stated plainly: three edge checks fail, namely an injection hidden in base64, one French question about the movement’s founder, and a return to the motto mid-conversation.

## Six languages in the model, two on stage

The data model supports six languages. Probes showed German, Italian, Spanish and Portuguese grounding unreliably, because the search index holds English content. I scoped the visitor-facing selector to English and French, where grounding held, rather than demo answers that only sounded confident.

## Paying for intelligence only when it is needed

On a normal turn only the Guide and the Monitor run; the strategy and intervention path runs only when the Monitor’s gate fires. The relevance check is a single-token yes/no call: the no-cost alternative to a paid semantic ranker, at the price of one extra model call per turn.

## When a visitor drifts, rules decide what happens

When the Monitor raises a trigger, a deterministic Strategy function picks the likely cause, such as an unresolved visual reference, overload or a mismatch with the visitor’s interests, and turns it into an approach: tone, what to avoid, what to change. Its confidence then picks the intervention:

- Below **0.4**: stay quiet or pause.
- From **0.4** to below **0.7**: a gentle probe.
- Above that: the primary intervention for the diagnosed cause, unless a calmness rule overrides an overly stimulating choice for that visitor.

These thresholds are design choices, not psychology; their value is that every decision can be read, tested and changed. A strategy can also stay active over later turns, and the cockpit labels a carried strategy separately from a new trigger, so an operator can see why the guide keeps an approach without choosing it again.

## Result

A working prototype that runs the full turn end to end: voice, text and camera in; a grounded answer out; engagement monitored and adaptation decided by rules; every step visible in the operator cockpit. It runs against Azure or against mocks, with unit and integration tests and the probe harness alongside. A public museum rollout remains a separate milestone.

## What I would improve next

The probe harness exists; what is missing is turning it into a scored benchmark that runs in CI. Response time is recorded per turn but has never been measured as a benchmark, so that comes next. For a real rollout, sessions and rate-limit counters need to move out of process memory into shared state, and a semantic ranker should replace the per-turn relevance call.
