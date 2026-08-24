# MIDI Assistant: Technical Overview

## Executive Summary

MIDI Assistant is a macOS application, paired iPadOS Remote, and Audio Unit (AUv3) plugin that together form an intelligent MIDI middleware and live-performance control layer for keyboardists — built around Apple MainStage, but usable with any MIDI-capable DAW or hardware rig. It provides a fully visual, data-driven Mixer and Performance Hub, deep MIDI routing and transformation, and a real-time-safe C++ DSP kernel for its AUv3 plugin.

---

## Architecture

### Core Design Pattern: Virtual MIDI Port (Man-in-the-Middle) + Namespace Abstraction

The application positions itself between MIDI controllers (hardware and software) and MainStage (or other hosts), intercepting and transforming signal in both directions:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│  Controllers    │────▶│  MIDI Assistant  │────▶│  MainStage  │
│  (Lemur, LCXL)  │◀────│  (Virtual Ports) │◀────│  (or DAW)   │
└─────────────────┘     └──────────────────┘     └─────────────┘
```

Controls are never bound to a raw hardware channel. Instead, every mapping targets a **Namespace** — a user-defined logical tag (e.g. `LeadSynth_Cutoff`). If a physical keyboard is swapped at a venue, only the Namespace's port assignment changes; every layout and event that targets the Namespace updates instantly, with no per-control remapping.

### Technology Stack

| Component | Technology | Purpose |
| --- | --- | --- |
| Mac App | Swift 6 / SwiftUI | Mixer, Concert Editor, Performance Hub, Routing UI |
| AUv3 Plugin (Host FX) | Swift + a lock-free C++ DSP kernel | Real-time-safe processing inside MainStage's audio thread |
| iPad Remote | Swift 6 / SwiftUI | Live performance surface, bidirectionally synced to the Mac |
| MIDI I/O | MIDIKit (CoreMIDI wrapper) | Physical and virtual MIDI port management |
| Networking | UDP, split into independent performance and control pipelines | Mac ↔ iPad sync, Mac ↔ AUv3 plugin state |
| Concurrency | Swift Actors | Thread-safe routing and state management |
| Configuration | Codable JSON | Concerts, catalogs, routing profiles |
| Mapping Import | Apple Vision (OCR) | Extracting existing MainStage assignment screenshots into namespace mappings |

---

## Core Components

### 1. MixerStateEngine

The authoritative, data-driven state engine behind the Mixer, SubScreens, and Performance Hub. A Concert's `mixerLayout` JSON is deserialized once and drives every fader, matrix button, and SubScreen without any hardcoded UI per rig — two Concerts can present completely different control surfaces from the same app binary. The engine also owns:
- **Radio Groups** — mutually exclusive control sets (only one member ever ON).
- **Ghost Controls** — lightweight references that mirror a deeply-nested SubScreen control on the main Mixer, inheriting its labels, formatting, and behavior automatically.
- **Slave Subscriptions** — one control's state driven by another's, including a non-transmitting "PART Fader" link used to seed Dynamic Ramps from the correct starting value.

### 2. RoutingService / NetworkUDPActor

Actor-based services managing the virtual MIDI port lifecycle:
- Creates and merges virtual ports (`BStg_`-prefixed) for hardware interception and software routing.
- **Segregates performance traffic from control traffic into independent pipelines** — notes, velocity, and sustain (latency-critical) never queue behind a burst of fader (CC) movement.
- Applies per-port note/CC routing modes, velocity curves, and a **Jitter Lock Filter** that suppresses sub-threshold electrical noise from analog hardware faders without dulling intentional fast moves.
- Handles **Soft Takeover** (Pickup or Proportional mode) so a non-motorized physical fader can't cause a value jump when a scene changes underneath it.

### 3. ConcertManager / ConcertViewModel

Manages the two-tiered Concert data model:
- **Scenes** (songs) containing **Sections** (song parts — Intro, Verse, Chorus).
- Each Scene carries a **Master Patch** trigger list (Program Change / Control Change events fired the instant the Scene loads) and per-Section MIDI event lists.
- **Dynamic Relative Ramping**: the engine eavesdrops on live outbound CC state and ramps from the parameter's *actual current value*, eliminating the jump artifact of naive fixed-to-fixed transitions. Ramps support Linear, Exponential, Logarithmic, and S-Curve interpolation, timed in Bars, Beats, or Seconds.

### 4. PerformanceHubViewModel

Drives the live-performance dashboard: real-time keyboard split visualization, per-Section countdown timers with a pulse-glow warning near the end of a Section, and the Master Patch View showing current program, tempo, and MIDI clock sync state — including the Panic control (CC120/CC121 across all active ports).

### 5. Capture Manager & Catalog

A librarian layer for parameter state:
- **Capture Engine** eavesdrops on an incoming bulk MIDI dump (e.g. a MainStage patch load) and turns it into a named, reusable snapshot.
- **Catalog** (`catalog.json`) and **Patch Library** (`patch-library.json`) store presets and reference patches as structured, shareable JSON.
- **Search & Find** provides multi-field filtering (genre, BPM, key, tags) plus batch edits across matched presets.
- **Mapping Converter** uses Apple's Vision OCR framework to turn screenshots of an existing DAW's assignment table directly into namespace mappings — no manual re-entry.

### 6. Legato Engine

Solves the classic "cut-off" problem of changing patches mid-chord: rather than an abrupt All-Notes-Off, the engine tracks active Note-On/Sustain state through a scene transition, keeps the old patch sounding until those notes are physically released, and only then cleans up the routing matrix.

---

## MIDI Routing System

### Profile-Based Routing

Global hardware profiles (e.g. a specific iPad + controller combination) are stored in `midi_routing.json` and switched from the Routing window's Profiles sidebar — a full rig reconfiguration without touching MainStage.

### Port Categories

| Category | Prefix / Marker | Behavior |
| --- | --- | --- |
| Performance ports | `BS_` | Notes, velocity, sustain — latency-critical, kept off the control pipeline entirely |
| Control / pipeline ports | — | CC, fader, and navigation traffic |
| Virtual (software) | `BStg_` | Created and named by MIDI Assistant, routed through the RoutingService |
| Intercepted (hardware) | — | Direct physical CoreMIDI device, routed into a virtual port |

### Event Processing Pipeline

```
1. Event received on physical/virtual port
           │
           ▼
2. Profile-specific filters (Pass / Block, per port)
           │
           ▼
3. Namespace resolution (Namespace tag → target parameter)
           │
           ▼
4. Jitter Lock Filter (suppress sub-threshold noise) + Soft Takeover (if enabled)
           │
           ▼
5. Forward to destination port(s), or to internal engine state ("Internal Automation")
```

---

## Synchronization Model

### External Sync

When an incoming MIDI Time Clock signal is detected on the configured clock source, the Performance Hub locks its tempo display and Section timers to it in real time.

### Dynamic Relative Ramping (internal sync for transitions)

Independent of external clock sync, ramp durations expressed in **Bars** or **Beats** follow the active Scene's own BPM, so a musically-timed transition keeps its length if the tempo changes; **Seconds** is available for fixed-duration transitions.

---

## Data Model

Concerts are stored as structured JSON under `data/concerts/`, with reusable presets and reference patches in `catalog.json` / `patch-library.json`. Supported event types per Section include:

- `note_on` / `note_off`
- `control_change`
- `program_change`
- `sysex`
- `parameter_ramp` (Dynamic Relative Ramp — modeled as a Control Change app-wide, so it participates in every category-driven feature exactly like a fixed CC value)

---

## Distribution

- **Mac app + AUv3 plugins**: distributed via TestFlight ahead of Mac App Store release. Requires macOS 13 (Ventura) or later. The AUv3 plugin runs as a Host FX insert inside MainStage (or any AUv3 host), backed by a lock-free C++ DSP kernel with no audio-thread heap allocation, for real-time-safe operation.
- **iPad Remote**: distributed via TestFlight, connects to the Mac app over the local network (UDP). Requires the Mac app to be running as the session host.

---

## Known Limitations

1. **Sandboxed networking**: as a Mac App Store–sandboxed application, MIDI Assistant requires explicit local-network permission on first launch for UDP sync between the Mac, iPad Remote, and AUv3 plugin.
2. **"Screen Follows Fader Touch" is Mac-only**: on the iPad, a fader's body always sets a value and never reveals or changes the active SubScreen — this is deliberate, to keep a live touch from ever having a side effect beyond the value, but it means the Mac and iPad don't behave identically here.
3. **SubScreen Layout Lock rollout is incomplete**: most SubScreens still auto-size to their contents rather than using the newer fixed-frame Layout Lock; both approaches are supported today.
4. **JavaScript DSP inserts**: a script that fails to compile is skipped rather than blocking the chain, which can shift later inserts out of alignment with their intended controls.

---

## Roadmap

- Expanded Layout Lock coverage across remaining SubScreens.
- In-app contextual Help popovers, sourced from the same documentation set as this overview.
- Additional non-linear ramp curve shapes.
- Continued platform testing across iPadOS versions for the Remote.
