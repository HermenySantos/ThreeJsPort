# Coordinating an immersive visitor experience across rooms and devices

**Immersive visitor platform · Dorier · 2025–2026**

Visitors move through three experiences with a handheld audio guide, while a guide controls the tour from a tablet. Audio responds to visitor location and show cues; interactive kiosks bring the group into a shared voting exercise.

Within Dorier’s delivery team, I extended the software across React Native applications, native Android modules, Go services and Payload CMS. My work connected the visitor experience to the systems behind it: positioning, audio playback, tour control, multilingual content and the documentation needed to operate the platform.

## From arrival to a shared decision

Visitors join a scheduled tour and select a language on their audio guide. The guide’s tablet shows the group and controls progression through the experiences. As visitors explore, the backend combines location updates with show cues to determine the audio state sent to each handheld.

In the final experience, kiosks assign visitors fictional-country roles. Visitors choose priorities, consider amendments and cast a final vote. The kiosks follow the presentation’s cues and display shared results received through the messaging system.

What looks like one continuous experience spans several applications, content services and physical systems. The engineering challenge is keeping those parts aligned as people move, devices reconnect and guides advance the tour.

## My responsibility

I contributed to an existing platform within a wider delivery team. My implementation work included native positioning and headphone-reconnection handling, audio synchronisation fixes, device-aware tour control, group-tour language flows, multilingual content integration and operator tools.

I also assembled the technical documentation and operating guidance, combining software verification with material from the colleagues responsible for external systems.

**React Native · TypeScript · Kotlin · Go · MQTT · Payload CMS · PostgreSQL**

## How the platform fits together

The audio guide, guide tablet and voting kiosk serve different roles. Tour services coordinate session and visitor state; the CMS supplies schedules, content and media. Live messages carry tour updates, show cues and kiosk choices alongside the application APIs.

Two external inputs matter to the experience: show control provides presentation state and media cues, while indoor positioning provides visitor-location updates. The backend uses those inputs to compute the state delivered to each audio guide. The kiosk follows its own cue-and-result flow rather than calculating the room’s result locally.

My work covered application and service integration. Colleagues owned show-control configuration, positioning hardware and calibration, device management and site infrastructure.

## Keeping positioning inside the visitor app

The audio guide originally depended on a separate positioning app running in the background. Android could stop that process independently of the visitor application.

I integrated the positioning SDK through a Kotlin module exposed to React Native. The application starts Bluetooth advertising during registration, restarts it during session recovery and stops it during tour cleanup. The integration includes Android Bluetooth permission handling.

This brought the positioning lifecycle into the application using it. It still depends on device permissions and operating-system behaviour; it does not replace the venue’s positioning hardware or calibration.

## Keeping audio aligned with the experience

### Correcting drift and stale volume changes

An unchanged media reference could leave playback running without applying newer timing information from the show. I added a periodic comparison between the expected position and the audio player’s actual position, seeking when the difference exceeds the correction threshold.

The implementation checks every five seconds and corrects differences above 400 milliseconds. Those values describe the correction policy, not a measured guarantee of synchronisation accuracy.

I also added cancellation for outdated volume fades. A previous fade-to-silence should not continue after a new playback action has set the volume.

### Recovering when headphones reconnect

Unplugging headphones can pause Android playback without a matching automatic resume when they are plugged back in. I added a native audio-output detector and connected it to the existing synchronised playback path, so reconnection could resume from the current show position.

The handler avoids restarting audio during a pending recovery, priority audio playback or an already-playing state.

### Handling visitors who are already in place

A visitor should not need to move again just because the show has entered its exploration phase. I added backend handling that resolves the visitor’s already-known exhibit zone when that phase begins and publishes the corresponding audio state.

This handles two independent triggers—show progression and visitor movement—without requiring them to arrive in a particular order.

## Making tour ownership part of the client–server contract

Two tablets can both appear to control a tour if ownership exists only in their interfaces. I implemented device-aware requests and server-side ownership checks, connecting a guide’s action to the device assigned to the tour.

For a claimed active tour, the checks reject a missing or conflicting device identity. Unclaimed and inactive tours follow compatibility paths. I also added handling to preserve an existing guide-device claim when another create request arrives.

The distinction matters: a local screen can request a change, but the service must decide whether that change is allowed.

## Carrying language and content through the stack

Group tours needed a shared show language carried consistently from scheduling to playback. I connected that setting across CMS fields, the guide tablet, Go services, database storage and messages sent to show control.

I also extended multilingual content handling and integrated approved translations into the CMS data, shared types and kiosk content path. My contribution covered the engineering and integration of that content, alongside caption behaviour and asset work.

These changes crossed boundaries that are easy to miss when applications are treated separately: a field selected by staff must retain the same meaning in the API, stored tour and presentation system.

## Giving staff tools to operate the system

I added a device-flag flow that connects an action on the audio guide to a backend update and a visible indicator on the guide’s tablet. It gives staff a way to identify a particular visitor device within the group.

My work also included remote language and caption controls, recovery improvements, persistent device logging and in-app user-guide viewers. Updated guides were subsequently bundled into the application source.

These features support the people running the experience as well as the people taking part in it.

## Making the platform understandable after handover

I assembled the technical documentation around how the system actually fits together: application journeys, backend services, API and messaging contracts, verification steps and operating procedures.

The documentation connects source inspection with recorded API checks and application walkthroughs. It distinguishes verified behaviour from remaining checks and identifies where a subsystem belongs to another specialist.

That distinction is part of the handover itself. The next engineer or operator needs to know both how a flow works and where to look when one part stops behaving as expected.

## Additional engineering: a tour flight recorder

**Development-branch implementation; production rollout is not confirmed.**

I also built a flight recorder across the applications, Go service and database, with an operator console for inspecting problems and device or tour timelines.

It separates event time from receipt time, retains a bounded offline replay queue, records messaging lifecycle events and applies deduplication and retention rules. The aim is to reconstruct what happened across devices without treating late-arriving events as if they occurred at receipt time.

## What this work demonstrates

This project required following behaviour across interfaces, native device APIs, live messaging, backend state and content. My contribution combined new capabilities with investigation and refinement of an established platform—and the documentation needed to make that work understandable to the team operating it.
