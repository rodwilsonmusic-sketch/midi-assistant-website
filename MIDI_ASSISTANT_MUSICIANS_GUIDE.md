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

## What's New in 0.3.2

| | What changed |
| --- | --- |
| 📚 **Catalog status at a glance** | The Setlist shows which Scenes are **NEW** (never saved to the Catalog) or **CHANGED** (different from the Catalog's copy), and **Push All…** saves them in one step. |
| 🎛️ **Multis on the Master Patch** | Set a Master Patch's Multis once and every Scene under it uses them — no more propagating to each new Scene. A Scene can still override. |
| 📱 **Restart UDP and Sync on the iPad** | The iPad Mixer's toolbar has both buttons, so you can bring the rig up without walking back to the Mac. |
| 👆 **Steadier iPad faders** | A tap or double-tap on a fader never moves it; slide your finger to move it. |
| 🎹 **MIDI channel control per instrument** | Each Performance Hub channel can listen to chosen keyboard channels and send them on another. |
| 🎚️ **Velocity Curve + Compress** | Shape how hard you play into the sound, and squeeze it into a range — now in Host FX too. |
| 👻 **Ghosts follow the Hub** | Ghost Controls mirroring Performance Hub settings (Input, velocity, processing mode, inserts) update live. |
| 🪟 **Sub-Screens open themselves** | A Scene or Section can open the right Sub-Screen on the iPad. |
| 🎶 **Held notes survive a mode switch** | Switching a channel between App mode and Host FX lets held chords ring until you release the keys. |

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

### 🎹 Multis Belong to the Master Patch

When a Mixer fader hosts a rack of instruments (for example an Omnisphere Multi), MIDI Assistant shows the names of what's loaded on that fader's Sub-Screen, so you **read instead of remember**.

- **Set them on the Master Patch.** In the Master Patch inspector, the **Multis** section has one picker per instrument fader. Every Scene under that Master Patch uses those Multis — including Scenes you add later.
- **A Scene can override.** The Scene inspector's **Contextual Plugin Multis** still works. Leave a fader on **Master Patch (…)** to follow the Master Patch; choose a Multi there to use it for that Scene only. The inspector marks a Scene value as **overrides Master Patch** or **own copy** (same value, but stored on the Scene, so it won't follow later Master Patch changes).
- **Older concerts** keep their Scene values until you choose otherwise. To hand a concert over to its Master Patch: set the Master Patch's Multis, then press **Clear Scene Overrides…** in the Master Patch inspector (one step for all faders), or pick **Master Patch (…)** in a Scene and use **Propagate to Match Master Patch** (one fader at a time). Both can be undone with ⌘Z.
- A crossed-out entry marked **no fader has this name** is left over from a renamed fader; press **Remove**.

### 📚 The Catalog

The **Catalog** is your library of Scenes, Master Patches and Presets, shared between concerts. Below **Concert Start-Up Settings** in the Setlist, a status line tells you how your setlist compares with it — for example *Catalog: 17 new · 16 changed* — and each Scene row shows a **NEW** or **CHANGED** badge (no badge means it's in sync).

- **Push All…** adds every NEW Scene, then lists each CHANGED Scene with both dates so you can choose **Replace** (overwrite the Catalog's copy), **Save as New** (keep the Catalog's copy; your concert switches to a new copy of the Scene), or **Skip** (the default). Master Patches whose Multis differ are listed too, with Replace or Skip.
- Right-click a Scene to push just that one; the menu says what will happen (**Push to Catalog (New)**, **Replace in Catalog**, or **Catalog Is Up to Date**).
- Every Catalog save keeps a backup copy first, in the `backups` folder of your data folder.
- Scenes remember when their content last changed. Scenes saved before 0.3.2 show *unknown* until you next edit them.

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

### 🎹 MIDI Channels and Velocity, per Instrument

Each channel in the **Performance Hub** has two small controls next to its key range:

- **Input** — which MIDI channels this instrument listens to. **Omni** listens to everything; switch it off to tick only the channels you want (handy for a keyboard that sends a layered split on channels 1 and 2). **Send on** moves a channel to another one on the way to the instrument. **Reset to Omni, Same** puts it back.
- **Velocity** — a **curve** (Linear, Soft 1–2, Hard 1–3, Fixed) followed by **Compress**, which scales every note into a Low–High range. Every note still plays and the shape of your dynamics is kept, only squeezed — useful when a sound is too jumpy for the room. Works in App mode and in Host FX.

Both can be changed from a Scene, a Section, a Preset or a Ghost Control, so a song can set its own touch.

### 🎼 The Legato Engine

Changing scenes mid-chord shouldn't cut your sustain dead. MIDI Assistant's Legato Engine keeps the old patch sounding until you actually release those notes, then cleans up automatically — no special playing technique required.

The same applies when you switch a channel between **App mode** (shown as **Hub Processing** in the Performance Hub) and **Host FX**: notes you're holding keep sounding until you lift the keys. Channels using a Priority (mono/legato) mode still release at the switch, for stability.

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

### Mixer toolbar: Restart UDP and Sync

The Mixer layout's toolbar has the same two rig buttons as the Mac Mixer:

- **SYNC** (tap) — pulls in the values MainStage announced when it loaded or changed patch, so every control on the Mac and iPad matches MainStage. It sends no MIDI.
- **RESTART UDP** (**press and hold** until the green fill completes) — restarts MIDI Assistant's routing engine and reconnects the plugins in MainStage. A quick tap only shows **HOLD**: on stage, a stray touch must never cut your sound. It shows **SENT** when it fires.

### Faders

- **Slide** to move a fader. A **tap or double-tap** on a fader never changes its value — it only selects the fader (yellow label) for the nudge buttons.
- **Double-tap the name label** under a fader to open its Sub-Screen; **press and hold** the label for the list of Sub-Screens.

### Sub-Screens that open themselves

A Scene can open a Sub-Screen on the iPad when it starts (**Auto-Open View** in the Scene inspector), and a Section can do the same with an **Open Sub-Screen (iPad)** event. You can always navigate away; nothing re-opens until the next Scene or event asks.

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

### 6. Glance at the Catalog Line Before You Close

If the Setlist says *Catalog: N new · M changed*, press **Push All…** before you leave — that's your library catching up with tonight's work.

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

### "The plugins stopped responding" / "a port went silent"

- Press **Restart UDP** — on the Mac Mixer, or hold it on the iPad Mixer's toolbar. It takes a second or two and does not change your concert.

### "The controls don't match MainStage after loading"

- Press **Sync** (Mac or iPad). MIDI Assistant deliberately holds MainStage's burst of values at load and patch changes; Sync applies them.

### "I set a Multi on the Master Patch but a Scene still shows the old one"

- That Scene has its own value, which overrides. In the Scene inspector pick **Master Patch (…)** for that fader, or press **Clear Scene Overrides…** in the Master Patch inspector.

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
| **Catalog** | Your library of Scenes, Master Patches and Presets, shared between concerts. |
| **Multi** | The named set of instruments loaded under one Mixer fader (e.g. an Omnisphere Multi). Set on the Master Patch; a Scene may override. |
| **Override** | A value stored on a Scene that takes the place of its Master Patch's. |
| **App mode / Host FX** | Where a Performance Hub channel's processing runs: in the Mac app (shown as **Hub Processing**) or in the plugin inside MainStage. |
| **Compress** | Scales every note's velocity into a Low–High range after the Velocity Curve. |

---

## Need Help?

- See the [Technical Overview](MIDI_ASSISTANT_TECHNICAL_OVERVIEW.md) for architecture details.
- Visit the [Support page](support.html) for common issues and to contact the developer.

---

_Happy performing! 🎹🎸🎤_
