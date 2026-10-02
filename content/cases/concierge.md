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

I worked on several parts of that boundary:

- Minimum-score filtering rejects weak lexical matches before they become an answer source.
- Relevance checks examine whether a candidate record actually fits the question, rather than relying solely on the ranking score.
- Camera-related records and nonvisual factual questions need different treatment; a camera cue should not automatically dominate a general factual question.
- Allow-listed source matching also needs relevance checks, so a common verb or connector does not create a false match.
- When the available sources do not support the question, the response path can expose uncertainty rather than forcing a catalogue answer.

**Tradeoff:** a single global search-score threshold cannot resolve every query. Longer irrelevant questions can score above shorter legitimate ones. Adding a relevance check addresses that mismatch but introduces another component with its own failure behaviour. On some relevance-model failures, the check fails open: it allows the request to continue without a successful relevance check. That favours availability but leaves a source-selection risk to address.

The engineering lesson is to evaluate source selection separately from fluent answer generation. An answer can sound good while pointing to the wrong evidence.

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

I delivered a working development/demo application connecting visitor interaction, source-based response behaviour, monitoring, rule-based adaptation and a diagnostic cockpit. The project includes mock and Azure runtime configurations, unit and integration tests, and probes for checking how the components cooperate.

The prototype demonstrates the complete turn flow in a recorded development environment. A public museum rollout remains a separate milestone.

## What I would improve next

The probe harness exists; what is missing is turning it into a scored benchmark that runs in CI. Response time is recorded per turn but has never been measured as a benchmark, so that comes next. For a real rollout, sessions and rate-limit counters need to move out of process memory into shared state, and a semantic ranker should replace the per-turn relevance call.
