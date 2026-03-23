# BAM Labs Admin Panel — Client Meeting Prep

**Date:** March 25, 2026
**Type:** Design Review — New Features & Changes
**Attendees:** [Design Team], [Client]

---

## Agenda

1. New feature walkthrough: Class Checklists
2. UX improvement: Standardized Draft/Publish behavior
3. New feature: Coach Check-Out Tracking
4. New feature: Coach Tracker (Monthly/Yearly Sessions)
5. Decision: Remove Mindbody Sync button
6. New feature: Early/Late Check-In Stats
7. Documentation updates
8. Open questions & decisions needed from client

---

## 1. New Feature: Class Checklists

### What it is

A new top-level section in the admin panel that allows administrators to create and manage pre-class and post-class checklists. These checklists ensure coaches consistently capture essential feedback and session data before and after every class.

### How it works

- **Checklist Bundles** — Each checklist is a "bundle" containing a list of items. A bundle is tied to a specific gym location (BAM New York, BAM Mexico, or BAM Madrid) and a class phase (Pre-Class or Post-Class).
- **Checklist Items** — Simple text-based items that coaches check off (e.g., "Equipment returned to designated spots", "Attendance confirmed in Mindbody").
- **Draft / Active workflow** — Bundles can be saved as drafts before being published, consistent with how Routines and FAQs work.

### Admin capabilities

- View all checklist bundles in a filterable, searchable table
- Filter by Location and Type (Pre-Class / Post-Class)
- Create new checklist bundles via a modal editor
- Edit existing bundles (name, type, location, items)
- Add, remove, and reorder checklist items within a bundle
- Delete bundles (with confirmation)
- Save as Draft or Publish with a confirmation warning

### Where it lives

- New top-level sidebar item: "Checklists" (between Feedback and Settings)
- URL: `/checklists`

### Discussion points for client

- [ ] Should there be a limit on how many bundles can be active per location/type combination, or can multiple active bundles coexist? **!!! We should add this as a requirement. We should have only have one pre and one post-class bundle for each Location.**
- [ ] Do we really need to have different checklists for each location?

---

## 2. UX Improvement: Standardized Draft/Publish Behavior

### What changed

We are standardizing the save/publish experience across all content types that support draft and published states: **Routines**, **FAQs**, and the new **Checklists**.

### The new pattern

- **Two action buttons** in every editor footer: "Save as Draft" (secondary) and "Publish" (primary)
- **No status dropdown** — the admin's button choice determines the status directly
- **Publish confirmation** — clicking "Publish" always triggers a warning dialog: *"Are you sure you want to publish [name]? All changes will be pushed to the mobile app."*
- **Save as Draft** — saves immediately with a success notification, no confirmation needed

### Why

- Clearer intent: the admin explicitly decides whether content goes live or stays in draft
- Safety net: the publish confirmation prevents accidental pushes to the mobile app
- Consistency: the same interaction pattern everywhere reduces cognitive load

### What's affected

- **Routines** — Already had two buttons; updated the confirmation message to mention the mobile app
- **FAQs** — Previously used a status dropdown + single "Save" button; refactored to the two-button pattern
- **Checklists** — Built with this pattern from the start

### Discussion points for client

- [ ] Is the warning message clear enough? Should it mention specific consequences (e.g., "coaches will see this immediately")?
- [ ] Should there be an "Unpublish" action available from the list view (row actions) as a quick toggle?

---

## 3. New Feature: Coach Check-Out Tracking

### What it is

A lightweight addition that tracks when a coach **leaves** the gym, complementing the existing check-in tracking. The coach's mobile app records departure via geolocation, and the admin panel displays this data.

### What changed

- **Users Table** — New "Last Check-Out" column added right after "Last Check-In," using the same date/time format
- **Coach Details** — Activity Summary now includes a "Last Check-Out" stat card alongside "Last Check-In"
- Admins get `null` for check-out (they don't have gym sessions)

### Points to discuss

- [ ] How should the geolocation trigger work? (e.g., auto-detect when coach leaves a geofence, or manual check-out button?)
- [ ] Should we display session duration (check-in → check-out) in addition to the raw timestamps?

---

## 4. New Feature: Coach Tracker (Monthly/Yearly Sessions)

### What it is

A new set of stats on the Coach Details page that shows how many workout sessions a coach has completed in the **current month** and **current year**, giving admins a quick view of participation over time.

### What changed

- **Coach Details Activity Summary** — Two new stat cards: "Sessions This Month" and "Sessions This Year"
- Grid layout adjusted from 4 columns to 3 columns to accommodate the 6 total stat cards in a balanced 2x3 layout
- Admins show `0` for both fields since they don't teach classes

### Points to discuss

- [ ] Should session counts also appear in the Users table for at-a-glance comparison across coaches?
- [ ] Should the time frames be configurable (e.g., last 30 days vs. calendar month)?
- [ ] Is there a target or threshold the PM wants to track against (e.g., minimum sessions per month)?

---

## 5. Decision: Remove Mindbody Sync Button

### What was decided

The "Sync with Mindbody" button on the Coach Details page has been **removed** due to potential integration issues. The button and its surrounding description text ("Coach information is synced from Mindbody. Use the button below to refresh their profile data.") no longer appear on the page.

### Why

- Mindbody integration is not yet implemented on the backend
- Showing a non-functional button creates confusion and false expectations
- The feature can be re-introduced once the integration is properly scoped and built

---

## 6. New Feature: Early/Late Check-In Stats

### What it is

Two new stat cards on the Coach Details Activity Summary that show how many times a coach has checked in early and how many times they have checked in late. This gives admins a quick view of punctuality patterns without needing to review individual session records.

### What changed

- **Coach Details Activity Summary** — Added "Early Check-Ins" and "Late Check-Ins" stat cards, placed after "Classes Missed"
- Grid layout updated to **4 columns** (8 total stat cards across 2 rows)
- Admins show `0` for both fields

### Points to discuss

- [ ] How is "early" vs. "late" defined? (e.g., arriving 5 minutes before class start = early; any time after = late?)
- [ ] Should these counts be lifetime totals or rolling (e.g., last 30 days)?

---

## 7. Documentation Updates

The following documents are being updated to reflect these changes:

- **Information Architecture** (`../web-admin-ia.md`) — Class Checklists section, coach early/late check-in stats in Activity Summary, updated Mindbody design principle
- **User Stories & Tasks** (`../admin-user-stories.md`) — US-1.9 through US-1.12, including Mindbody removal and early/late check-in tracking

---

## 8. Summary of All Changes

| Area | Change | Type |
|------|--------|------|
| Class Checklists | New top-level page with table, filters, search | New feature |
| Class Checklists | Bundle editor modal (name, type, location, items) | New feature |
| Class Checklists | Checklist items management (add, remove, reorder) | New feature |
| Sidebar Navigation | New "Checklists" entry | UI addition |
| FAQs Editor | Replace status dropdown with Save as Draft / Publish buttons | UX improvement |
| FAQs Editor | Add publish confirmation dialog with mobile app warning | UX improvement |
| Routines Editor | Update publish confirmation to mention mobile app | UX improvement |
| Coach Check-Out Tracking | "Last Check-Out" column in Users table | New feature |
| Coach Check-Out Tracking | "Last Check-Out" stat in Coach Details Activity Summary | New feature |
| Coach Tracker | "Sessions This Month" stat in Coach Details Activity Summary | New feature |
| Coach Tracker | "Sessions This Year" stat in Coach Details Activity Summary | New feature |
| Coach Tracker | Activity Summary grid adjusted to 4-column layout | UI refinement |
| Mindbody Sync | Removed "Sync with Mindbody" button from Coach Details | Removal |
| Early/Late Check-In Stats | "Early Check-Ins" stat in Coach Details Activity Summary | New feature |
| Early/Late Check-In Stats | "Late Check-Ins" stat in Coach Details Activity Summary | New feature |
| Documentation | IA and User Stories updated for all changes through US-1.12 | Documentation |

---

## 9. Open Questions for Client

1. Pre-Class / Post-Class — are these the only two phases, or should we plan for more?
2. Multiple active bundles — can a location have more than one active pre-class checklist at a time?
3. Mobile app integration — how should checklists surface for coaches? (Helps us validate the admin data model.)
4. Default items — should some checklist items be mandatory across all locations?
5. Publish warning — is "All changes will be pushed to the mobile app" the right framing?
6. Coach check-out — should geolocation auto-detect departure (geofence), or should coaches manually tap a "Check Out" button?
7. Session duration — should the admin panel calculate and display session duration (check-in to check-out)?
8. Coach Tracker — should monthly/yearly session counts also appear in the Users table for cross-coach comparison?
9. Coach Tracker — should the time frames be configurable (last 30 days vs. calendar month), or is calendar month/year sufficient?
10. Coach Tracker — is there a minimum session target per month the PM wants to track against?
11. Early/Late Check-In — what is the threshold for "early" vs. "on time" vs. "late"? (e.g., 5 minutes before start = early)
12. Early/Late Check-In — should counts be lifetime totals or rolling (e.g., last 30 days)?

---

## Suggested Slack Message (Post-Meeting Summary)

> Hi team! Here's a quick summary from today's meeting (March 25):
>
> **New Feature: Class Checklists**
> We walked through the new Class Checklists section for the admin panel. Admins will be able to create and manage pre-class and post-class checklists per gym location (New York, Mexico, Madrid). Each checklist is a bundle of simple items that coaches check off. Bundles support draft/publish workflow and can be filtered by location and type.
>
> **UX Improvement: Draft/Publish Standardization**
> We're standardizing how save/publish works across Routines, FAQs, and the new Checklists. Instead of a status dropdown, every editor now has two clear buttons: "Save as Draft" and "Publish." Publishing always shows a confirmation warning that changes will be pushed to the mobile app.
>
> **New Feature: Coach Check-Out Tracking**
> We've added check-out tracking to complement the existing check-in data. The Users table now shows a "Last Check-Out" column, and the Coach Details page includes a "Last Check-Out" stat card. Data will come from geolocation on the Coach App. We discussed how the check-out trigger should work (geofence vs. manual).
>
> **New Feature: Coach Tracker**
> The Coach Details Activity Summary now shows "Sessions This Month" and "Sessions This Year" so admins can quickly monitor coach participation over time. We discussed whether these should also appear in the main Users table and whether there should be a minimum target.
>
> **Decision: Mindbody Sync Removed**
> We decided to remove the "Sync with Mindbody" button from the Coach Details page due to potential integration issues. The button will be re-introduced once the backend integration is properly scoped.
>
> **New Feature: Early/Late Check-In Stats**
> The Coach Details Activity Summary now includes "Early Check-Ins" and "Late Check-Ins" stat cards, giving admins visibility into punctuality patterns. We need to align on the definition of "early" vs. "late" and whether counts should be lifetime or rolling.
>
> **Open Items / Next Steps:**
> - [Add any decisions made or open items from the meeting]
> - [Add any follow-ups or action items]
>
> Updated IA and user stories docs are available in the repo. Let me know if you have any questions!

---

*Prepared by the Design Team — March 2026*
