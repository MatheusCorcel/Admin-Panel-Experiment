# BAM Labs Web Admin – Information Architecture

## App Structure Overview

```
Web Admin
├── Account Creation (0.0)
├── Users (1.0)
│   ├── Invite User (1.1.0)
│   ├── Coach Details (1.2.0)
│   └── Admin Details (1.3.0)
├── Routines (2.0)
│   ├── Routine Details (2.1.0)
│   │   └── Routine Editor (2.1.1)
│   │       └── Exercise Editor (2.1.1.1)
│   └── Exercise Library (2.2)
│       └── Exercise Template Editor (2.2.1)
├── FAQs (3.0)
│   └── FAQ Editor (3.1)
├── Feedback (4.0)
│   └── Feedback Detail (4.1)
├── Class Checklists (5.0)
│   └── Checklist Bundle Editor (5.1)
└── Settings (6.0)
```

---

## 0. Account Creation (0.0)

```
Account Creation
├── Brand
│   ├── Logo
│   └── Headline
│
├── Email Input
│   └── OTP Verification (invite-only)
│
└── Onboarding (not pulled from Mindbody)
    ├── Name
    ├── Profile Photo
    ├── Gender (optional)
    └── Phone (optional)
```

**Notes:**
- No public registration — invite-only access
- No password-based auth — OTP verification via email
- Onboarding data is collected directly, not synced from Mindbody
- Role is assigned at invite time by the admin who sends the invitation

---

## 1. Users (1.0)

```
Users
│
├── Users List
│   ├── Table View
│   │   ├── Name
│   │   ├── Email
│   │   ├── Role (Admin / Coach / Head Coach)
│   │   ├── Status (Active / Inactive)
│   │   ├── # of Classes Completed
│   │   ├── # of Classes Missed
│   │   ├── Last Check-in Time
│   │   └── Last Check-out Time
│   │
│   ├── Sort / Filter
│   │   ├── Role Filter (All / Admin / Coach / Head Coach)
│   │   ├── Status Filter (All / Active / Inactive)
│   │   ├── Sort by Recent Check-in
│   │   └── Sort by # of Classes Completed / Missed
│   │
│   ├── Search
│   │   └── Search by Name or Email
│   │
│   └── Table Actions
│       ├── Sort by Column
│       └── Pagination
│
├── Invite User Modal/Page (1.1.0)
│   ├── Invite Form
│   │   ├── Email Input
│   │   ├── Role Selection (Admin / Coach / Head Coach)
│   │   └── Send Invite Button (sends email)
│   │
│   └── Email Template
│       ├── Explanation of Invitation
│       ├── Link to Sign Up
│       ├── Link to Web (admin sign-up)
│       ├── Link to Mobile App (coach sign-up)
│       ├── How to Sign Up as Coach
│       └── Contact Support Line
│
├── Coach Details (1.2.0)
│   ├── Back Navigation → Users 1.0
│   │
│   ├── Profile Header
│   │   ├── Photo
│   │   ├── Name
│   │   ├── Email
│   │   ├── Studio Location (Main Gym)
│   │   ├── Role Badge (Admin / Coach)
│   │   └── Status Badge (Active / Inactive)
│   │
│   ├── Activity Summary
│   │   ├── Total Classes Completed
│   │   ├── Total Classes Missed
│   │   ├── Early Check-Ins
│   │   ├── Late Check-Ins
│   │   ├── Sessions This Month
│   │   ├── Sessions This Year
│   │   ├── Last Check-in Time
│   │   ├── Last Check-out Time
│   │   └── Upcoming Classes (optional)
│   │
│   ├── View Feedback History Button
│   │   └── Shortcut to Feedback 4.0 filtered by coach
│   │
│   └── Actions
│       ├── Edit Profile
│       ├── Change Role (Promote / Demote)
│       └── Deactivate Account (with confirmation modal)
│
└── Admin Details (1.3.0)
    ├── Back Navigation → Users 1.0
    │
    ├── Profile Header
    │   ├── Name
    │   ├── Email
    │   ├── Role Badge
    │   └── Status Badge (Active / Inactive)
    │
    ├── Activity Summary
    │   └── Last Check-in Online
    │   (No class-related metrics — admins don't teach)
    │
    └── Actions
        ├── Edit Profile
        ├── Change Role (Promote / Demote)
        └── Deactivate Account (with confirmation modal)
```

**Notes:**
- Three roles: Admin, Coach, Head Coach
- Coach Details shows full class activity; Admin Details omits class metrics
- Feedback history is accessed via a shortcut button that links to Feedback 4.0 with a coach filter pre-applied
- Deactivation requires confirmation modal with warning message
- Coach check-in and check-out times are recorded via geolocation on the Coach App. The admin panel displays when a coach arrived at and left the gym, visible in both the Users table and the Coach Details Activity Summary.

---

## 2. Routines (2.0)

```
Routines
│
├── Routine Library
│   ├── Table View
│   │   ├── Routine Name
│   │   ├── Type (Push / Pull / Legs / Full Body / etc.)
│   │   ├── Status (Draft / Published)
│   │   ├── Exercise Count
│   │   └── Created By
│   │
│   ├── Sort / Filter
│   │   ├── Type Filter (All / Push / Pull / Legs / Full Body / etc.)
│   │   ├── Status Filter (All / Draft / Published)
│   │   └── Sort by Last Updated Time
│   │
│   ├── Search
│   │   └── Search by Routine Name
│   │
│   └── Table Row Actions
│       ├── Edit
│       ├── Publish / Unpublish
│       ├── Duplicate
│       └── Delete (with confirmation)
│
├── Routine Details (2.1.0)
│   ├── Back Navigation → Routines 2.0
│   │
│   ├── Page Header
│   │   ├── Routine Name
│   │   ├── Type
│   │   ├── Status Badge (Draft / Published)
│   │   ├── Last Updated
│   │   └── Created By
│   │
│   ├── Actions
│   │   ├── Edit → Routine Editor 2.1.1
│   │   ├── Publish / Unpublish
│   │   ├── Duplicate
│   │   └── Delete (with confirmation)
│   │
│   └── Exercise Table (read-only)
│       ├── Exercise Order
│       ├── Exercise Name
│       ├── Entry Type (Single / Superset)
│       ├── Sets
│       ├── Reps
│       ├── Recommended Weight
│       └── Coach Cues
│
├── Routine Editor (2.1.1)
│   ├── Page Header
│   │   ├── Routine Name (editable inline)
│   │   ├── Type Selector Dropdown
│   │   └── Status Badge (Draft / Published)
│   │
│   ├── Header Actions
│   │   ├── Save Draft
│   │   └── Publish / Unpublish
│   │
│   ├── Exercise List (ordered, drag-to-reorder)
│   │   └── Exercise Row
│   │       ├── Order Number
│   │       ├── Exercise Name (or "Ex A / Ex B" for superset)
│   │       ├── Entry Type (Single / Superset)
│   │       ├── Sets
│   │       ├── Reps
│   │       ├── Recommended Weight
│   │       ├── Coach Cues
│   │       ├── Edit Button → Exercise Editor 2.1.1.1
│   │       └── Remove Button
│   │
│   ├── Add Exercise Button
│   │   ├── Dropdown to Select Existing Exercise
│   │   └── Create New → Exercise Editor 2.1.1.1
│   │
│   └── Publish Confirmation Modal
│       ├── Warning Message
│       └── Confirm / Cancel
│
├── Exercise Editor (2.1.1.1) — Modal
│   ├── Modal Header ("Add Exercise" or "Edit Exercise")
│   ├── Entry Type (Single / Superset) — Segmented control
│   │   ├── **Single** — One exercise. Athlete app shows one exercise to follow.
│   │   └── **Superset** — Two exercises grouped. Athlete app shows both back-to-back.
│   │
│   ├── Single Exercise Form (when Single selected)
│   │   ├── Exercise Name (autocomplete — searches Exercise Library 2.2)
│   │   │   └── Selecting from library auto-fills Coach Cues
│   │   ├── Sets (number input)
│   │   ├── Reps (number input or range, e.g. "8-12")
│   │   ├── Recommended Weight (text input, e.g. "135-185 lbs")
│   │   └── Coach Cues (text area, pre-filled from library, editable)
│   │
│   ├── Superset Form (when Superset selected)
│   │   ├── Exercise A (collapsible): Name (autocomplete), Sets, Reps, Weight, Coach Cues
│   │   └── Exercise B (collapsible): Name (autocomplete), Sets, Reps, Weight, Coach Cues
│   │
│   └── Actions
│       ├── Save Button
│       └── Cancel Button
│
└── Exercise Library (2.2) — Page at /routines/exercises
    ├── Table View
    │   ├── Exercise Name
    │   ├── Muscle Group (Chest / Back / Shoulders / Arms / Legs / Core / Full Body)
    │   └── Coach Cues (preview)
    │
    ├── Filter by Muscle Group
    │
    ├── Search by Name
    │
    └── Row Actions
        ├── Edit → Exercise Template Editor (2.2.1)
        └── Delete (with confirmation)
```

**Notes:**
- Routine Details 2.1.0 is a read-only view; editing happens in the Routine Editor 2.1.1
- Entry Type: **Single** = one exercise; **Superset** = two exercises grouped. Matches athlete app where users follow single exercises or supersets (two exercises back-to-back)
- Exercise name fields in the Exercise Editor support autocomplete from the Exercise Library; selecting an exercise auto-fills the Coach Cues field (which can be edited per-entry)
- **Coach Cues discussion point:** Consider with the client how coach cues should flow — library default vs. per-entry overrides. Currently, the library sets the default and each exercise entry can be freely edited.
- The Exercise Library is accessible via the "Exercise Library" button on the Routines page header
- Drag-to-reorder for exercise ordering in the editor
- Delete and publish actions require user confirmation modals

---

### Exercise Template Editor (2.2.1) — Modal

```
Exercise Template Editor
├── Modal Header ("Add Exercise" or "Edit Exercise")
├── Exercise Name (text input, required)
├── Muscle Group (select — Chest / Back / Shoulders / Arms / Legs / Core / Full Body)
├── Coach Cues (textarea — default cues shown in Exercise Editor autocomplete)
└── Actions
    ├── Save / Save Changes
    └── Cancel

---

## 3. FAQs (3.0)

```
FAQs
│
├── FAQ List
│   ├── Reorderable List (drag & drop)
│   │   ├── Question (Title)
│   │   ├── Answer Preview
│   │   ├── Category
│   │   └── Status
│   │
│   ├── Sort / Filter
│   │   ├── Category Filter (if categories enabled)
│   │   └── Status Filter (All / Draft / Published)
│   │
│   └── List Row Actions
│       ├── Edit → FAQ Editor 3.1
│       ├── Publish / Unpublish
│       └── Archive
│
└── FAQ Editor (3.1) — Modal or Page
    ├── Page/Modal Header (Title)
    ├── Question Input (text, required)
    ├── Answer Input (rich text editor or markdown)
    │   └── Supports formatting, links
    ├── Category Selector (dropdown)
    │   └── Option to Create New Category
    └── Actions
        ├── Save as Draft Button (secondary)
        ├── Publish Button (primary — triggers confirmation warning)
        ├── Archive Button (edit mode only)
        └── Publish Confirmation Modal
            └── Warning: "All changes will be pushed to the mobile app."
```

---

## 4. Feedback (4.0)

```
Feedback
│
├── Feedback Inbox
│   ├── Page Header
│   │   └── Title: "Feedback"
│   │
│   ├── Sort / Filter
│   │   ├── Date Range Picker
│   │   ├── Coach Filter (dropdown)
│   │   ├── Class Type Filter
│   │   └── Status Filter (New / Reviewed)
│   │
│   ├── Search
│   │   └── Keyword Search in Feedback Content
│   │
│   ├── Feedback Table
│   │   ├── Columns
│   │   │   ├── Date
│   │   │   ├── Coach
│   │   │   ├── Class Type
│   │   │   ├── Class Date
│   │   │   ├── Preview
│   │   │   └── Status
│   │   └── Row Click → Feedback Detail 4.1
│   │
│   └── Table Row Actions
│       ├── Mark as Reviewed
│       └── View Coach Profile
│
└── Feedback Detail (4.1)
    ├── Back Navigation → Feedback 4.0
    │
    ├── Page Header
    │   ├── Feedback Date
    │   └── Status Badge
    │
    ├── Full Feedback Text
    │   └── Complete Feedback Content
    │
    ├── Class Info
    │   ├── Class Name
    │   ├── Date & Time
    │   └── Routine Used
    │
    ├── Coach Info
    │   ├── Coach Name
    │   └── Link to Coach Detail 1.2.0
    │
    └── Actions
        ├── Mark as Reviewed
        └── View Coach Profile
```

**Design Principle:** Review and triage only. No analytics dashboards (yet).

---

## 5. Class Checklists (5.0)

```
Class Checklists
│
├── Checklist Bundles List
│   ├── Table View
│   │   ├── Bundle Name
│   │   ├── Type (Pre-Class / Post-Class)
│   │   ├── Location (BAM New York / BAM Mexico / BAM Madrid)
│   │   ├── Status (Draft / Published)
│   │   ├── Items Count
│   │   └── Last Updated
│   │
│   ├── Sort / Filter
│   │   ├── Type Filter (All / Pre-Class / Post-Class)
│   │   ├── Location Filter (All / BAM New York / BAM Mexico / BAM Madrid)
│   │   └── Status Filter (All / Draft / Published)
│   │
│   ├── Search
│   │   └── Search by Checklist Name
│   │
│   └── Table Row Actions
│       ├── Edit → Checklist Bundle Editor 5.1
│       └── Delete (with confirmation)
│
└── Checklist Bundle Editor (5.1) — Modal
    ├── Modal Header ("Add Checklist" or "Edit Checklist")
    ├── Checklist Name (text input, required)
    ├── Type (segmented control — Pre-Class / Post-Class)
    ├── Location (select — BAM New York / BAM Mexico / BAM Madrid)
    ├── Checklist Items (ordered list)
    │   ├── Item Row: Text input + Reorder + Delete
    │   └── Add Item Button
    └── Actions
        ├── Save as Draft Button (secondary)
        ├── Publish Button (primary — triggers confirmation warning)
        └── Publish Confirmation Modal
            └── Warning: "All changes will be pushed to the mobile app."
```

**Notes:**
- Each checklist bundle is tied to exactly one gym location
- Checklist items are simple text-based prompts that coaches check off before or after a class
- Bundles support Draft / Published workflow with a publish confirmation warning
- Pre-Class checklists cover safety, equipment, and member prep; Post-Class checklists cover cleanup, admin tasks, and debrief
- The standardized two-button publish pattern (Save as Draft / Publish) is consistent across Routines, FAQs, and Checklists

---

## 6. Settings (6.0)

```
Settings
│
├── Profile Management
│   ├── Photo (editable)
│   ├── Name (editable)
│   ├── Email (read-only)
│   ├── Phone (editable)
│   └── Role (read-only)
│
├── Change Password
│   ├── Current Password
│   ├── New Password
│   └── Confirm New Password
│
├── Notification Preferences
│   ├── New Feedback Submitted (email toggle)
│   ├── New User Invitation Accepted (email toggle)
│   └── Routine Published (email toggle)
│
├── Studio Settings
│   ├── Studio Name
│   ├── Studio Location
│   └── Timezone
│
└── Sign Out
    └── Confirmation Dialog → Returns to Account Creation 0.0
```

---

## Navigation Model

### Sidebar Navigation

```
┌──────────────────────────┐
│  BAM Labs Admin          │
├──────────────────────────┤
│                          │
│  👥 Users                │
│                          │
│  🏃 Routines             │
│                          │
│  ❓ FAQs                 │
│                          │
│  💬 Feedback             │
│                          │
│  📋 Checklists           │
│                          │
├──────────────────────────┤
│  ⚙️ Settings             │
│  🚪 Sign Out             │
└──────────────────────────┘
```

### Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Page Title + Primary Action (e.g., "Invite User") │
├─────────────────────────────────────────────────────────────┤
│  Filters Bar (when applicable)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Content Area                                               │
│  (Table, Form, or Detail View)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## User Flow Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Invite Email ──► OTP Verification ──► Onboarding ──► Users 1.0          │
│                                                                             │
│   Account Creation ──► Users ──┬──► Coach Details 1.2.0                    │
│                                │                                            │
│                                ├──► Admin Details 1.3.0                    │
│                                │                                            │
│                                ├──► Routines ──┬──► Routine Details 2.1.0  │
│                                │              │    └──► Routine Editor 2.1.1│
│                                │              └──► Exercise Library 2.2     │
│                                │                                            │
│                                ├──► FAQs ──► FAQ Editor 3.1               │
│                                │                                            │
│                                ├──► Feedback ──► Feedback Detail 4.1       │
│                                │                                            │
│                                ├──► Checklists ──► Bundle Editor 5.1       │
│                                │                                            │
│                                └──► Settings 6.0                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Access Control Matrix

| Feature | Admin | Head Coach | Coach |
|---------|-------|------------|-------|
| View Users | ✅ | ❌ | ❌ |
| Invite Users | ✅ | ❌ | ❌ |
| Manage Roles | ✅ | ❌ | ❌ |
| View Routines | ✅ | ❌ | ❌ |
| Edit Routines | ✅ | ❌ | ❌ |
| Manage Exercise Library | ✅ | ❌ | ❌ |
| Manage FAQs | ✅ | ❌ | ❌ |
| View Feedback | ✅ | ❌ | ❌ |
| Manage Class Checklists | ✅ | ❌ | ❌ |
| Settings | ✅ | ❌ | ❌ |

**Note:** Web Admin is admin-only. Coaches and Head Coaches use the Coach App exclusively.

---

## Key Design Principles

1. **Operational, Not HR** – User management shows activity, not performance reviews
2. **Draft-First Content** – Routines, FAQs, and Checklists support draft states before publishing
3. **Review, Not Analyze** – Feedback is for triage, not dashboards
4. **Invite-Only Access** – No public registration, OTP-based authentication
5. **External Data Sources** – Schedule/class data originates from external systems (e.g. Mindbody); the admin panel displays this data but does not duplicate or manually sync it
6. **Confirmation Before Destructive Actions** – Delete, deactivate, and publish actions require user confirmation

---

*Version: 3.0 | Last Updated: March 2026*
