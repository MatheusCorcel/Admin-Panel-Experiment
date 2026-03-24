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
7. New feature: Contact Messages inbox
8. UX improvement: Consistent row-click behavior across all tables
9. UX improvement: Copy-to-clipboard on email addresses
10. Documentation updates
11. Open questions & decisions needed from client

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

## 7. New Feature: Contact Messages Inbox

### What it is

A new top-level section in the admin panel that displays all messages sent by coaches and clients via the "Contact Administrator" form in the BAM Coach App (Help & Support → Contact Support, screen 4.3.2).

### How it works

- **Separate from Feedback** — Contact messages are completely separate from the post-class coach feedback. They live at `/messages` and have their own sidebar entry.
- **Message sources** — Both coaches and clients can send contact messages. Each row shows who the sender is and their type.
- **Status tracking** — Messages start as "New" and can be marked as "Read" (similar to how Feedback uses "New"/"Reviewed").

### Admin capabilities

- View all contact messages in a filterable, searchable table
- Table columns: Location, Name, Email, User Type (Client/Coach badge), Date, Message Preview, Status
- Filter by Location, User Type, and Status
- Keyword search in message content
- Click any row to open a full detail sheet (sidebar panel)
- Detail sheet shows: full message, sender info (name, type badge, email, location)
- If the sender is a **coach**: link to their coach profile in the admin panel
- If the sender is a **client**: display info only (clients are app-only users with no admin profile)
- Mark as Read from both the detail sheet and the row actions dropdown

### Where it lives

- New top-level sidebar item: "Messages" (between Feedback and Checklists), using a Mail icon
- URL: `/messages`

### Discussion points for client

- [ ] What email/notification should the admin receive when a new contact message comes in? (Currently only visible by checking the inbox)
- [ ] Should there be a way to archive or delete messages, or is "Read" status sufficient?
- [ ] Should client messages include their full profile info from the app (e.g., membership status)?

---

## 8. UX Improvement: Consistent Row-Click Behavior Across All Tables

### What changed

Row-click behavior is now consistent across every table in the admin panel. Clicking any row always leads to the detail or editor view for that item — no more dead zones where only specific cells (like the name link) were interactive.

| Table | Row-click result |
|-------|-----------------|
| Users | Navigates to user detail page (`/users/:id`) |
| Routines | Navigates to routine detail page (`/routines/:id`) |
| FAQs | Opens the FAQ editor modal |
| Exercise Library | Opens the exercise template editor modal |
| Checklists | Opens the checklist bundle editor modal (was already correct) |
| Feedback | Opens the feedback detail side panel (was already correct) |
| Contact Messages | Opens the message detail side panel (was already correct) |

The name columns in the Users and Routines tables previously used link-styled text (`<Link>`) that only navigated when clicking the name specifically. These are now plain styled text — the entire row is the interactive target, which is clearer and more predictable.

### Why

Inconsistent row-click behavior creates confusion: users learn the pattern from one table, try it on another, and nothing happens. Standardising this across all seven tables eliminates that friction.

---

## 9. UX Improvement: Copy-to-Clipboard on Email Addresses

### What changed

Email addresses throughout the admin panel now show a small copy icon when the admin hovers over them. Clicking it copies the email to the clipboard and shows a confirmation toast. A "Copied!" tooltip confirms the action.

### Where it applies (global behavior)

- **Users table** — Email column
- **User Detail page** — Email in profile header and in General Details card
- **Contact Messages table** — Email column
- **Contact Messages detail sheet** — Sender email in the Sender Info section

### Why

Admins frequently need to reach out to users (coaches, clients) via email. Making the email address one-click copyable removes friction and avoids manual selection errors.

---

## 10. Documentation Updates

The following documents are being updated to reflect these changes:

- **Information Architecture** (`../web-admin-ia.md`) — Class Checklists section, coach early/late check-in stats in Activity Summary, updated Mindbody design principle, new Contact Messages section (7.0), updated navigation model and access control matrix
- **User Stories & Tasks** (`../admin-user-stories.md`) — US-1.9 through US-1.12, US-7.1 through US-7.5 (Contact Messages), updated sidebar navigation criteria, new cross-cutting gap G-11

---

## 11. Summary of All Changes

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
| Row-click consistency | All 7 tables now navigate/open detail on row click; removed link-only cells from Users and Routines | UX improvement |
| Contact Messages | New top-level page with table (location, name, email, user type, date, preview, status) | New feature |
| Contact Messages | Detail sheet with full message and conditional coach profile link | New feature |
| Contact Messages | Mark as Read action (row actions + detail sheet) | New feature |
| Sidebar Navigation | New "Messages" entry (Mail icon, between Feedback and Checklists) | UI addition |
| Email Addresses | Copy-to-clipboard icon on hover, globally across the app | UX improvement |
| Documentation | IA and User Stories updated for all changes through US-7.5 | Documentation |

---

## 12. Open Questions for Client

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
13. Contact Messages — should the admin receive an email/push notification when a new message arrives, or is a visible "New" badge in the inbox sufficient?
14. Contact Messages — should messages be archivable/deletable, or is "Read" status the only needed state change?
15. Contact Messages — should client messages include additional app data (e.g., membership status, location) beyond name and email?

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
> **New Feature: Contact Messages Inbox**
> A new "Messages" page is now in the admin panel (between Feedback and Checklists in the sidebar). It shows all contact messages sent from the BAM app (both coaches and clients), with the sender's name, email, user type, location, date, preview, and status. Clicking a row opens the full message in a side panel. For coaches, there's a direct link to their coach profile. We have a few open questions about notifications and archiving.
>
> **UX Improvement: Copy Email on Hover**
> Email addresses throughout the admin panel now have a one-click copy button that appears on hover. This applies to the Users table, User Detail page, and the new Messages inbox. Hovering shows the copy icon; clicking copies to clipboard and confirms with a toast.
>
> **Open Items / Next Steps:**
> - [Add any decisions made or open items from the meeting]
> - [Add any follow-ups or action items]
>
> Updated IA and user stories docs are available in the repo. Let me know if you have any questions!

---

*Prepared by the Design Team — March 2026*
