# MIDI Assistant: A Musician's Guide

## What Is MIDI Assistant?

**MIDI Assistant** is your backstage helper for Apple MainStage. It sits between your controllers (like Lemur on iPad or a Launch Control XL) and MainStage, giving you superpowers that MainStage doesn't have on its own:

- 🎹 **Complex MIDI Automation** – Send sequences of MIDI commands with a single button press
- ⏱️ **Perfect Timing** – Synchronize events to your master tempo for flawless transitions
- 🔀 **Smart Routing** – Route MIDI between controllers without rewiring anything in MainStage
- 📱 **Better Controller Integration** – Make any MIDI controller work exactly how you want

---

## Real-World Use Cases

### 1. One-Button Scene Changes

**The Problem:** Changing from your verse sound to your chorus sound requires hitting multiple buttons, changing patch, adjusting volume faders, and hoping you time it right.

**The Solution:** With MIDI Assistant, you map a single button on your iPad (via Lemur) to trigger a "Chorus" section. When you tap it:

- MainStage instantly receives the program change
- A volume fade-in for your strings starts automatically
- Synth pads crossfade to the new patch
- Everything happens perfectly on the next downbeat

### 2. Tempo-Synced Effects

**The Problem:** You want a filter sweep that takes exactly 2 bars, every time, regardless of your tempo.

**The Solution:** Define a `parameter_ramp` event:

```
Fade control #7 (volume) from 0 to 127 over 2 bars
```

MIDI Assistant calculates the exact timing based on your live tempo and executes it perfectly.

### 3. Controller Name Freedom

**The Problem:** MainStage knows your controller as "Network Session 1" or "Launch Control XL" and you can't rename it. Your mapping list becomes confusing.

**The Solution:** MIDI Assistant creates a virtual port with any name you want (like "Lemur Main" or "Pad Controller") and routes your controller through it. MainStage sees the friendly name you chose.

---

## How It Works (The Simple Version)

```
 Your Controllers          MIDI Assistant           MainStage
 ┌─────────────┐          ┌────────────┐          ┌──────────┐
 │   iPad      │   ───▶   │  Listens   │   ───▶   │ Receives │
 │  (Lemur)    │          │  Routes    │          │  Clean   │
 │             │   ◀───   │  Filters   │   ◀───   │  MIDI    │
 └─────────────┘          │  Triggers  │          └──────────┘
                          └────────────┘
```

1. **You tap a button** on Lemur (or any controller)
2. **MIDI Assistant receives the message** and decides what to do
3. **It sends the right commands** to MainStage at the perfect time
4. **MainStage responds** exactly as you've configured

---

## Key Features for Musicians

### 🎵 Patches & Sections

Think of **Patches** as songs and **Sections** as parts of a song (Intro, Verse, Chorus, etc.).

Each section can have its own MIDI events:

- Program changes to switch sounds
- Control changes to adjust parameters
- Even complex multi-step automations

### 🎛️ Presets

**Presets** are reusable configurations primarily used for effects plugins. Unlike patches (which represent entire songs), presets let you define and recall specific parameter settings for individual plugins or channel strips.

Use presets when you want to:

- Store your favorite reverb settings and recall them across multiple songs
- Define effect configurations that can be triggered independently
- See all the parameters for a plugin in one place and switch between saved states
- Share common settings between different patches without duplicating data

**Example:** You might have reverb presets like "Hall Large", "Plate Bright", and "Ambient Wash" that can be called from any patch in your concert.

### ⏰ Quantized Triggers

**"Next Measure" mode** ensures your transitions always land on the downbeat:

1. You tap the button anytime during a bar
2. MIDI Assistant waits for beat 1 of the next measure
3. Your change happens perfectly in time

### 🔧 Routing Profiles

Different gigs? Different setups? No problem.

Create multiple **routing profiles** for different scenarios:

- **"Club Gig"** – Minimal setup, just iPad
- **"Full Band"** – iPad + Launch Control XL + external MIDI keyboard
- **"Recording Session"** – All MIDI routed through IAC for DAW capture
- **"Spontaneous Worship / Free Flow"** – Enhanced MIDI control for improvisation sessions where sound color palettes must shift smoothly and dramatically

Switch profiles instantly without touching MainStage.

#### Deep Dive: Spontaneous Worship Profile

This advanced profile supports rich, layered orchestration with 5-6 Omnisphere channel strips plus arrays of other software synths—all hosted in MainStage automation patches. MIDI Assistant works in concert with MainStage Scripter plugins to enable intelligent note routing:

**Intelligent Note Distribution:**

- **Bass Channel Strips** – Only receive the lowest played notes for rich, foundational bass
- **Lead Channel Strips** – Only receive the highest notes for impactful leads and top-end sparkle
- **Pad/Texture Strips** – Handle mid-range notes for lush harmonic support

**Breakpoint Transposition:**

Some sounds become harsh when played too high, or muddy when played too low. MIDI Assistant controls _breakpoint thresholds_ that automatically transpose notes to keep each instrument in its optimal range:

> **Example:** Your strings sound shrill above C5. As the worship leader plays higher leads, MIDI Assistant signals the Scripter to transpose those notes down an octave—so the strings still contribute warmth instead of being muted entirely.

> **Example:** Your bass synth loses definition below E1. When the pianist plays low chord voicings, MIDI Assistant transposes the bass part up an octave to stay punchy and audible.

When you switch patches or sections, MIDI Assistant sends commands that update these breakpoints dynamically—allowing your sound palette to evolve throughout the worship flow without manual intervention.

---

## Setting Up for Your First Gig

### What You'll Need

1. **Your Mac** running MainStage
2. **MIDI Assistant** running in the background
3. **Your controllers** (Lemur, Launch Control XL, etc.)
4. **A few minutes** to set up your routing

### Quick Start

1. **Open MIDI Assistant** from Terminal:

   ```
   swift run MidiAssistant
   ```

2. **Verify your ports** are detected (you'll see a list of all MIDI inputs/outputs)

3. **Configure your routing** in the `midi_routing.json` file

4. **Open MainStage** and configure it to receive from the virtual ports MIDI Assistant creates

5. **Test with MIDISnoop** to make sure messages are flowing:
   ```
   swift run MIDISnoop
   ```

---

## A Day in the Life: Concert Workflow

### Before the Gig

1. **Create your concert JSON** with all patches and sections
2. **Define events** for each section transition
3. **Set your routing profile** for the venue

### During the Gig

1. **Launch MIDI Assistant** (or have it auto-launch)
2. **Open your MainStage concert**
3. **Control everything from your iPad** via Lemur OSC triggers
4. **Hit your section buttons** and let the magic happen

### After the Gig

1. **Save any new mappings** you want to keep
2. **Review the log files** if anything went wrong
3. **Update your concert file** for next time

---

## The Lemur Connection

MIDI Assistant works beautifully with **Lemur** on iPad:

- **OSC commands** trigger patches and sections
- **Bidirectional feedback** keeps your Lemur UI updated
- **Array messages** let you send batch commands efficiently

Example OSC message from Lemur:

```
/triggerSection patch_A01 2
```

This tells MIDI Assistant: "In patch A01, trigger section 2 (maybe the Chorus)."

---

## Understanding Your Configuration

Your setup lives in JSON files. Here's what matters:

### `config.json` – General Settings

- OSC port for Lemur communication
- Default MIDI ports
- Master clock port (`master_clock_port`)

### `midi_routing.json` – Port Routing

- Which controllers to intercept
- Virtual port names
- Routing profiles

### `patches.json` – Your Music

- Patches (songs) and sections
- BPM and meter per patch
- MIDI events for each section

---

## Tips from the Stage

### 1. Always Test Before the Gig

Run `MIDISnoop` while pressing buttons to verify everything is connected properly.

### 2. Use Descriptive Names

Name your sections "Intro", "Verse 1", "Chorus" – not "Section1", "Section2". Your future self will thank you.

### 3. Start Simple

Get basic routing working before adding complex automations. Build up your system gradually.

### 4. Keep Backups

Your JSON files are your setup. Keep them in version control (like the Git repo this project uses) so you can roll back if needed.

### 5. Quantize for Safety

If timing is critical, use `next_measure` quantization. It's like a safety net that ensures your transitions are always musical.

---

## Troubleshooting

### "I'm not seeing my controller"

- Check that IAC Driver is enabled in Audio MIDI Setup
- For network MIDI (Lemur), ensure the Network Session is configured
- Restart MIDI Assistant after connecting new devices

### "My messages aren't reaching MainStage"

- Run `MIDISnoop` to see if messages are being received
- Check that the virtual port is created (look in Audio MIDI Setup)
- Verify MainStage is configured to receive from the correct port

### "Timing feels wrong"

- Make sure you're using external sync if playing with a drummer/track
- Verify the `bpm` in your patch matches your actual tempo
- Check that `master_clock_port` is configured correctly

---

## Glossary

| Term             | Meaning                                                |
| ---------------- | ------------------------------------------------------ |
| **Patch**        | A song or piece in your set                            |
| **Section**      | A part of a patch (Intro, Verse, etc.)                 |
| **Preset**       | Saved plugin/effect settings that can be recalled      |
| **Virtual Port** | A MIDI port created by software, not hardware          |
| **OSC**          | Open Sound Control – how Lemur talks to MIDI Assistant |
| **Profile**      | A saved routing configuration for different setups     |
| **Quantize**     | Timing adjustment to align with musical beats          |
| **IAC Driver**   | macOS's Inter-Application Communication MIDI bus       |

---

## Need Help?

- Check the [Technical Overview](MIDI_ASSISTANT_TECHNICAL_OVERVIEW.md) for deeper details
- Review the [Command Reference](../swift_src/MIDI_TOOLS_COMMANDS.md) for all available tools
- Look at the project logs in `/logs/` for troubleshooting history

---

_Happy performing! 🎹🎸🎤_
