# One tour, several devices, shared state

**Multi-device visitor platform · Dorier · 2025–2026**

A visitor platform connects an audio guide in a visitor’s hand, a tablet used by a guide, interactive kiosks, content tools and backend services. A change to a tour has to mean the same thing across those devices—even when a request is retried or a connection drops.

## My responsibility

I worked as a core contributor within the delivery team. My scope crossed React Native clients, Payload CMS, Go tour services and the documentation used to understand and operate the platform. I contributed to an existing, shared system and carried individual changes across the layers they touched.

**React Native · TypeScript · Go · MQTT · Payload CMS · PostgreSQL / TimescaleDB**

## How the platform fits together

```text
Audio guide              Docent tablet                Interactive kiosk
      \                        |                         /
       \------- live messaging and application APIs ---/
                                |
                     Go tour / state services
                                |
                      PostgreSQL / TimescaleDB

Payload CMS ---------- content and configuration --------> applications
```

The clients present different views of the same experience. A docent changes the tour, visitors consume its content, and services coordinate the shared state. MQTT supports live messaging alongside the APIs. Content management is another part of the system: changes to content and data contracts have to remain compatible with the applications consuming them.

The central question is which component has authority when a device reconnects, a request is duplicated or a local interface runs ahead of the server.

## Making tour ownership part of the client–server contract

Two staff tablets can both appear to control a tour if ownership exists only in their local interfaces. The service needs to know which device is asking to change shared state and whether that device has the right to do so.

I implemented server-side ownership checks and updated the docent application's requests to carry the controlling device identity. This connected the user-facing action to an explicit service rule.

```text
Docent action
    |
Request includes device identity
    |
Service checks the tour's device claim
    |                         |
Valid owner              Conflicting owner
    |                         |
Apply mutation           Reject unauthorized mutation
    |
Client reflects accepted state
```

A particularly important edge was duplicate tour creation. Retrying a create request should not accidentally erase an existing docent claim. I added handling to preserve that ownership where the duplicate-create path required it.

**Tradeoff:** device-aware requests have to coexist with legacy and operational paths. The implementation needed explicit compatibility handling, rather than assuming every caller would immediately supply the same new fields.

## Keeping the interface aligned with accepted state

A responsive interface can show a transition before the service has confirmed it. In a shared-device system that creates a dangerous ambiguity: the local screen appears to have advanced while the authoritative tour has not.

My tour-workflow investigations focused on distinguishing a requested transition from one the service had accepted: when to allow the next action, and how to handle a failed write without leaving the interface in a state the server never committed.

This complements ownership enforcement. The service decides whether a change is allowed; the client must faithfully represent what the service accepted. Neither half can compensate for the other being wrong.

## Reconstructing a tour after a connection drops

**Development-branch implementation:** I also built a flight recorder across the clients, Go service, database migration and tests. Its production rollout is not confirmed.

When connectivity is intermittent, an event received at 14:05 may have happened at 14:03. Ordering solely by receive time produces a misleading reconstruction of the tour. I implemented a telemetry path that keeps those two times distinct.

### Event time and receive time serve different purposes

The client supplies `occurredAt`, while the service retains receipt time. Client time is clamped server-side so a device clock cannot arbitrarily distort the timeline. Keeping both values also makes ingest delay visible.

**Tradeoff:** client time improves reconstruction, but clock skew and delayed replay still require interpretation. Clamping is a bound on bad input, not perfect distributed clock synchronization.

### An offline queue makes late delivery explicit

Each client has a disk-persisted replay queue capped at **300 events**, with replayed events labelled. The queue lets telemetry survive a temporary loss of connectivity and be submitted after reconnection.

**Tradeoff:** a bounded queue protects local resources but cannot retain an unlimited outage history. A priority policy for problem events is a useful next step when the queue saturates.

### Connectivity should reflect the transport

A cached store flag could remain “online” after the messaging connection had dropped. The implementation uses the transport's live connection state and records lifecycle events such as connect, reconnect, disconnect, and connection/subscription failure.

### Deduplication and retention keep the data useful

Anomaly records are deduplicated in a **30-minute window per kind and tour**. Retention differs by event class: short-lived heartbeats, longer routine history, and longer problem-event history. This limits noise and storage growth without treating every record as equally valuable.

The cross-stack change includes tests around timestamp clamping and anomaly deduplication. Those are meaningful boundaries: malformed clocks and repeated signals can undermine the usefulness of the entire timeline.

## Carrying changes beyond the API

My work also crossed group-tour terminology and data changes in the clients, CMS, shared types, Go services, and SQL. I integrated multilingual caption assets and contributed documentation used to understand and operate the platform.

Those changes required the application, service, migration and operating documentation to agree on the same meaning.

## Result and next steps

I delivered device-aware tour APIs and client integration, group-tour changes, caption integration, and handover material within the shared platform. The flight recorder is a separate development-branch implementation.

I would next standardize server-confirmed state transitions across clients and test telemetry reconstruction against known reconnect and clock-skew scenarios. That would provide a stronger basis for evaluating operational usefulness than counting the amount of telemetry collected.
