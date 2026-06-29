# GUI Concert Builder - Design Exploration

## Vision

A MainStage-inspired macOS desktop application for building and editing Concerts with:
- **Left Sidebar:** Scene/Section list in concert order (like MainStage's Patch List)
- **Center Grid:** Assignments and Mappings visualization
- **Bottom Panel:** MIDI Event editor for selected items

## Concept Mockup

![MIDI Concert Builder Mockup](/Users/rodney_wilson/.gemini/antigravity/brain/f54ff6ca-6814-47f7-8591-7544c7cb0387/mainstage_inspired_mockup_1769656007783.png)

---

## Technology Stack Options

### Option 1: SwiftUI (Recommended) ✅

**Pros:**
- Modern, declarative UI framework
- Excellent for macOS desktop apps
- Native look and feel
- Reuses your existing Swift models directly
- Live previews in Xcode
- Less code than AppKit

**Cons:**
- macOS 11+ required (Big Sur)
- Some advanced features need AppKit bridging

### Option 2: AppKit

**Pros:**
- Full control, all macOS features
- Works on older macOS versions

**Cons:**
- More verbose, imperative code
- Steeper learning curve
- Slower development

### Option 3: SwiftUI + AppKit Hybrid

**Pros:**
- Best of both worlds
- Use SwiftUI for most UI, AppKit for complex interactions

---

## Recommended Architecture (Revised for UI Layout)

```
┌─────────────────────────────────────────────────────────────┐
│                    MidiAssistantApp                         │
│                    (SwiftUI App)                            │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────────────────────────────────┐  │
│  │  Scene    │  │        Section Bar (horizontal)       │  │
│  │  Sidebar  │  │  - Icon + Name cards for Sections     │  │
│  │  ─────────│  │  - Highlights active Section          │  │
│  │  - Scene  │  ├───────────────────────────────────────┤  │
│  │    icons  │  │        Event List (table/spreadsheet) │  │
│  │  - Section│  │  - Type, Channel, CC#, Value, Delay   │  │
│  │    count  │  │  - Description, Port columns          │  │
│  │    dots   │  │  - Row selection                      │  │
│  └───────────┘  └───────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┤
│  │              Event Editor Panel (bottom)                │
│  │  - Edit MIDI type, channel, control, value, delay      │
│  │  - Description, port, ramp options                      │
│  │  - Save / Delete / Duplicate actions                   │
│  └─────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

---

## Code Reuse Strategy

### ✅ Reuse Existing Code (No Changes)

| Component | Location | Usage |
|-----------|----------|-------|
| `Concert` model | `Models/Concert.swift` | Direct use in SwiftUI views |
| `Scene` model | `Models/Scene.swift` | Direct use |
| `Event` model | `Models/Event.swift` | Direct use |
| `ConfigManager` | `ConfigManager.swift` | Singleton access |
| `ConcertManager` | `ConcertManager.swift` | Data operations |
| `MappingService` | `MappingService.swift` | Event enrichment |

### 🔧 Create New SwiftUI Layer

```swift
// New package structure
swift_ui/
├── Package.swift
├── Sources/
│   └── MidiAssistantUI/
│       ├── App/
│       │   └── MidiAssistantApp.swift
│       ├── Views/
│       │   ├── MainWindow.swift
│       │   ├── SceneSidebar.swift
│       │   ├── AssignmentGrid.swift
│       │   ├── EventEditor.swift
│       │   └── MidiMonitorView.swift    // MIDI Monitor/Capture view
│       └── ViewModels/
│           ├── ConcertViewModel.swift
│           └── SceneViewModel.swift
```

---

## User Feedback & Layout Ideas

> **Note from Rodney:** "I have some Layout Ideas I will try to mockup to add for reference"

**Pending user mockups to incorporate into design.**

### Additional View Requested: MIDI Monitor/Capture

The GUI should include a **MIDI Monitor/Capture** view that allows:
- Real-time display of incoming MIDI messages
- Capture mode to record events for assignment
- Filter by port, channel, or message type
- Integration with existing `CaptureManager` functionality

---

## Key SwiftUI Patterns

### 1. NavigationSplitView (macOS 13+)

```swift
NavigationSplitView {
    // Sidebar: Scene list
    SceneSidebar(concert: concert)
} content: {
    // Middle: Assignments grid
    AssignmentGrid(scene: selectedScene)
} detail: {
    // Right: Optional inspector
    EventInspector(event: selectedEvent)
}
```

### 2. Observable Pattern (Swift 5.9+)

```swift
@Observable
class ConcertViewModel {
    var concert: Concert?
    var selectedSceneIndex: Int?
    var selectedEvent: Event?
    
    func loadConcert(from url: URL) { ... }
    func saveEvent(_ event: Event) { ... }
}
```

### 3. MainStage-Style Grid

```swift
struct AssignmentGrid: View {
    let scene: Scene
    
    var body: some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 12) {
            ForEach(scene.sections.values) { section in
                SectionCard(section: section)
            }
        }
    }
}
```

---

## Revised UI Layout (Based on User Feedback)

The primary screen for the **Building Concert Phase** uses a streamlined layout:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Toolbar: File, Edit, Concert Name ▼, ◀Prev | Next▶, View Controls]    │
├───────────┬─────────────────────────────────────────────────────────────┤
│           │  SECTION BAR (for selected Scene)                          │
│ SCENES    │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│           │  │ 🎹 Intro│ │ 🎸Verse │ │🎵Chorus │ │ 🎤Bridge│           │
│ [▪][▪][▪] │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│ Scene 1   │       ↑ Large horizontal row of Section icons + names      │
│ ●●●       │       ↑ Section "Chorus" is HIGHLIGHTED (currently active) │
│           ├─────────────────────────────────────────────────────────────┤
│ [▪][▪]    │  EVENT LIST (spreadsheet-style for selected Section)       │
│ Scene 2   │  ┌──────┬────────┬─────┬─────┬───────┬──────────┬────────┐ │
│ ●●        │  │ Type │ Ch     │ CC# │ Val │ Delay │ Descript │ Port   │ │
│           │  ├──────┼────────┼─────┼─────┼───────┼──────────┼────────┤ │
│ [▪]       │  │► CC  │ 10     │  64 │ 127 │  0ms  │ Sustain  │ IAC 1  │ │
│ Scene 3   │  │  CC  │ 10     │   7 │ 100 │ 10ms  │ Volume   │ IAC 1  │ │
│ ●         │  │  PC  │  1     │  42 │  -  │  0ms  │ Preset   │ IAC 2  │ │
│           │  │  NOn │  2     │  60 │  80 │ 50ms  │ Trigger  │ IAC 1  │ │
│           │  └──────┴────────┴─────┴─────┴───────┴──────────┴────────┘ │
│           │       ↑ Row "Sustain" is SELECTED (▶ indicator)            │
├───────────┴─────────────────────────────────────────────────────────────┤
│ EVENT EDITOR: [Type: CC ▼] [Ch: 10] [CC#: 64] [Val: 127] [Delay: 0ms]  │
│ Description: [Sustain Pedal On           ] Port: [IAC Driver Bus 1 ▼]  │
│ [+ Ramp Options ▼]  [Save] [Delete] [Duplicate]                         │
└─────────────────────────────────────────────────────────────────────────┘

LEGEND:
- Left Bar "Scenes": Small icons [▪] per Scene, dots (●●●) show Section count
- Scene 2 is HIGHLIGHTED (currently selected Scene)
- Top "Section Bar": One large row of Section icons + names for selected Scene
- Center "Event List": Spreadsheet rows showing all events for selected Section
- Bottom "Event Editor": Edit form for selected event, with Save/Delete actions
```

### Navigation Behavior

| Action | Result |
|--------|--------|
| **Click Scene in Left Bar** | Selects Scene, shows its Sections in Section Bar, first Section selected |
| **Click Section in Section Bar** | Highlights Section, shows its Events in Event List |
| **Next▶ / ◀Prev buttons** | Navigate through Sections within Scene, or wrap to next/prev Scene |
| **Click Event Row** | Selects event, populates Event Editor below |
| **Keyboard arrows** | Navigate through Event List rows |

---

## Technical Implementation Strategy

### 1. Architecture Refactoring (Critical Pre-requisite)
To share code between the existing CLI and the new GUI without duplication, we must first refactor the `swift_src` package.

- **Current State:** `MidiAssistant` executable target contains all logic.
- **Problem:** `swift_ui` package cannot import an executable target.
- **Solution:** Extract core logic into a new Library Target `MidiAssistantCore`.
  - **Moves to Core:** Models (`Concert`, `Scene`, `Event`), Managers (`ConcertManager`, `ConfigManager`), Services (`RoutingService`).
  - **Remains in CLI:** `main.swift`, Command definitions (`ConcertCommand`, `RoutingCommand`).
  - **New Dependency:** `swift_ui` package will depend on local `MidiAssistantCore`.

### 2. State Management (macOS 13+)
Since we are targeting macOS 13, we will use the `ObservableObject` protocol (Combine) rather than the newer `@Observable` macro (macOS 14+).

- **`ConcertViewModel` (StateObject):** The source of truth for the UI window.
  - `@Published var concert: Concert?`
  - `@Published var selection: SelectionState`
  - Handles dirty state and saving to disk.
- **`EventEditorViewModel` (ObservedObject):** Derived state for the bottom panel.
  - Binds tightly to the selected Event in the Concert model.
  - Changes here propagate back to the `Concert` via binding or completion handlers.

### 3. Data Flow
1.  **Load:** JSON → `ConcertManager` → `Concert` (Model) → `ConcertViewModel` (UI State).
2.  **Edit:** User types in Event Editor → `ConcertViewModel` updates `Concert` model in memory.
3.  **Persist:** `ConcertViewModel` triggers `ConcertManager.saveConcert()` on explicit Save or auto-save interval.

### 4. Development Strategy
We will build this iteratively to ensure stability:
1.  **Read-Only Version:** Visualize the JSON first. Get the Sidebar, Section Bar, and Event List rendering correctly with navigation.
2.  **Selection Logic:** Ensure clicking items updates the state correctly across all three views.
3.  **Editing:** Add the Event Editor panel and write-back logic.
4.  **Advanced:** Add Drag-and-drop and MIDI Monitor.

---

## Implementation Phases

### Phase 1: Foundation (Week 1) — UI-Driven Architecture

> [!TIP]
> These foundations are designed to match the revised UI layout, reducing refactoring.

- [ ] Create new SwiftUI package `swift_ui/` (Option A: separate package)
- [ ] Set up `ConcertViewModel` with:
  - `selectedSceneIndex: Int?` — tracks active Scene for left sidebar
  - `selectedSectionKey: String?` — tracks active Section for Section Bar
  - `selectedEventId: UUID?` — tracks active Event for Event List
- [ ] Build `SceneSidebar` component (left bar):
  - Scene name + small icon row for Section count (●●● dots)
  - Highlight selected Scene
- [ ] Build `SectionBar` component (top center, horizontal):
  - Icon + name cards for each Section in selected Scene
  - Click to select Section
- [ ] Load existing Concert from JSON using `ConcertManager`

### Phase 2: Event List Display (Week 2)
- [ ] Build `EventListView` component (spreadsheet-style table):
  - Columns: Type, Channel, CC#, Value, Delay, Description, Port
  - Row selection with ▶ indicator
- [ ] Implement selection highlighting (sync Scene, Section, Event)
- [ ] Add Next▶ / ◀Prev navigation buttons in toolbar
- [ ] Keyboard arrow navigation through Event rows

### Phase 3: Event Editor (Week 3)
- [ ] Bottom panel with event form
- [ ] Edit MIDI type, channel, control, value
- [ ] Save changes back to model
- [ ] Auto-save or explicit save

### Phase 4: Advanced Features (Week 4+)
- [ ] Drag-and-drop reordering
- [ ] Copy/paste events
- [ ] Undo/redo
- [ ] MIDI preview (send test event)
- [ ] Dark mode styling

---

## Project Structure Options

### Option A: Separate SwiftUI Package (Recommended)

```
MidiAssistantProject/
├── swift_src/           # Existing CLI (unchanged)
├── swift_ui/            # New GUI app
│   ├── Package.swift
│   └── Sources/MidiAssistantUI/
└── data/                # Shared data
```

**Pros:** Clean separation, CLI still works, no risk to existing code

### Option B: Add GUI Target to Existing Package

```
swift_src/
├── Package.swift        # Add new product
├── Sources/
│   ├── MidiAssistant/   # CLI (existing)
│   └── MidiAssistantUI/ # GUI (new)
```

**Pros:** Easier model sharing, single repo

---

## Quick Start: Minimal SwiftUI App

```swift
import SwiftUI

@main
struct MidiAssistantApp: App {
    @State private var concert: Concert?
    
    var body: some Scene {
        WindowGroup {
            ContentView(concert: $concert)
        }
        .commands {
            CommandGroup(replacing: .newItem) {
                Button("Open Concert...") {
                    openConcert()
                }
                .keyboardShortcut("o")
            }
        }
    }
    
    func openConcert() {
        let panel = NSOpenPanel()
        panel.allowedContentTypes = [.json]
        if panel.runModal() == .OK, let url = panel.url {
            // Load concert
        }
    }
}
```

---

## Decisions (From User Feedback)

| Question | Decision |
|----------|----------|
| **Project Structure** | ✅ **Option A: Separate SwiftUI Package** (`swift_ui/` folder) |
| **UI Layout** | ✅ Revised layout with Scene sidebar, horizontal Section bar, spreadsheet event list |
| **First Feature Priority** | Scene/Section navigation + Event display (building concert phase) |

### Remaining Questions

1. **macOS Version Target?**
   - macOS 13+ (Ventura): Latest SwiftUI features
   - macOS 12+ (Monterey): Wider compatibility
   - macOS 11+ (Big Sur): Maximum reach

2. **Xcode or VS Code Development?**
   - Xcode: Best for SwiftUI previews
   - VS Code: Works with swift build commands

---

## Next Steps

1. ✅ Review this exploration document
2. Decide on project structure
3. Create initial SwiftUI package
4. Build basic NavigationSplitView layout
5. Integrate existing Concert model
6. Iterate on UI design
