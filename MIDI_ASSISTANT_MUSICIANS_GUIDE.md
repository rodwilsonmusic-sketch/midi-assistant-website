# MIDI Assistant: A Musician's Guide

## What Is MIDI Assistant?

**MIDI Assistant** is your backstage helper for Apple MainStage — a Mac app, an AUv3 plugin, and a companion iPad Remote that work together to give you superpowers MainStage doesn't have on its own:

- **Complex MIDI automation** — fire sequences of MIDI events with a single button press
- **A real Mixer Console** — a dedicated, fully customizable fader-and-matrix control surface for your whole rig
- **Smart routing** — route and rename MIDI between controllers without rewiring anything in MainStage
- **A live performance surface** — run the whole show from an iPad, in perfect sync with the Mac

---

## The Three Pieces

| Piece | What it's for |
| --- | --- |
| **MIDI Assistant (Mac app)** | Where you build your rig: the Mixer, the Concert Editor, MIDI Routing, and Capture/Catalog tools. |
| **AUv3 plugin (MidiAssistant Enhanced)** | Sits on each MainStage channel strip MIDI Assistant plays. In **Host FX** mode MIDI Assistant's processing runs inside the plugin, sample-accurate, alongside your instruments; in **App** mode the Mac app does the processing. |
| **iPad Remote** | The surface you actually touch on stage — four interchangeable layouts, always in sync with the Mac. |

---

## What's New in 0.3.3

| | What changed |
| --- | --- |
| 🥁 **Tap, enter and override a tempo** | A tempo cluster on the Mac and iPad Mixer: tap a tempo, or hold the pad to type or dial an exact one, then **OVERRIDE** plays it in place of the Scenes' tempos. While one plays, line up the next with **TAKE**. See **Tempo on the Fly**. |
| 🎛️ **Launch Control XL drives the Mixer** | The XL's **User 8** template moves the Mixer's faders, knobs and Matrix with soft pickup, its lights follow the app, and a two-button push opens a fader's Sub-Screen. See **Hardware Controllers**. |
| 🎚️ **Korg nanoKONTROL2 too** | The nanoKONTROL2 drives the Mixer the same way: **S** opens a fader's Sub-Screen with one press, the transport buttons browse, focus and step layers, and its lights show what each button does. **Use this controller** in Controller Masks switches between the XL and the nano at once, no restart. See **Hardware Controllers**. |
| 🗺️ **Controller Masks** | **Tools → Controller Masks...** shows what every controller control does on each Sub-Screen and lets you change it, drawn with the controller's own rows: one **Job** button (such as *Enable*) for every plugin, SOLO layers for rehearsal, an optional Top row on the XL, and Main Mixer layers saved with the concert. |
| 📄 **Page buttons** | On Mainstage Pads, Mainstage Synths and InstrGroup, a button can show a slot's page: map it to the slot fader (M1 → Sampler) and the press shows that page. A **▸** watermark marks it. |
| 🎹 **Drone keys from buttons** | **+Oct**, **−Oct** and **ALL CLEAR** on any free button, always lit, with their watermarks just above the keyboard. |
| ↕️ **Reposition** | Knob stuck at its end stop? Press **Bottom 7 + 8** on the XL (**R7 + R8** on the nano), move it where you want; nothing is sent, and it picks up again with no jump. |
| 👀 **Look, don't leap** | Tap **MUTE** to browse Scenes and Sections without moving the song; tap it again to jump once. |
| 📚 **One name, one Scene in the Catalog** | Pushing a Scene whose name is already in the Catalog asks to **Replace**, and **Refresh from Catalog…** brings the Catalog's copy back. Every prompt warns before an older copy replaces a newer one. |
| ⚠️ **Duplicate events shown** | The event list flags a Section that sets the same control twice (red when the values fight). Saving a capture into a Section asks before adding a second event for the same control. |
| 🔌 **Start in any order** | Each plugin gets its settings a few seconds after MainStage loads it, so starting MainStage after MIDI Assistant no longer needs Restart UDP. |
| 🎹 **Redirect is for keyboards** | The Hardware Redirector lists only keyboards and asks before redirecting. Your MIDI Routing always decides which controllers feed its ports; a concert can no longer cut one off. |
| 🧩 **One plugin** | **MidiAssistant Enhanced** is the only AUv3 plugin. Replace any "MidiAssistant Standard" left in a MainStage concert with Enhanced. |
| 📦 **Concert Pack 1.4** | An updated MainStage concert and example concert, the XL's **User 8** template beside User 2, and the controller file for the XL and the nanoKONTROL2. **Help → Export MainStage Concert Pack…** exports the pack and offers to install the example concert and the controller file; the templates go into the XL with Novation Components. |

## New in 0.3.2

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

**The problem:** changing from your verse sound to your chorus sound means hitting multiple buttons, changing patch, adjusting volume faders, and hoping you time it right.

**The solution:** tap a single Section button — on the Mac or the iPad Remote — and MIDI Assistant fires the whole cued sequence: program changes, fader ramps, patch swaps, all at once.

### 2. Tempo-Synced Transitions

**The problem:** you want a filter sweep or volume fade that takes exactly 2 bars, every time, regardless of tempo — and you don't want it to jump when it starts.

**The solution:** convert a fader event to a **Dynamic Ramp**. MIDI Assistant reads the *actual current value* of the parameter and ramps smoothly from there to your target, timed in Bars, Beats, or Seconds, using Linear, Exponential, Logarithmic, or S-Curve shaping. No jump, no manual retiming when the tempo changes.

### 3. Controller Name Freedom

**The problem:** MainStage knows your controller as "Network Session 1" or "Launch Control XL" and you can't rename it. Your mapping list becomes confusing.

**The solution:** MIDI Assistant creates a virtual port with any name you want and routes your controller through it via a **Namespace** — a logical tag like `Lead Synth` instead of a raw channel number. Swap the physical keyboard later, and you re-point one Namespace instead of hunting down every mapping.

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

- **One name, one Scene.** The Catalog keeps one Scene per name. Pushing a Scene whose name is already in the Catalog asks to **Replace** it (or Cancel) instead of adding a second copy.
- **Push All…** adds every NEW Scene, then lists each CHANGED Scene with both dates so you can choose **Replace** (overwrite the Catalog's copy) or **Skip** (the default). A Scene you renamed in the concert also offers **Save as New**. To keep both versions of any other Scene, Skip it here and use **Save as New Scene…** on its right-click menu. Master Patches whose Multis differ are listed too, with Replace or Skip.
- Right-click a Scene to push just that one; the menu says what will happen (**Push to Catalog (New)**, **Replace in Catalog**, or **Catalog Is Up to Date**). The same menu has **Refresh from Catalog…**, which brings the Catalog's copy into your concert (your concert keeps its own Master Patch), and **Save as New Scene…**, which needs a name not already in the Catalog.
- The Library and the inspector show when each copy was last edited and which is newer, and every prompt warns before an older copy replaces a newer one.
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

### 🎛️ Fine Moves on Hardware Knobs

Knobs with end stops, like those on the Launch Control XL Mk2, cover the full MIDI range of **128 values (0–127)** in less than one full turn, so each value is only a few degrees of travel. Two things follow:

- **A slow, small turn changes the value 1 point at a time.** That is already the finest step MIDI allows, so fine-tuning is a matter of moving slowly and watching the value on the Mac or iPad.
- **A fast turn can skip values.** The knob reports where it is, not every value in between. That is normal, and it is what makes a quick sweep feel quick.

MIDI Assistant does not speed up or slow down your knob movements automatically, the way a computer mouse does. A mouse can do that because you can lift it and put it down again. A knob with end stops can't be lifted, so if the app scaled your movement, the knob would reach its end stop before the value reached its end.

### 🥁 Tempo on the Fly: Tap, Enter, Override

The band leader calls a medley, or the drummer pushes the tempo, and the song needs a tempo that isn't the one saved in its Scene. The **tempo cluster**, at the right of the Matrix on the Mac Mixer and the iPad's Mixer layout, gives you that tempo for as long as you need it. **It never changes your Scenes.**

**Nothing plays until you press OVERRIDE.** Tapping or entering a tempo only gets it ready. The pad's colour tells you where you are: **white** = the Scene's tempo, **amber** = a tempo waiting (not playing yet), **green** = your tempo is playing.

- **Tap it.** Tap the pad in time. A tempo appears after three taps, so a stray touch changes nothing. If you don't use it within 30 seconds, it goes away.
- **Enter it.** When you know the number, **press and hold** the pad. On the iPad a keypad opens (decimals allowed, no computer keyboard needed); on the Mac, a number field. With a Launch Control XL, the **right-most knob of the bottom row** dials it, 1 BPM per click (2 per click on a big turn). A short tap on the pad, or **SET**, keeps the number; **CLEAR TAP** or **CANCEL** discards it.
- **Play it.** **OVERRIDE** always says what it will do: **PLAY 96** plays a waiting tempo; **ON** means your tempo is playing, and pressing it returns to the Scene's tempo at once.
- **Keep it, or not.** **FROZEN** (the default) keeps your tempo through every song change until you turn OVERRIDE off; the pad flashes briefly at each song change to remind you. **UNTIL NEXT SCENE** lets it go at the next song. **HOLD** keeps a waiting tempo ready without playing it.
- **Line up the next one (TAKE).** While your tempo is playing, enter another one: it waits as **NEXT 124**, and OVERRIDE reads **TAKE 124**. In FROZEN it plays when you press TAKE, on cue. In UNTIL NEXT SCENE it plays by itself when the next song starts. Changed your mind? One press of **CLEAR TAP** drops it.
- **Put it under your hands.** Any Matrix button, and through Controller Masks any Launch Control XL button, can be a Tap Tempo, Tempo Override, Hold / Frozen, Clear Tap or Clock button (Control Editor → Magic Wand → **Transport**). Holding a mapped Tap Tempo button opens Tempo Entry too, and on the XL the Override button flashes when a tempo is waiting.

MainStage follows the new tempo through MIDI clock. Set MainStage to follow external clock, choose the port in **Settings → Clock → Clock Output Port**, and press **CLOCK** so it reads **RUNNING**.

### 👀 Look, Don't Leap

Want to check what's coming without moving the song? Tap **MUTE** (on the Mixer's mode strip, Mac or iPad, or on the Launch Control XL). The arrows now move an orange **LOOK** highlight, and the Mac and iPad show the highlighted Scene with all its Sections. Tap **MUTE** again to jump there, once. **DEVICE**, or 30 seconds without a press, cancels. Your foot pedal keeps working while you look.

### 🎛️ Hardware Controllers

A Novation Launch Control XL or a Korg nanoKONTROL2 can drive MIDI Assistant's Mixer directly, with lights that follow
the app. Pick the one you use in **Tools → Controller Masks...** → **Use this controller** (the other is parked; switching
needs no restart).

**The Launch Control XL**

- **Two templates, two jobs.** **User 8** belongs to MIDI Assistant. **User 2** goes straight to MainStage, as before. The Concert Pack's MIDI Assistant example concert switches the XL to User 8 when it opens.
- **Set up once:** send the Concert Pack's **User 8** template to the XL with Novation Components. Then let **Help → Export MainStage Concert Pack…** install the XL's controller file, and relaunch MIDI Assistant. Start from the Pack's example concert (or **Save As** from it): it holds the XL's Main Mixer layout.
- **On the Main Mixer:** faders, knobs and the two button rows move the Mixer's faders, knobs and Matrix. The arrows change Scene and Section. Controls pick up smoothly, without jumping a value. Lights: bright = on, dim = off, dark = does nothing here.
- **Sub-Screens:** press a column's **Top and Bottom** buttons together to open that fader's Sub-Screen, and again for its next one. The knobs and buttons then drive that screen. **DEVICE** switches between the screen and the Main Mixer. **SOLO** steps through the screen's extra layers.
- **Keep live controls on the first layer.** SOLO layers are for rehearsal changes and building. If you run out of buttons for a live part, open the **Top row** in Controller Masks instead.
- **Controller Masks** (**Tools → Controller Masks...**) shows what every XL control does on each Sub-Screen and lets you change it. The easiest kind of assignment is a **Job**, such as *Plugin Enable*: one button that switches the plugin on or off on whichever plugin's screen is open.
- **Reposition:** a knob at its end stop with nowhere to go? Press **Bottom 7 + 8** together; they flash. Move the knob where you want it: nothing is sent. About a second after you stop, it picks up again from there, without a jump.

**The nanoKONTROL2**

- **Set up once:** keep the nano's factory layout, and in the **KORG KONTROL Editor** set **LED Mode = External** (Browse → Common), then Write Scene Data, so the app lights its buttons. Then tick **Use this controller** for it.
- **S** opens a fader's Sub-Screen with one press. **Play** switches between the screen and the Main Mixer, **◀◀ / ▶▶** step the layers back and forward, **Cycle** browses ("Look, don't leap"; **Stop** cancels), **Track** and **Marker** change Scene and Section, and **R7 + R8** is Reposition.
- Lights are on or off: a lit S / M / R button does something on this screen; **S** shows where you are.

**Both**

- **Watermarks** on the Mac and iPad show which controller control drives each control. The **eye** cycles Off → Faint → Clear (clear for building).
- **Page buttons:** on screens that change page from their faders (Mainstage Pads), map a button to the slot fader and its press shows that page. The lit button is the page showing; a **▸** watermark marks it.
- **Drone keys:** put **+Oct**, **−Oct** and **ALL CLEAR** on free buttons; they stay lit, and their watermarks sit just above the keyboard.

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
2. **MainStage**, with the **MidiAssistant Enhanced** AUv3 plugin on each channel strip MIDI Assistant plays (the Concert Pack's MainStage concert is set up this way)
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

- **Slide** to move a fader. A **tap or double-tap** on a fader never changes its value — it only selects the fader (yellow label) for the nudge buttons. The nudge buttons sit behind the switch at the top of the mode strip: **+ / −** shows them, **MODES** goes back to DEVICE / MUTE / SOLO (it also goes back by itself after 10 seconds).
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

### 7. Change Heavy Effect Presets in Three Quick Steps

Changing presets on a heavy effect plug-in, such as the BigSky reverb, while it is running can make MainStage show a **System Overload**. To avoid that, give the Section three events, each with its own **Delay Offset** (in the Event Editor):

| Delay Offset | Event |
|---|---|
| 0 ms | Turn the plug-in **off** (its Enabled / bypass control) |
| 10–20 ms later | Send the **preset change** |
| 10–20 ms after that | Turn the plug-in back **on** |

For example: off at 0 ms, preset at 20 ms, on at 40 ms. The whole change is over within about 60 ms, too quickly to hear, and MainStage shows no overload.

**Save the MainStage patch with the plug-in disabled.** Loading the concert then doesn't load the heavy plug-in in its running state. Your Section events switch it on when the song needs it.

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

### "MainStage shows a System Overload when a Section changes a BigSky preset"

- The preset changed while the plug-in was running. Turn the plug-in off, change the preset, then turn it back on, 10–20 ms apart (see **Tips from the Stage → 7**). Also save the MainStage patch with the plug-in disabled.

### "MainStage says *Plug-in may cause audio delay* every time the concert loads"

- This appears when **P-Shift** is enabled in the MainStage concert. It reports a delay of about 80 ms. You can generally ignore the message, but whether that delay is acceptable is your call.

### "The Launch Control XL does nothing in MIDI Assistant"

- Check the XL is on its **User 8** template (the Pack's MIDI Assistant example concert selects it when it opens).
- The XL's controller file must be installed (**Help → Export MainStage Concert Pack…** → Install), and MIDI Assistant relaunched afterwards.
- On the Main Mixer, the concert must hold the XL layout: use the Pack's example concert or a concert saved from it.
- If you switched to the nanoKONTROL2 earlier, the XL is **parked**: **Tools → Controller Masks...** → Device: Launch Control XL → **Use this controller**.

### "The nanoKONTROL2 does nothing" / "its buttons stay dark"

- The nano ships **parked**: **Tools → Controller Masks...** → Device: nanoKONTROL2 → **Use this controller**. If it is not in the Device list, your controller file came from an older Concert Pack (XL only): export the Pack again and choose **Replace** for the controller file (yours is backed up first), then relaunch.
- It moves the Mixer but the buttons stay dark: **LED Mode = External** was not written to the nano (KORG KONTROL Editor → Browse → Common, then Write Scene Data). Dark buttons while MIDI Assistant is not running are expected.

### "A Performance Hub switch is greyed out" / "my controller isn't in the Redirect list"

- A channel that belongs to your MIDI Routing (for example USB Sync In) is switched on and off in the **MIDI Routing** window; in the Performance Hub its switch is read-only ("Set in Midi Routing: this port is part of the rig's wiring.").
- **Redirect** is for keyboards. A controller whose MIDI Routing ports are marked **Hide from Perf. Hub** (a Launch Control XL, a Lemur) is not listed, and only hardware ports are offered as targets.

### "MainStage says MidiAssistant Standard is unavailable"

- Since 0.3.3 only **MidiAssistant Enhanced** ships. Replace Standard with Enhanced on that channel strip. If MainStage still lists Standard, quit MainStage and open it again so it rescans its plug-ins.

### "I pressed OVERRIDE but MainStage's tempo didn't change"

- MainStage hears the new tempo only through MIDI clock. Check that **CLOCK** reads **RUNNING**, that **Settings → Clock → Clock Output Port** names the port MainStage listens on (a change there needs a relaunch), and that MainStage is set to follow external clock.
- If the pad is **amber**, the tempo is still waiting: OVERRIDE reads **PLAY** or **TAKE**, and a press plays it.

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
| **Override** | A value stored on a Scene that takes the place of its Master Patch's. (Not the same as **Tempo Override**.) |
| **Tempo Override** | A tempo from the tempo cluster that plays in place of the Scenes' saved tempos until you turn it off. It never changes a Scene. |
| **Tempo Entry** | Hold the tempo pad to type or dial an exact tempo instead of tapping it. |
| **TAKE** | What OVERRIDE reads while one tempo plays and the next one waits: press it to play the waiting tempo. |
| **Controller Masks** | What each Launch Control XL control does: on the Main Mixer (stored in the concert) and on each Sub-Screen (your rig's roles, edited in Tools → Controller Masks). |
| **Role / Job** | A role tells an XL knob or button which control to drive on a Sub-Screen. A **Job** is a role that works on every screen with that kind of control, such as *Plugin Enable*. |
| **SOLO layer** | An extra set of XL assignments for a Sub-Screen, reached with SOLO. For rehearsal and building; live controls stay on the first layer. |
| **Reposition** | Bottom 7 + 8 on the XL: move knobs and faders without sending anything, so they line up again. |
| **App mode / Host FX** | Where a Performance Hub channel's processing runs: in the Mac app (shown as **Hub Processing**) or in the plugin inside MainStage. |
| **Compress** | Scales every note's velocity into a Low–High range after the Velocity Curve. |

---

## Need Help?

- See the [Technical Overview](MIDI_ASSISTANT_TECHNICAL_OVERVIEW.md) for architecture details.
- Visit the [Support page](support.html) for common issues, or email **support@midiassistant.com**.

---

_Happy performing! 🎹🎸🎤_
