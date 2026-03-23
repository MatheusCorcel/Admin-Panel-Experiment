# BAM Labs Coach App – Site Map + Feature/Component Breakdown

---

## Site Map (Navigation Structure)

```
                                    ┌─────────────────┐
                                    │   Coach App     │
                                    └────────┬────────┘
                                             │
          ┌──────────────┬──────────────┬────┴────┬──────────────┬──────────────┐
          │              │              │         │              │              │
          ▼              ▼              ▼         ▼              ▼              ▼
   ┌────────────┐ ┌────────────┐ ┌──────────┐ ┌─────────────┐ ┌────────────┐ ┌────────────┐
   │ Auth 0.0   │ │ Home 1.0   │ │Schedule  │ │ Class Exec  │ │ Profile &  │ │Notifications│
   │            │ │            │ │   2.0    │ │    3.0      │ │Settings 4.0│ │    5.0     │
   └─────┬──────┘ └─────┬──────┘ └────┬─────┘ └──────┬──────┘ └─────┬──────┘ └────────────┘
         │              │             │              │              │         (System Layer)
         ▼              ▼             ▼              │              ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐         │        ┌──────────┐
   │ Sign In  │  │  Class   │  │  Class   │         │        │  Edit    │
   │   0.1    │  │ Details  │  │ Details  │         │        │ Profile  │
   └────┬─────┘  │   1.1    │  │   2.1    │         │        │   4.1    │
        │        └────┬─────┘  └────┬─────┘         │        └──────────┘
        ▼             │             │               │        ┌──────────┐
   ┌──────────┐       └─────────────┼───────────────┤        │Notif.    │
   │   OTP    │                     │               │        │Prefs 4.2 │
   │   0.2    │                     ▼               │        └──────────┘
   └──────────┘              ┌──────────────┐       │        ┌──────────┐
                             │  Pre-Class   │◄──────┤        │ Help &   │
                             │     3.1      │       │        │Support   │
                             └──────┬───────┘       │        │   4.3    │
                                    │               │        └────┬─────┘
                                    ▼               │             │
                             ┌──────────────┐       │        ┌────┴─────┐
                             │During Class  │       │        │          │
                             │     3.2      │       │        ▼          ▼
                             └──────┬───────┘       │   ┌────────┐ ┌────────┐
                                    │               │   │  FAQ   │ │Contact │
                                    ▼               │   │ 4.3.1  │ │ 4.3.2  │
                             ┌──────────────┐       │   └────────┘ └────────┘
                             │ Post-Class   │◄──────┘
                             │     3.3      │
                             └──────────────┘
```

---

## Section Index

| ID | Screen | Parent |
|----|--------|--------|
| 0.0 | Authentication | — |
| 0.1 | Sign In | 0.0 |
| 0.2 | OTP Verification | 0.1 |
| 1.0 | Home | — |
| 1.1 | Class Details | 1.0 |
| 2.0 | Schedule | — |
| 2.1 | Class Details | 2.0 |
| 3.0 | Class Execution | 1.1 / 2.1 |
| 3.1 | Pre-Class | 3.0 |
| 3.2 | During Class | 3.1 |
| 3.3 | Post-Class | 3.2 |
| 4.0 | Profile & Settings | — |
| 4.1 | Edit Profile | 4.0 |
| 4.2 | Notification Preferences | 4.0 |
| 4.3 | Help & Support | 4.0 |
| 4.3.1 | FAQ | 4.3 |
| 4.3.2 | Contact Support | 4.3 |
| 5.0 | Notifications | — (System Layer) |

---

## Authentication 0.0 Content

### Sign In 0.1

| Component | Content / Requirements |
|-----------|------------------------|
| Email Input | • Text field for email address |
| Continue Button | • Disabled until valid email entered |
| Error State | • "Email not found" message for non-invited users |

### OTP Verification 0.2

| Component | Content / Requirements |
|-----------|------------------------|
| OTP Input | • 6-digit code input field |
| Resend Code Link | • Cooldown timer (e.g., "Resend in 30s") |
| Verify Button | • Validates code, redirects to Home on success |
| Error State | • "Invalid code" or "Code expired" messages |

---

## Home 1.0 Content

| Component | Content / Requirements |
|-----------|------------------------|
| Header | • "Welcome, [Coach Name]" |
| Next Class Card | • Class time<br>• Class type<br>• Assigned routine<br>• Countdown timer<br>• Routine status badge (Swappable / Locked)<br>• Tap → Class Details 1.1 |
| Check-In Button | • Geofenced logic (TBD)<br>• Disabled if not at location |
| Start Class Button | • Enabled <15 min before class<br>• Tap → Class Execution 3.0 |
| Empty State | • "No upcoming classes" message<br>• Link to Schedule |

---

## Class Details 1.1 Content

*Accessed from Home 1.0 or Schedule 2.0*

| Component | Content / Requirements |
|-----------|------------------------|
| Class Info Header | • Date & time<br>• Class type<br>• Location |
| Routine Section | • Current routine name<br>• View Full Routine (expandable or modal) |
| Swap Routine Button | • Visible only if >12h before class<br>• Opens routine selection list<br>• Confirmation required |
| Lock Indicator | • Shows "Locked" badge if <12h before class |
| Start Class Button | • Enabled <15 min before class<br>• Tap → Class Execution 3.0 |
| Back Navigation | • Returns to Home or Schedule |

---

## Schedule 2.0 Content

| Component | Content / Requirements |
|-----------|------------------------|
| Week Navigation | • Previous / Next week arrows<br>• Current week highlighted |
| Month Jump | • Dropdown or modal to jump to specific month |
| Day Headers | • Day name + date (e.g., "Mon, Feb 25") |
| Class Card (per class) | • Time<br>• Class name<br>• Assigned routine<br>• Routine status (Swappable / Locked icon)<br>• Tap → Class Details 2.1 |
| Empty State | • "No classes this week" message |

---

## Class Execution 3.0 Content

*Full-screen mode — Tab bar hidden*

### Pre-Class Phase 3.1

| Component | Content / Requirements |
|-----------|------------------------|
| Class Header | • Class name<br>• Time<br>• Routine name |
| Station Map | • Gym layout grid (configurable rows × columns)<br>• Each station shows: Client name, Flag indicator |
| Flagged Clients List | • List of clients with existing flags<br>• Tap → Flag Details Popup |
| Flag Details Popup | • Flag type<br>• Notes<br>• History (previous flags) |
| Start Workout Button | • Begins timestamp logging<br>• Tap → During Class 3.2 |

### During Class Phase 3.2

| Component | Content / Requirements |
|-----------|------------------------|
| Exercise Card | • Exercise name<br>• Sets / Reps<br>• Recommended weights (if provided)<br>• Coach cues (text) |
| Pacing Timer | • Elapsed time for current exercise |
| Progress Indicator | • "Exercise X of Y" |
| Finish Exercise Button | • Logs timestamp<br>• Advances to next exercise |
| End Workout Button | • Logs final timestamp<br>• Tap → Post-Class 3.3 |
| Station Map Toggle | • Floating button to access station map<br>• Quick flag toggle per station<br>• View/add flag notes |

### Post-Class Phase 3.3

| Component | Content / Requirements |
|-----------|------------------------|
| Cleaning Checklist | • List of checklist items<br>• Check/uncheck actions<br>• Completion required before submission |
| Client Flag Review | • List of flagged clients (from session)<br>• Edit flag<br>• Add/update notes<br>• Remove flag |
| Feedback Input | • Free-text input (optional)<br>• Placeholder: "Any notes about this class?" |
| Submit Class Button | • Disabled until checklist complete<br>• Logs completion timestamp<br>• Returns to Home |

---

## Profile & Settings 4.0 Content

| Component | Content / Requirements |
|-----------|------------------------|
| Profile Card | • Photo<br>• Name<br>• Email<br>• Edit Profile link (→ 4.1) |
| Notification Preferences | • Link to Notification Preferences (→ 4.2) |
| Help & Support | • Link to Help & Support (→ 4.3) |
| Sign Out Button | • Confirmation dialog<br>• Returns to Sign In 0.1 |

### Edit Profile 4.1

| Component | Content / Requirements |
|-----------|------------------------|
| Photo Upload | • Tap to change photo<br>• Crop/resize |
| Name Field | • Editable (unless synced from Mindbody) |
| Email Field | • Read-only |
| Mindbody Sync Status | • Badge showing if profile is synced |
| Save Button | • Validates and saves changes |

### Notification Preferences 4.2

| Component | Content / Requirements |
|-----------|------------------------|
| 24h Class Reminder | • Toggle on/off |
| Routine Swap Cutoff Reminder | • Toggle on/off |
| Channel Selection | • In-App (always on)<br>• Email (toggle)<br>• SMS (toggle, if supported) |
| Save Button | • Saves preferences |

### Help & Support 4.3

| Component | Content / Requirements |
|-----------|------------------------|
| FAQ Link | • Opens FAQ 4.3.1 |
| Contact Support Link | • Opens Contact Support 4.3.2 |

### FAQ 4.3.1

| Component | Content / Requirements |
|-----------|------------------------|
| FAQ List | • Accordion-style list<br>• Question titles expand to show answers |
| Search (optional) | • Filter FAQs by keyword |
| Back Navigation | • Returns to Help & Support |

### Contact Support 4.3.2

| Component | Content / Requirements |
|-----------|------------------------|
| Subject Dropdown | • Pre-defined categories (e.g., "Technical Issue", "Routine Question") |
| Message Field | • Free-text input |
| Submit Button | • Sends support request |
| Confirmation | • "Message sent" confirmation |

---

## Notifications 5.0 Content

*System layer — Not a navigable screen*

| Notification Type | Trigger | Content |
|-------------------|---------|---------|
| 24h Class Reminder | 24 hours before scheduled class | "Reminder: You have [Class Name] tomorrow at [Time]" |
| Routine Swap Cutoff | Near 12h deadline | "Last chance to swap routine for [Class Name]. Deadline: [Time]" |
| Class Check-In Reminder | 30 min before class (optional) | "Time to check in for [Class Name]" |

---

## Navigation Notes

| Navigation Type | Behavior |
|-----------------|----------|
| **Tab Bar** | Home, Schedule, Profile — visible on main screens |
| **Class Execution** | Full-screen mode, tab bar hidden |
| **Exit Class Execution** | Only via "Submit Class" or back with confirmation |
| **Class Details** | Accessed from both Home (1.1) and Schedule (2.1) — same screen |

---

*Version: 2.0 | Last Updated: February 2026*
