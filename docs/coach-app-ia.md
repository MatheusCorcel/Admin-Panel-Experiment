# BAM Labs Coach App – Information Architecture

## App Structure Overview

```
Coach App
├── Authentication
├── Home (Dashboard)
├── Schedule
├── Class Execution
└── Profile & Settings
```

---

## 1. Authentication (Entry Point)

```
Authentication
├── Sign In
│   ├── Email Input
│   ├── OTP Verification
│   └── Error States
└── [Redirect to Home]
```

**Notes:**
- Invite-only access (no registration flow)
- Single sign-in method (OTP via email)

---

## 2. Home (Dashboard)

```
Home
├── Next Class Card
│   ├── Class Time
│   ├── Class Type
│   ├── Assigned Routine
│   ├── Countdown Timer
│   └── Routine Status Badge (Swappable / Locked)
│
├── Quick Actions
│   ├── Check-In Button (geofenced)
│   └── Start Class Button (enabled <15 min before)
│
└── Empty State
    └── "No upcoming classes" message
```

**Primary Question Answered:** "What do I have next and what must I do now?"

---

## 3. Schedule

```
Schedule
├── Week View (Vertical List)
│   ├── Week Navigation (Previous / Next)
│   ├── Month Jump Selector
│   └── Class Cards (per day)
│       ├── Time
│       ├── Class Name
│       ├── Assigned Routine
│       └── Routine Status (Swappable / Locked)
│
└── Class Detail (Pre-Start)
    ├── Class Info Header
    │   ├── Date & Time
    │   ├── Class Type
    │   └── Location
    │
    ├── Routine Section
    │   ├── Current Routine Name
    │   ├── View Full Routine
    │   ├── Swap Routine (if >12h) ─────► Routine Selection
    │   └── Lock Confirmation
    │
    └── Start Class Button (enabled <15 min before)
```

**Notes:**
- Data synced from Mindbody
- Routine swaps only allowed >12 hours before class

---

## 4. Class Execution (Core Engine)

### 4.1 Pre-Class Phase

```
Class Execution: Pre-Class
├── Station Map
│   ├── Gym Layout Grid (rows × columns)
│   └── Stations
│       ├── Client Name
│       └── Flag Indicator
│
├── Flagged Clients Review
│   ├── Client List (flagged only)
│   └── Flag Details Popup
│       ├── Flag Type
│       ├── Notes
│       └── History
│
└── Start Workout Button
    └── [Begins timestamp logging]
```

---

### 4.2 During Class Phase

```
Class Execution: During Class
│
├── Exercise Flow (Primary View)
│   ├── Current Exercise Card
│   │   ├── Exercise Name
│   │   ├── Sets / Reps
│   │   ├── Recommended Weights (if provided)
│   │   └── Pacing Timer
│   │
│   ├── Progress Indicator
│   │   └── Exercise X of Y
│   │
│   ├── Finish Exercise Button
│   │   └── [Logs timestamp, advances to next]
│   │
│   └── End Workout Button
│       └── [Logs final timestamp]
│
└── Station Map (Floating/Toggle Access)
    ├── Gym Layout Grid
    └── Station Actions
        ├── Quick Flag Toggle
        └── View Flag Details (Popup)
            ├── Existing Flags
            └── Quick Notes
```

---

### 4.3 Post-Class Phase

```
Class Execution: Post-Class
│
├── Cleaning Checklist
│   ├── Checklist Items
│   ├── Check/Uncheck Actions
│   └── Completion Status
│       └── [Required before submission]
│
├── Client Flag Review
│   ├── Flagged Clients List
│   └── Flag Actions
│       ├── Edit Flag
│       ├── Add Notes
│       └── Remove Flag
│
├── Feedback (Optional)
│   └── Free-Text Input
│
└── Submit Class
    └── [Logs completion timestamp]
```

---

## 5. Profile & Settings

```
Profile & Settings
├── Coach Profile
│   ├── Name
│   ├── Photo
│   ├── Email
│   └── Edit Profile (limited if synced from Mindbody)
│
├── Notification Preferences
│   ├── 24h Class Reminder (toggle)
│   ├── Routine Swap Cutoff Reminder (toggle)
│   └── Channel Selection (In-App / Email / SMS)
│
├── Help & Support
│   ├── FAQ
│   └── Contact Support
│
└── Sign Out
```

---

## 6. Notification System (Background Layer)

```
Notifications
├── 24h Class Reminder
│   └── Triggered: 24 hours before scheduled class
│
├── Routine Swap Cutoff Warning
│   └── Triggered: Near 12h deadline
│
└── In-App Notification Center (optional future)
    └── Notification History
```

**Notes:** Not a primary navigation item – operates as system layer.

---

## Navigation Model

### Primary Navigation (Tab Bar)

| Tab | Icon | Purpose |
|-----|------|---------|
| **Home** | 🏠 | Next class + quick actions |
| **Schedule** | 📅 | Weekly class overview |
| **Profile** | 👤 | Settings & account |

### Contextual Navigation

- **Class Execution** enters full-screen mode (no tab bar)
- Exit only via explicit "End Class" or back navigation with confirmation

---

## User Flow Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   Sign In ──► Home ──► Start Class ──► Pre-Class ──► During ──► Post   │
│                │                                                        │
│                └──► Schedule ──► Class Detail ──► Start Class ─────────►│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Out of Scope (Separate System)

### Client iPad App

```
Client iPad (Separate App)
├── Station Assignment Screen
├── Routine View (Read-Only)
│   ├── Current Exercise
│   └── Self-Paced Progression
└── Completion Screen
```

**Note:** Client iPad is a separate product surface, not part of Coach App IA.

---

## Key Design Principles

1. **Sequential, Not Exploratory** – Class execution is linear; no branching during workout
2. **Time-Aware** – UI reflects countdown states and deadline enforcement
3. **Minimal Cognitive Load** – Essential information only during class
4. **Timestamp Everything** – All key actions logged for analytics
5. **Flags Persist** – Client awareness builds across sessions

---

*Version: 1.0 | Last Updated: February 2026*
