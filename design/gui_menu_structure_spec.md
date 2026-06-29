# GUI Menu Structure Specification

**Status:** Draft for Review
**Goal:** Define the exact menu hierarchy and toolbar interactions for the new MidiAssistant GUI (replicating MainStage-style workflow).

---

## 1. Top Toolbar (Window Context)

The toolbar stays visible at the top of the window.

| Item | Control Type | Function |
|------|--------------|----------|
| **Scene Selector** | Drop-down Menu | Displays current Scene Name (e.g., "Intro"). Clicking opens a list of all Scenes to jump to. |
| **Prev/Next** | Button Group | `[ ◀ ]` `[ ▶ ]` to navigate sequentially through Sections/Scenes. |
| **Section Bar** | Horizontal Scroll | (Below Toolbar) Visual row of Section cards for the current Scene. |
| **Transport** | Button | `[ Panic ]` (All Notes Off) - Quick access for stuck notes. |
| **Mode Toggle** | Segmented Control | `[ Edit ]` vs `[ Perform ]`. <br>• **Edit:** Inspector + full controls.<br>• **Perform:** Configurable Sidebar/Bar for compact view alongside MainStage. |
| **Activity** | Indicator | Flashing light for MIDI In/Out activity. |

---

## 2. macOS Menu Bar Hierarchy

Standard macOS application menus extended for Concert operations.

###  MidiAssistant
- **About MidiAssistant**
- **Settings...** (`Cmd-,`)
  - *Tabs: General, MIDI Routing, File Paths*
- **Quit** (`Cmd-Q`)

### File
- **New Concert** (`Cmd-N`)
- **Open Concert...** (`Cmd-O`)
- **Open Recent >**
- **Close Window** (`Cmd-W`)
- **Save Concert** (`Cmd-S`)
- **Save As...** (`Cmd-Shift-S`)
- **Revert to Saved**
- -------------
- **Import from Catalog...** (Merge Master Patch/Scene/Preset into Concert)
- **Export to Catalog...** (Save selected item to Catalog)

### Edit
- **Undo** (`Cmd-Z`)
- **Redo** (`Cmd-Shift-Z`)
- -------------
- **Cut / Copy / Paste** (Events, Sections, Scenes)
- **Delete** (`Cmd-Backspace`)
- **Select All** (`Cmd-A`)
- -------------
- **Duplicate** (`Cmd-D`) (Duplicates selected Event/Section/Scene)

### View
- **Enter Full Screen** (`Cmd-Ctrl-F`)
- **Toggle Inspector** (`Cmd-I`) (Show/Hide bottom Event Editor)
- **Toggle MIDI Monitor** (`Cmd-M`) (Show/Hide floating monitor window)
- **Toggle Search Window** (`Cmd-F`) (Global Search & Find for Concert/Catalog/Presets)
- -------------
- **Performance View** (`Cmd-P`) (Streamlined Sidebar + Section Bar for live use)
- **Zoom In / Out** (`Cmd-+` / `Cmd--`) (Resize Event List text)

### Concert (Context-Specific)
*Actions for high-level structure.*
- **Add New Scene** (`Cmd-Opt-N`)
- **Add New Section** (`Cmd-Shift-N`)
- **Add New Master Patch**
- -------------
- **Edit Concert Metadata...** (BPM, Title)
- **Concert Settings...**

### Event
*Actions for the selected MIDI Event row.*
- **Add Event...** (`Cmd-E`)
- **Batch Edit Selected...**
- **Transform...** (e.g., Ramp generator)
- -------------
- **Toggle Mute Event**

### Window
- **Minimize** (`Cmd-M`)
- **Zoom**
- **Bring All to Front**
- -------------
- **Concert Editor** (Main Window)
- **Performance: Scene List**
- **Performance: Section Strip**
- **Search & Find**
- **MIDI Monitor**

### Help
- **MidiAssistant Help**

---

## 3. Contextual Menus (Right-Click)

### On a Section Card (Top Bar)
- Rename Section
- Duplicate Section
- Delete Section
- Add New Section After

### On an Event Row (Main List)
- Edit Value...
- Ramp... (Open Ramp Editor)
- Duplicate Event
- Delete Event
