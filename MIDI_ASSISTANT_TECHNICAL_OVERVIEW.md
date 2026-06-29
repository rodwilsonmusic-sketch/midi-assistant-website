# MIDI Assistant: Technical Overview

## Executive Summary

MIDI Assistant is a macOS application designed to serve as an intelligent MIDI/OSC middleware layer for Apple MainStage. Built using Swift and MIDIKit, it provides sophisticated MIDI routing, virtual port management, and OSC-triggered automation capabilities that extend MainStage's native functionality.

---

## Architecture

### Core Design Pattern: Virtual MIDI Port (Man-in-the-Middle)

The application employs a **Virtual MIDI Port intercept architecture**, positioning itself between MIDI controllers (hardware and software) and MainStage. This allows for:

- Message interception and transformation
- Dynamic routing based on configuration
- Bidirectional communication with zero reconfiguration in MainStage

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│  Controllers    │────▶│  MIDI Assistant  │────▶│  MainStage  │
│  (Lemur, LCXL)  │◀────│  (Virtual Ports) │◀────│             │
└─────────────────┘     └──────────────────┘     └─────────────┘
```

### Technology Stack

| Component     | Technology           | Purpose                          |
| ------------- | -------------------- | -------------------------------- |
| Core Language | Swift 6              | Main application logic           |
| MIDI I/O      | MIDIKit              | High-level CoreMIDI wrapper      |
| Concurrency   | Swift Actors         | Thread-safe MIDI handling        |
| Configuration | Codable JSON         | All settings and mappings        |
| OCR           | Apple Vision (Swift) | MainStage mapping extraction     |
| OSC           | Planned              | Controller communication (Lemur) |

> **Note:** Python code exists in `/python_src/` for historical prototyping purposes only. The production application is entirely Swift-based.

---

## Core Components

### 1. RoutingService (`RoutingService.swift`)

An **actor-based service** that manages:

- Virtual port lifecycle (creation, routing, cleanup)
- Profile-based routing configurations
- Bidirectional message forwarding
- Event filtering and transformation

**Key Capabilities:**

- Creates 2-6 virtual MIDI ports dynamically
- User-defined naming conventions (default: `BStg_<PortName>`)
- Per-profile routing tables
- Global message filters

### 2. MIDIHandler (`MIDIHandler.swift`)

Manages low-level MIDI I/O:

- Creates `MIDIManager` instance
- Handles input/output connections
- Routes messages based on configurable mappings
- Implements passthrough for unmapped messages

### 3. ConfigManager (`ConfigManager.swift`)

JSON-based configuration management:

- Loads concert configurations
- Manages routing profiles
- Handles patch and preset definitions

### 4. PatchManager (`PatchManager.swift`)

Patch and section management:

- Organizes songs into patches with sections
- Manages event sequences per section
- Supports quantized event triggering

---

## MIDI Routing System

### Profile-Based Routing

```json
{
  "default_profile": "LemurBkStg",
  "profiles": {
    "LemurBkStg": {
      "additional_ports": [
        {
          "name": "Session 1 Network",
          "source_port": "Network BackStage Connect",
          "type": "bidirectional",
          "enabled": true
        }
      ],
      "intercepted_ports": [],
      "global_filters": []
    }
  }
}
```

### Port Types

| Type            | Direction    | Use Case                 |
| --------------- | ------------ | ------------------------ |
| `input`         | Receive only | Sensor inputs, triggers  |
| `output`        | Send only    | Light control, feedback  |
| `bidirectional` | Both         | Controller communication |

### Interception Strategy

**Software Controllers (e.g., Lemur):**

- Intercept existing network session
- Route through virtual port with user-defined name
- No MainStage reconfiguration required

**Hardware Controllers (e.g., Launch Control XL):**

- Cannot rename physical ports
- Create new virtual port with desired name
- Configure MainStage to use virtual port

---

## Event Processing Pipeline

```
1. Event Received on Physical/Virtual Port
           │
           ▼
2. Apply Profile-Specific Filters
           │
           ▼
3. Check for Mappings/Transformations
   - CC Remap: Change control number
   - Channel Remap: Redirect to different channel
   - Block: Filter out specific messages
           │
           ▼
4. Apply Global Filters
           │
           ▼
5. Forward to Destination Port(s)
```

### Filter Types

```swift
enum FilterType {
    case ccRemap(from: Int, to: Int)
    case channelFilter(allowed: [Int])
    case messageTypeBlock(types: [MIDIMessageType])
    case sysexBlock
}
```

---

## Synchronization Model

### External Sync

When MIDI Time Clock (`0xF8`) is detected on the designated `master_clock_port`:

- All timing calculated against live BPM
- Quantization aligns to actual measure boundaries
- Tempo changes tracked in real-time

### Internal Sync

Fallback when no external clock:

- Uses static BPM from patch configuration
- Meter specification determines bar duration
- Less accurate but functional for pre-recorded tracks

### Quantization Options

| Mode           | Behavior                            |
| -------------- | ----------------------------------- |
| `immediate`    | Execute events instantly on trigger |
| `next_measure` | Wait for downbeat before execution  |
| `next_beat`    | Wait for next beat (planned)        |

---

## Utility Tools

The project includes several diagnostic and testing tools:

| Tool               | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `MIDISnoop`        | Real-time MIDI monitor for all ports              |
| `MIDISend`         | Send test messages to specific ports              |
| `MIDIpatcher`      | Create virtual ports and test routing             |
| `MIDIVirtualSend`  | Test virtual port creation                        |
| `MappingConverter` | MainStage mapping extraction via Apple Vision OCR |

---

## JSON Configuration Schema

### Concert Configuration

```json
{
  "concert_name": "Winter Gala 2025",
  "date": "2025-12-01",
  "performance_order": ["Patch_Waltz", "Patch_Lead"],
  "patches": {
    "Patch_Waltz": {
      "preset": "Piano Ballad",
      "bpm": 88,
      "meter": "3/4",
      "events": [...]
    }
  }
}
```

### Event Types Supported

- `note_on` / `note_off`
- `control_change`
- `program_change`
- `parameter_ramp` (automated CC fades over time)

---

## Build & Run

### Prerequisites

- macOS 13+ (Ventura or later recommended)
- Xcode 15+ with Swift 6
- IAC Driver enabled in Audio MIDI Setup

### Commands

```bash
# Navigate to Swift source
cd /Volumes/Music1/GeminiProjects/MidiAssistantProject/swift_src

# Build entire project
swift build

# Run main application
swift run MidiAssistant

# Run specific tools
swift run MIDISnoop      # Monitor MIDI
swift run MIDIpatcher    # Test routing
```

---

## Known Limitations

1. **MainStage Feedback**: Alias channel MIDI feedback not accessible via MIDIKit/CoreMIDI
2. **OSC Packet Loss**: High-throughput OSC can lose packets
3. **Virtual Port Registration**: Occasional timing issues with MIDI Studio visibility
4. **Network Session Routing**: "Network Session 1" has unique routing behavior that bypasses standard CoreMIDI monitoring

---

## Future Enhancements

- [ ] Full OSC server integration for Lemur control
- [ ] Real-time profile switching via OSC
- [ ] Expanded filter types (velocity curves, note transpose)
- [ ] GUI application using SwiftUI
- [ ] Multi-concert session management
