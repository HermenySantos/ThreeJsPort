# One QR code, twelve cities, one day

**Sole engineer · Global WebAR experience · Dorier for Scopely · 2025**

Scopely’s Global Celebration Day brought 2,400 employees together across 12 hubs, from Tokyo to Mexico, each running the event in its own time zone. Part of it was a character hunt in the browser: one QR code, no app, characters that appear as you walk and that you befriend with the right prop. I was the only engineer: the AR experience, the score API, the database and the staff dashboard.

**At a glance**

- **12 hubs, one day**, served by a single deployment and the same QR code everywhere.
- **Designed for approximately 2,100 players**; Scopely’s global employee-experience lead reported 2,400 employees at the event.
- **Five-week core build** (7 July to 8 August 2025), then three weeks of refinement, including anti-cheat.
- **Targets:** iOS 14+ and Android 8+, 60 fps on mid-range phones.

## An event space became a character hunt

Participants used their phone’s browser to discover characters around the venue and choose the right props to befriend them. Each encounter contributed to a final summary of points, characters found and completion time—without an app download.

## My responsibility

The scope planned a front-end developer and a back-end developer; I was both. I built the Mattercraft/Zappar browser experience and its gameplay, the Azure Functions API, the Cosmos DB data model and the React dashboard event staff used. Filipe Lopes Pires was the project manager, and John’C Salansky designed the moodboard and the UI and prepared the 3D characters.

**TypeScript · Mattercraft / Zappar · Azure Functions · Cosmos DB · React**

## Connecting participants, scores and staff

Participants needed to enter from their own phones without installing a native app. Device motion, browser permissions, and connectivity could vary from person to person. Staff needed location-specific results rather than one undifferentiated global scoreboard.

Those constraints connected three engineering responsibilities: the interaction must communicate what the participant should do, the API must validate and store results, and the administration surface must organise the data around how the event is run.

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

## Walking, not shaking

The game rewards movement, so the cheapest cheat is to stand still and shake the phone. Telling the two apart on a phone is harder than it sounds. iOS and Android sample motion at different rates (30, 60 or 100 Hz), so I normalised the sensor stream first, falling back to the raw sensors if the normalising library did not load within 1.5 seconds. Shaking is only penalised when there is also evidence of walking and it lasts at least 200 ms, so a real walker who jolts their phone is not punished. Thresholds calibrate to each device, and I softened them after testing showed too many false positives.

**Tradeoff:** every extra bit of strictness catches more cheats and more honest players. I tuned towards fairness, because the game was never meant to be a competition.

## Organising scores around the event’s locations

Score submission attaches a location partition, and leaderboard queries use that same location boundary. This follows the event's operating model: staff and participants care about the results at their own venue.

This keeps the access pattern understandable: a local leaderboard is a location-bound read, rather than a global query filtered only in the interface.

**Tradeoff:** global reporting needs explicit aggregation rather than being identical to a local lookup. The location boundary fits how the event is operated and how its leaderboards are read.

## Following a score from interaction to administration

The scope called for a minimal backend: per-location endpoints and admin pages protected only by obscured URLs. I kept it small but made it defensible. The server clamps every score to the 2,000-point maximum, accepts only the 12 known location codes, filters nicknames and rejects timestamps from the future. Each IP can submit five scores per location per hour, counted inside that location’s partition, and score data, including the IP used for rate limiting, deletes itself after seven days.

The honest gaps: the endpoints are anonymous, a retried request can store a duplicate score, and an IP limit can catch real players sharing venue Wi-Fi.

These checks make browser-submitted data usable, while gameplay tuning addresses the interaction itself. Validation should not be confused with a complete anti-cheat guarantee: the browser remains a participant-controlled environment.

React administration gives staff a separate surface for location context and results. Owning the participant, backend, and staff layers together meant changes could be followed across their boundaries—for example, from how a score is produced to where it appears in a location's results.

## Testing on real phones

Testing was manual and on real devices: about 70 single-purpose test pages for sensors, permissions, spawning and scoring, plus an event-day FAQ for staff covering camera, motion and recovery. There were no automated tests; with hindsight, that is the first thing I would add.

## Result

The hunt ran at all 12 hubs on the same day, designed for approximately 2,100 players, as part of a celebration Scopely reported at 2,400 employees. The core implementation took five weeks, followed by three weeks of refinement.

The participant experience, data model and staff workflow were developed as one connected product.

## What I would improve next

I would make degraded-mode behaviour an explicit release check: permission denied, no sensor events, background/resume, and delayed score submission. I would also measure entry-to-first-interaction time and per-location request/error rates so the team could distinguish device friction from backend problems during an event.

For score delivery, I would examine the retry and duplicate-submission contract before adding automatic retries. A retry is useful only if the system can tell whether it is repeating the same action.
