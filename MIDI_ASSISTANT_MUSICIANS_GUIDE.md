# MIDI Assistant: A Musician's Guide

## What Is MIDI Assistant?

**MIDI Assistant** is your backstage helper for Apple MainStage — a Mac app, an AUv3 plugin, and a companion iPad Remote that work together to give you superpowers MainStage doesn't have on its own:

- 🎹 **Complex MIDI Automation** – Fire sequences of MIDI events with a single button press
- 🎚️ **A Real Mixer Console** – A dedicated, fully customizable fader-and-matrix control surface for your whole rig
- 🔀 **Smart Routing** – Route and rename MIDI between controllers without rewiring anything in MainStage
- 📱 **A Live Performance Surface** – Run the whole show from an iPad, in perfect sync with the Mac

---

## The Three Pieces

| Piece | What it's for |
| --- | --- |
| **MIDI Assistant (Mac app)** | Where you build your rig: the Mixer, the Concert Editor, MIDI Routing, and Capture/Catalog tools. |
| **AUv3 Plugin (Host FX Mode)** | Loads directly into a MainStage channel strip so MIDI Assistant's processing runs alongside your instruments, sample-accurate, inside MainStage itself. |
| **iPad Remote** | The surface you actually touch on stage — four interchangeable layouts, always in sync with the Mac. |

---

## Real-World Use Cases

### 1. One-Button Scene Changes

**The Problem:** Changing from your verse sound to your chorus sound requires hitting multiple buttons, changing patch, adjusting volume faders, and hoping you time it right.

**The Solution:** Tap a single Section button — on the Mac or the iPad Remote — and MIDI Assistant fires the whole cued sequence: program changes, fader ramps, patch swaps, all at once.

### 2. Tempo-Synced Transitions

**The Problem:** You want a filter sweep or volume fade that takes exactly 2 bars, every time, regardless of tempo — and you don't want it to jump when it starts.

**The Solution:** Convert a fader event to a **Dynamic Ramp**. MIDI Assistant reads the *actual current value* of the parameter and ramps smoothly from there to your target, timed in Bars, Beats, or Seconds, using Linear, Exponential, Logarithmic, or S-Curve shaping. No jump, no manual retiming when the tempo changes.

### 3. Controller Name Freedom

**The Problem:** MainStage knows your controller as "Network Session 1" or "Launch Control XL" and you can't rename it. Your mapping list becomes confusing.

**The Solution:** MIDI Assistant creates a virtual port with any name you want and routes your controller through it via a **Namespace** — a logical tag like `Lead Synth` instead of a raw channel number. Swap the physical keyboard later, and you re-point one Namespace instead of hunting down every mapping.

---

## Key Concepts

### 🎵 Scenes, Sections & Master Patches

Think of a **Scene** as a song, and its **Sections** as the parts of that song (Intro, Verse, Chorus, etc.). Each Scene also carries a **Master Patch** — the actual MainStage or external-synth program it loads — plus its own list of MIDI events per Section.

### 🎛️ Presets

**Presets** are reusable event bundles, most often used for plugin/effect settings. Unlike a Scene (a whole song), a Preset is a portable chunk you can drop into any Section.

- Store your favorite reverb settings and recall them across multiple songs
- Trigger a Preset independently, or attach it to a button's ON/OFF actions
- Right-click a Preset in the Concert Editor and choose **Add to Current Section** to copy its events straight into the Section you're working on

### 🖥️ The Mixer & SubScreens

The **Mixer Console** is your main control deck — faders, a button matrix, and top/side utility buttons, all built dynamically from your Concert. When a rig has more depth than fits on one screen (32 Omnisphere matrix buttons, 40 organ drawbars), that complexity lives in a **SubScreen** — its own isolated control surface, reachable by pressing and holding (or right-clicking) a fader's name label.

Need quick access to one deeply-nested SubScreen control without leaving the main Mixer? Create a **Ghost Control** — a lightweight reference that mirrors the original control's value, label, and behavior automatically.

### 🎯 Radio Groups & Momentary Buttons

Buttons default to **Toggle** (latching) behavior. Flip a button to **Momentary** for stutter effects or drum-pad style hits that only fire while held. Give several buttons the same **Radio Group**, and pressing one automatically turns the others off — perfect for "only one patch active at a time" selections.

### 🎚️ Soft Takeover

Moving a scene to a new state can leave a physical (non-motorized) fader pointing at the wrong value. **Soft Takeover** prevents the jump: in **Pickup** mode the fader has to physically cross the current value before it takes control again; in **Proportional** mode it scales your movement so it catches up smoothly instead.

### 🎼 The Legato Engine

Changing scenes mid-chord shouldn't cut your sustain dead. MIDI Assistant's Legato Engine keeps the old patch sounding until you actually release those notes, then cleans up automatically — no special playing technique required.

---

## Setting Up for Your First Gig

### What You'll Need

1. **MIDI Assistant** installed on your Mac (macOS 13 or later)
2. **MainStage**, with the MIDI Assistant AUv3 plugin loaded on a channel strip (Host FX Mode) if you want sample-accurate in-host control
3. **MIDI Assistant Remote** on your iPad, on the same local network as your Mac
4. **Your controllers** (Lemur, Launch Control XL, hardware keyboards, etc.)

### Quick Start

1. **Open MIDI Assistant** on your Mac.
2. **Open the MIDI Routing window** and set up your virtual ports and hardware interceptions — this is where physical controllers get routed and (optionally) renamed via Namespaces.
3. **Open MIDI Assistant Remote** on your iPad; it connects to the Mac automatically over your local network.
4. **Build your first Concert** in the Concert Editor: add a Scene, rename `Section 1` to something real (`Intro`), and set a Master Patch trigger so the right sound loads with it.
5. **Switch to the Performance Hub** (Mac) or the Remote's **Full (Stage)** or **Mixer (LaunchCtrl)** layout to run the show live.

---

## The iPad Remote: Four Ways to Look at the Same Show

Switch layouts from the toolbar's mode menu — no reconnecting, no lost state:

| Mode | Use it when… |
| --- | --- |
| **Compact (Lemur)** | You want the smallest footprint alongside other apps. |
| **Full (Stage)** | The iPad *is* the show — big touch targets, big labels. |
| **Setlist Only** | You just need to pick the next song. |
| **Mixer (LaunchCtrl)** | You want the fader-grid mixer, iPad-side. |

Tap a Section pill to jump straight to it. Tap the Scene name for a menu of every Scene and Section — a direct jump from anywhere to anywhere. If a Section has a duration, tap its progress bar to pause or resume the countdown.

---

## A Day in the Life: Concert Workflow

### Before the Gig

1. **Build or update your Concert** in the Concert Editor — Scenes, Sections, Master Patch triggers.
2. **Dial in your rig's routing profile** for the venue (a simple solo setup vs. a full band rig with multiple controllers).
3. **Use Ad-Hoc Capture** to grab a perfect soundcheck balance straight into a Section, instead of hand-typing every fader value.

### During the Gig

1. **Launch MIDI Assistant** on the Mac; open MainStage.
2. **Run the show from the Performance Hub** (Mac) or the **iPad Remote** — whichever surface you're actually standing behind.
3. **Hit your Section buttons** and let the Legato Engine, Dynamic Ramps, and Soft Takeover handle the details.

### After the Gig

1. **Save any on-the-fly Ad-Hoc Presets** you want to keep.
2. **Review anything that felt off** — a Section that ran long, a fader that jumped — and adjust.

---

## Tips from the Stage

### 1. Always Test Before the Gig

Play through your setlist end to end with the actual rig connected, not just on the bench.

### 2. Use Descriptive Names

Name your Sections "Intro", "Verse 1", "Chorus" — not "Section 1", "Section 2". Your future self will thank you.

### 3. Start Simple

Get basic routing and one Scene working before layering on Ramps, Ghost Controls, and SubScreens. Build up gradually.

### 4. Capture Instead of Retyping

If a mix sounds perfect at soundcheck, use **Snapshot → Save Ad-Hoc Preset** rather than hand-entering thirty CC values.

### 5. Lean on Dynamic Ramps for Safety

A ramp always starts from the fader's *real* current position — it can't jump, even if the previous Section left things in an unexpected state.

---

## Troubleshooting

### "My iPad isn't syncing with the Mac"

- Confirm both devices are on the same local Wi-Fi network (or a stable wired/ad-hoc connection).
- Check macOS's local-network permission prompt for MIDI Assistant hasn't been dismissed as Deny.

### "My hardware fader jumped when I changed scenes"

- Turn on **Soft Takeover** for that port in the MIDI Routing window, and pick Pickup or Proportional depending on feel.

### "A fader feels noisy or twitchy when I'm not touching it"

- That's electrical jitter from the analog control. The **Jitter Lock Filter** handles this automatically, but check the port's routing settings if it still seems too sensitive or too sluggish.

### "Host FX Mode in MainStage isn't responding"

- Confirm the AUv3 plugin is loaded on the correct channel strip and that its Processing Mode is set to **Host FX** rather than **Hub Processing** in the Performance Hub.

---

## Glossary

| Term | Meaning |
| --- | --- |
| **Concert** | Your full setlist — every Scene, Section, and mapping for a show. |
| **Scene** | A song in your setlist. |
| **Section** | A part of a Scene (Intro, Verse, Chorus, etc.). |
| **Master Patch** | The actual MainStage/external-synth program a Scene loads. |
| **Preset** | A reusable, saved bundle of MIDI events. |
| **Namespace** | A logical tag standing in for a hardware channel, so mappings survive a gear swap. |
| **SubScreen** | An isolated control surface for a deep instrument's parameters. |
| **Ghost Control** | A lightweight reference that mirrors another control's value on the main Mixer. |
| **Radio Group** | A set of buttons where turning one on turns the others off. |
| **Dynamic Ramp** | A smooth, jump-free transition from a parameter's live value to a target. |
| **Soft Takeover** | Prevents a physical fader from causing a value jump after a scene change. |
| **Legato Engine** | Keeps a sustained chord alive across a scene change until it's released. |

---

## Need Help?

- See the [Technical Overview](MIDI_ASSISTANT_TECHNICAL_OVERVIEW.md) for architecture details.
- Visit the [Support page](support.html) for common issues and to contact the developer.

---

_Happy performing! 🎹🎸🎤_
