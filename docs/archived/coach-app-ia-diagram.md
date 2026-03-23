# BAM Labs Coach App – IA Visual Diagram

## Mermaid Diagram (Render in any Mermaid-compatible tool)

```mermaid
flowchart TB
    subgraph APP["🏋️ COACH APP"]
        direction TB
        
        subgraph AUTH["1. AUTHENTICATION"]
            A1[Sign In<br/>Email Input]
            A2[OTP Verification]
            A1 --> A2
        end
        
        subgraph HOME["2. HOME"]
            H1[Next Class Card]
            H2[Check-In Button]
            H3[Start Class Button]
            H1 --> H1a[Countdown Timer]
            H1 --> H1b[Routine Status]
        end
        
        subgraph SCHEDULE["3. SCHEDULE"]
            S1[Week View]
            S2[Class Detail]
            S1 --> S2
            S2 --> S2a[View Routine]
            S2 --> S2b[Swap Routine]
            S2 --> S2c[Lock Confirmation]
        end
        
        subgraph EXECUTION["4. CLASS EXECUTION ⭐"]
            direction TB
            subgraph PRE["PRE-CLASS"]
                E1[Station Map]
                E2[Flagged Clients Review]
                E3[Start Workout]
            end
            subgraph DURING["DURING CLASS"]
                E4[Exercise Flow]
                E5[Station Map Toggle]
                E6[Pacing Timer]
                E7[End Workout]
            end
            subgraph POST["POST-CLASS"]
                E8[Cleaning Checklist]
                E9[Flag Review/Edit]
                E10[Feedback]
                E11[Submit Class]
            end
            PRE --> DURING --> POST
        end
        
        subgraph PROFILE["5. PROFILE & SETTINGS"]
            P1[Coach Profile]
            P2[Notification Preferences]
            P3[Help & Support]
            P4[Sign Out]
        end
    end
    
    AUTH --> HOME
    H3 --> EXECUTION
    S2 --> EXECUTION

    style EXECUTION fill:#fff3cd,stroke:#ffc107,stroke-width:3px
    style PRE fill:#e8f5e9,stroke:#4caf50
    style DURING fill:#fff8e1,stroke:#ff9800
    style POST fill:#e3f2fd,stroke:#2196f3
```

---

## Simplified Tree View

```
COACH APP
│
├── 1. AUTHENTICATION
│   ├── Sign In (Email)
│   └── OTP Verification
│
├── 2. HOME ◄─── Primary Landing
│   ├── Next Class Card
│   │   ├── Countdown Timer
│   │   └── Routine Status (Swappable/Locked)
│   ├── Check-In Button
│   └── Start Class Button ──────────────┐
│                                        │
├── 3. SCHEDULE                          │
│   ├── Week View (Vertical List)        │
│   │   └── Class Cards                  │
│   └── Class Detail                     │
│       ├── View Routine                 │
│       ├── Swap Routine (>12h)          │
│       ├── Lock Confirmation            │
│       └── Start Class Button ──────────┤
│                                        │
├── 4. CLASS EXECUTION ◄─────────────────┘ ⭐ CORE
│   │
│   ├── PRE-CLASS
│   │   ├── Station Map (Grid View)
│   │   ├── Flagged Clients Review
│   │   └── [Start Workout]
│   │
│   ├── DURING CLASS
│   │   ├── Exercise Flow
│   │   │   ├── Current Exercise
│   │   │   ├── Sets/Reps/Weights
│   │   │   ├── Pacing Timer
│   │   │   └── [Finish Exercise]
│   │   ├── Station Map (Toggle)
│   │   │   └── Flag Toggle + Details
│   │   └── [End Workout]
│   │
│   └── POST-CLASS
│       ├── Cleaning Checklist ✓
│       ├── Client Flag Review
│       ├── Feedback (Optional)
│       └── [Submit Class]
│
└── 5. PROFILE & SETTINGS
    ├── Coach Profile
    ├── Notification Preferences
    │   ├── 24h Reminder
    │   └── Swap Cutoff Alert
    ├── Help & Support
    │   ├── FAQ
    │   └── Contact
    └── Sign Out
```

---

## Navigation Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TAB BAR NAVIGATION                             │
├─────────────────────┬─────────────────────┬─────────────────────────────────┤
│        HOME         │      SCHEDULE       │           PROFILE               │
│         🏠          │         📅          │              👤                 │
└──────────┬──────────┴──────────┬──────────┴─────────────────────────────────┘
           │                     │
           │    ┌────────────────┘
           │    │
           ▼    ▼
    ┌──────────────────┐
    │  CLASS EXECUTION │  ◄── Full-Screen Mode (No Tab Bar)
    │    (3 Phases)    │
    └──────────────────┘
```

---

## User Flow Diagram

```
                                    ┌─────────────┐
                                    │   SIGN IN   │
                                    └──────┬──────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                                    HOME                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  NEXT CLASS CARD                                                        │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────────┐ ┌─────────────────────────┐   │  │
│  │  │  TIME   │ │  TYPE   │ │   ROUTINE   │ │  ⏱️ COUNTDOWN: 2:34:00  │   │  │
│  │  └─────────┘ └─────────┘ └─────────────┘ └─────────────────────────┘   │  │
│  │                                           🟢 Routine Swappable          │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                               │
│  ┌─────────────────┐        ┌──────────────────────────────────────────┐     │
│  │   ☑️ CHECK-IN   │        │            ▶️ START CLASS                │     │
│  └─────────────────┘        └───────────────────┬──────────────────────┘     │
└─────────────────────────────────────────────────┼────────────────────────────┘
                                                  │
                                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           CLASS EXECUTION MODE                                │
│                                                                               │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐              │
│  │   PRE-CLASS    │───▶│  DURING CLASS  │───▶│   POST-CLASS   │              │
│  │                │    │                │    │                │              │
│  │ • Station Map  │    │ • Exercise 1   │    │ • Checklist ✓  │              │
│  │ • Review Flags │    │ • Exercise 2   │    │ • Edit Flags   │              │
│  │                │    │ • ...          │    │ • Feedback     │              │
│  │ [Start Workout]│    │ [End Workout]  │    │ [Submit]       │              │
│  └────────────────┘    └────────────────┘    └───────┬────────┘              │
│                                                      │                        │
└──────────────────────────────────────────────────────┼───────────────────────┘
                                                       │
                                                       ▼
                                              ┌────────────────┐
                                              │  BACK TO HOME  │
                                              └────────────────┘
```

---

## Color Legend

| Color | Meaning |
|-------|---------|
| 🟢 Green | Main Navigation Sections |
| 🟡 Yellow/Orange | Class Execution Phases (Core) |
| 🔵 Blue | Features / Screens |
| ⭐ Star | Core Value Feature |

---

*To render the Mermaid diagram: Use [Mermaid Live Editor](https://mermaid.live), Notion, Obsidian, GitHub, or any Markdown tool with Mermaid support.*
