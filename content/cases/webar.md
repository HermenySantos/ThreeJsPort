# One experience across venues and phones

**Global WebAR experience · Dorier · 2025**

Participants joined a WebAR experience from their own phones—no app install—across twelve event locations. Phones, browsers, permissions and movement differed; staff needed results for their location, not one global scoreboard. I owned the browser experience, score APIs and administration within the wider event delivery.

**Approximately 2,100 participants · 12 locations · five weeks for the core implementation, followed by refinement.**

## My responsibility

I owned the engineering across the Mattercraft/Zappar browser experience, Azure Functions API, Cosmos DB integration and React administration within the wider event delivery. That included gameplay, feedback, data handling and the interfaces used to inspect results.

**TypeScript · Mattercraft / Zappar · Azure Functions · Cosmos DB · React**

## Connecting participants, scores and staff

Participants needed to enter from their own phones without installing a native app. Device motion, browser permissions, and connectivity could vary from person to person. Staff needed location-specific results rather than one undifferentiated global scoreboard.

Those constraints connected three engineering responsibilities: the interaction must communicate what the participant should do, the API must validate and store results, and the administration surface must organise the data around how the event is run.

```text
PARTICIPANT                         BACKEND                        STAFF
Phone browser / Mattercraft  --->  Azure Functions  <---  React administration
  camera and motion                score submission       location context
  character interaction            validation             configuration / results
  feedback and scoring                   |
                                    Cosmos DB
                              location-scoped score data
                                         |
                            leaderboard query by location
```

## Letting participants join from the browser

Browser AR avoids asking a walk-up participant to find and install an app. Mattercraft provided the authoring environment, while TypeScript controlled the game behaviour and its connection to the backend.

**Tradeoff:** the browser becomes part of the product's operating environment. Native capabilities cannot be assumed, and camera/motion permissions need to be requested in the right interaction context. An experience that works on one developer phone is not enough to establish that the entry flow is dependable.

## Handling permissions and movement on real phones

The interaction relies on device movement, so the code tracks sensor availability, motion permission, activity, and game state. Movement thresholds and callbacks connect sensor observations to gameplay rather than putting all behaviour in a single event handler.

A concrete browser constraint appears in the permission flow: on iOS, requesting motion permission requires a user gesture. The sensor manager uses the permission obtained at the entry screen’s gesture gate, avoiding a second request from background setup that could produce a permission error.

That separation matters because “the sensor API exists” and “the browser is delivering usable events” are different states.

### Detecting a silent sensor path

The sensor manager checks health every five seconds and tracks how long it has been since activity arrived. Ten seconds without activity is treated as a stuck-sensor condition, which can switch the sensor status into a fallback mode.

In the development version described here, synthetic fallback movement is disabled for real-movement testing. Entering fallback mode therefore does not itself guarantee that gameplay will progress.

**Tradeoff:** synthetic progress can keep an experience moving, but it can also flatten the movement mechanic and obscure whether real sensors work. The exact fallback behaviour needs to be part of the release configuration and device test plan.

## Organising scores around the event’s locations

Score submission attaches a location partition, and leaderboard queries use that same location boundary. This follows the event's operating model: staff and participants care about the results at their own venue.

```text
Score submission
    |
Validate supplied fields
    |
Assign location partition
    |
Store score
    |
Query scores for that location
    |
Show local leaderboard
```

This keeps the access pattern understandable: a local leaderboard is a location-bound read, rather than a global query filtered only in the interface.

**Tradeoff:** global reporting needs explicit aggregation rather than being identical to a local lookup. The location boundary fits how the event is operated and how its leaderboards are read.

## Following a score from interaction to administration

The backend includes bounds checks and nickname sanitization. These are part of making browser-submitted data usable, while gameplay tuning addresses the interaction itself. Validation should not be confused with a complete anti-cheat guarantee: the browser remains a participant-controlled environment.

React administration gives staff a separate surface for location context and results. Owning the participant, backend, and staff layers together meant changes could be followed across their boundaries—for example, from how a score is produced to where it appears in a location's results.

## Result

The experience served approximately **2,100 participants across 12 locations**. The core implementation took **five weeks**, with subsequent interaction refinement.

The participant experience, data model and staff workflow were developed as one connected product.

## What I would improve next

I would make degraded-mode behaviour an explicit release check: permission denied, no sensor events, background/resume, and delayed score submission. I would also measure entry-to-first-interaction time and per-location request/error rates so the team could distinguish device friction from backend problems during an event.

For score delivery, I would examine the retry and duplicate-submission contract before adding automatic retries. A retry is useful only if the system can tell whether it is repeating the same action.
