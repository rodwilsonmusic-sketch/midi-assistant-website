# GUI Design Recommendations

**Date:** 2026-02-11
**Status:** For User Approval

---

## Executive Summary

The revised GUI uses a **three-window architecture** instead of a single monolithic window. This mirrors how professional music apps (MainStage, Logic Pro, Ableton) separate concerns: a primary workspace, utility windows, and a compact performance view.

---

## Window Architecture

### Window 1: Concert Editor (Primary)
> *The main workspace. Open when you launch the app.*

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [◀ Prev] [Next ▶]  [Mode: Edit ▼]  [🔴 ●]                              │
├───────────┬──────────────────────────────────────────────────────────────┤
│           │  SECTION BAR                                                │
│ SCENES    │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                │
│           │  │ Intro  │ │ Verse  │ │*Chorus*│ │ Bridge │                │
│ ▪ Intro   │  └────────┘ └────────┘ └────────┘ └────────┘                │
│   ●●●     ├──────────────────────────────────────────────────────────────┤
│           │  EVENT LIST                                                 │
│ ▪ Verse   │  Type  │ Ch │ CC# │ Val │ Delay │ Description    │ Port     │
│   ●●      │  ──────┼────┼─────┼─────┼───────┼────────────────┼──────────│
│           │ ► CC   │ 10 │  64 │ 127 │  0ms  │ Sustain Pedal  │ IAC 1    │
│ ▪ Chorus  │   CC   │ 10 │   7 │ 100 │ 10ms  │ Volume         │ IAC 1    │
│   ●       │   PC   │  1 │  42 │  -  │  0ms  │ Piano Preset   │ IAC 2    │
│           │                                                             │
├───────────┴──────────────────────────────────────────────────────────────┤
│ Inspector: [Type: CC ▼] [Ch: 10] [CC#: 64] [Val: 127]                  │
│ [Description: Sustain Pedal] [Port: IAC Bus 1 ▼]                        │
│ [+ Ramp ▼]            [Save] [Delete] [Duplicate]                       │
└──────────────────────────────────────────────────────────────────────────┘

LEGEND:
- Left: Scene list with section-count dots (●●● = 3 sections)
- Top: Section cards for selected Scene
- Center: Event spreadsheet for selected Section
- Bottom: Collapsible Inspector for selected Event
```

**My Recommendations:**

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| **Scene Sidebar** | Left panel with scene names + section dots | MainStage Patch List pattern; always visible for navigation |
| **Section Bar** | Always visible, horizontal | Sections are the primary editing unit; quick switching is essential |
| **Inspector** | Collapsible bottom panel | Follows Xcode/Logic pattern; `Cmd-I` toggle |
| **Event List** | SwiftUI `Table` (macOS 13+) | Native sortable columns, selection, keyboard nav |
| **Layout** | `NavigationSplitView` | Sidebar + Content is native SwiftUI; sidebar is collapsible |

---

### Window 2: Search & Find (Utility)
> *Toggle via `Cmd-F`. Floats above Concert Editor.*

```
┌─────────────────────────────────────────────┐
│ Search & Find                          [╳]  │
├─────────────────────────────────────────────┤
│ Scope: [● Concert ○ Catalog ○ Presets]      │
│ Port: [Any ▼]  Ch: [__]  Type: [Any ▼]     │
│ CC#/Note: [__]  Value: [__]  Desc: [____]   │
│                              [🔍 Search]     │
├─────────────────────────────────────────────┤
│ Results (42 events):                        │
│ Context        │ Type │ Ch │ Val │ Desc     │
│────────────────┼──────┼────┼─────┼──────────│
│ Scene:Intro/S1 │ CC   │ 10 │ 127 │ Sustain  │
│ Master:Piano   │ PC   │  1 │  42 │ Preset   │
│────────────────┴──────┴────┴─────┴──────────│
│ [Edit] [Delete] [Batch ▼]                   │
└─────────────────────────────────────────────┘
```

**My Recommendations:**

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| **Window Type** | Floating utility panel | Stays visible while editing; doesn't steal focus |
| **Scope** | Segmented: Concert / Catalog / Presets | Mirrors CLI `searchAndEditEvents` exactly |
| **Batch Ops** | In-window dropdown | Change Port, Channel, Enrich Descriptions, Delete All |
| **Priority** | Build last (Phase 4) | Most complex; CLI covers this well for now |

---

### Windows 3a & 3b: Performance View (Dual Window)
> *Toggle via `Cmd-P`. Two separate windows designed to sit alongside MainStage.*

**Window 3a: Scene Navigator (Vertical Sidebar)**
```
┌──────────────────────┐
│ Scenes          [╳]  │
├──────────────────────┤
│ ▪ Intro              │
│ ▪ Verse 1       ◄──  │  ← Current
│ ▪ Chorus             │
│ ▪ Bridge             │
│ ▪ Verse 2            │
│ ▪ Outro              │
├──────────────────────┤
│  BPM: 120  │  4/4    │
│  [■ Panic]            │
└──────────────────────┘
```
*Sits to the left or right of MainStage.*

**Window 3b: Section Strip (Horizontal Bar)**
```
┌────────────────────────────────────────────────────────────┐
│ Verse 1:  [S1: Intro] [*S2: Main*] [S3: Outro]   [Panic] │
└────────────────────────────────────────────────────────────┘
```
*Sits below MainStage as a thin strip.*

**My Recommendations:**

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| **Two Windows** | Yes, separate Scene + Section windows | Each can be positioned independently around MainStage |
| **Always-on-Top** | Optional toggle per window | Prevents MainStage from covering them |
| **Read-Only** | Yes, no editing controls | Safety during performance |
| **Scene Clicks** | Navigate to Scene (updates Section strip) | Active navigation |
| **Section Clicks** | Trigger section change | Active navigation during performance |
| **Difficulty** | Low — SwiftUI `Window` scenes are simple | Two small windows are easier than one complex configurable one |
| **Priority** | Build in Phase 9.4 | Simpler than Search; high user value |

---

## Recommended Build Order

| Phase | What | Why This Order |
|-------|------|----------------|
| **9.1** | Project Setup | Create `swift_ui/` package, link `MidiAssistantCore` |
| **9.2** | Concert Editor (Read-Only) | Core value: see your data visually |
| **9.3** | Concert Editor (Editing) | Add Inspector, Save, CRUD operations |
| **9.4** | Performance View | High user value, relatively simple |
| **9.5** | Search & Find Window | Most complex, CLI fallback exists |
| **9.6** | MIDI Monitor Window | Real-time capture view |

---

## Technical Decisions

| Question | Recommendation |
|----------|---------------|
| **Framework** | **Pure SwiftUI** (no AppKit needed) |
| **macOS Target** | **macOS 13+** (Ventura) for `Table`, `NavigationSplitView` |
| **State Management** | `ObservableObject` + `@Published` (macOS 13 compatible) |
| **Multi-Window** | SwiftUI `Window` scene type (macOS 13+) |
| **File I/O** | Reuse `ConcertManager` / `CatalogManager` from `MidiAssistantCore` |
| **Keyboard Shortcuts** | SwiftUI `.keyboardShortcut()` modifier |
| **Undo/Redo** | Built-in `UndoManager` integration |

---

## Key Design Principles

1. **Musician-First:** No unnecessary complexity. The UI should feel like an instrument, not an IDE.
2. **Non-Destructive:** Undo everywhere. Explicit Save. No auto-save without user consent.
3. **Coexistence:** Performance View must run alongside MainStage without fighting for screen space.
4. **CLI Parity:** Every operation available in the CLI should eventually be possible in the GUI (Search Window is the bridge).
