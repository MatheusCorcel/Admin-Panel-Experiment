# BAM Labs Web Admin — User Stories & Tasks

**Version:** 2.0 | **Last Updated:** March 2026  
**Audience:** Development team  
**Scope:** Everything currently prototyped in the admin panel, documented as shippable stories with explicit notes on what is built vs. what still needs backend wiring.

**Legend**
- ✅ Built in prototype (UI complete)
- 🟡 Partial (UI exists, logic or data not wired)
- ❌ Not built yet

**Role in all stories:** Admin (the Web Admin is admin-only; coaches and head coaches use the Coach App exclusively)

---

## Table of Contents

1. [Authentication & Onboarding](#0-authentication--onboarding)
2. [Global Shell — Navigation & Theme](#global-shell--navigation--theme)
3. [Users](#1-users)
4. [Routines](#2-routines)
5. [Exercise Library](#22-exercise-library)
6. [FAQs](#3-faqs)
7. [Feedback](#4-feedback)
8. [Class Checklists](#5-class-checklists)
9. [Settings](#6-settings)
10. [Contact Messages](#7-contact-messages)

---

## 0. Authentication & Onboarding

### Epic: Invite-only, OTP-based access

---

**US-0.1 — Sign In** ✅

> As an admin, I want to sign in with my email address so that I can access the admin panel.

**Acceptance Criteria**
- Email input is displayed on the sign-in page
- Submitting redirects me to OTP verification
- If I arrived via an invite link with a `redirect` query param, I am sent to that destination after signing in
- Invalid or expired OTP shows an error

**Tasks**
- [x] Sign-in page with email input (`/sign-in`)
- [x] OTP page (`/otp`)
- [x] `redirect` search param support on sign-in route
- [ ] Wire OTP to real email delivery service
- [ ] Handle expired/invalid OTP states with UI feedback

---

**US-0.2 — Onboarding (first sign-in)** 🟡

> As a newly invited user, I want to complete a short onboarding flow so that my profile is set up before I access the admin.

**Acceptance Criteria**
- Prompted to enter: Name, Profile Photo, Gender (optional), Phone (optional)
- Role is already assigned (set at invite time, not during onboarding)
- Email is pre-filled and read-only
- Completing onboarding lands me on the Users page

**Tasks**
- [x] Auth layout and sign-in UI complete
- [ ] Build onboarding step(s) after first OTP verification
- [ ] Persist onboarding data to user profile

---

## Global Shell — Navigation & Theme

**US-G.1 — Sidebar Navigation** ✅

> As an admin, I want a persistent sidebar so that I can navigate between all major sections of the app.

**Acceptance Criteria**
- Sidebar shows: Users, Routines, FAQs, Feedback, Messages, Checklists, Settings
- Active item is highlighted
- Sidebar is collapsible on smaller screens

**Tasks**
- [x] Sidebar component with nav items
- [x] Active route highlighting
- [x] Collapsible sidebar behavior

---

**US-G.2 — Command Palette** ✅

> As an admin, I want a keyboard-accessible command palette so that I can navigate quickly without using the mouse.

**Acceptance Criteria**
- Opens with `⌘K` (or equivalent shortcut)
- Lists all main navigation destinations
- Includes theme switching (Light / Dark / System)
- Selecting an item navigates to that page

**Tasks**
- [x] `CommandDialog` with navigation items
- [x] Theme switcher commands
- [ ] Add search for users, routines, exercises across sections

---

**US-G.3 — Dark / Light Theme** ✅

> As an admin, I want to switch between light, dark, and system themes so that the interface matches my preference.

**Acceptance Criteria**
- Theme toggle accessible from the top bar and command palette
- Selection persists across sessions

**Tasks**
- [x] Theme switcher component
- [x] System / Light / Dark options
- [ ] Persist preference to user settings (currently in-memory only)

---

**US-G.4 — Profile Dropdown & Sign Out** ✅

> As an admin, I want to access my profile and sign out from any page.

**Acceptance Criteria**
- Profile dropdown shows name and role
- Sign Out triggers a confirmation dialog
- Confirming signs me out and returns to the sign-in page

**Tasks**
- [x] Profile dropdown in top bar
- [x] Sign-out confirmation dialog
- [ ] Wire sign-out to real auth session invalidation

---

## 1. Users

### Epic: Coach & Admin User Management

---

**US-1.1 — View Users List** ✅

> As an admin, I want to see all platform users in a table so that I can get an overview of the team.

**Acceptance Criteria**
- Table shows: Name, Email, Role, Status, Classes Completed, Classes Missed, Last Check-in
- Default sort is by most recent activity
- Pagination with configurable page size

**Tasks**
- [x] Users table with all columns
- [x] Pagination with URL state
- [x] Column visibility toggle ("View" dropdown)

---

**US-1.2 — Filter & Search Users** ✅

> As an admin, I want to filter and search users so that I can find a specific person quickly.

**Acceptance Criteria**
- Filter by Role (Admin / Coach / Head Coach)
- Filter by Status (Active / Inactive)
- Text search by Name
- Filters are reflected in the URL (shareable/bookmarkable)
- "Reset" clears all filters

**Tasks**
- [x] Faceted filters for role and status
- [x] Name text search
- [x] URL-synced filter state
- [x] Reset button

---

**US-1.3 — Invite a User** 🟡

> As an admin, I want to invite a new coach or admin by email so that they can access the platform.

**Acceptance Criteria**
- "Invite Coach" button opens a modal
- Form requires: Email, Role (Admin / Coach / Head Coach)
- Submitting sends an invite email with a sign-up link
- Success shows a toast confirmation

**Tasks**
- [x] Invite dialog UI with email + role inputs
- [x] Success toast on submit
- [ ] Wire form to real invite/email API
- [ ] Handle duplicate email / already-invited error states

---

**US-1.4 — View User Details** ✅

> As an admin, I want to click on a user to see their full profile so that I can review their activity.

**Acceptance Criteria**
- Clicking a user's name navigates to `/users/:userId`
- Detail page shows: Photo, Name, Email, Location, Role badge, Status badge
- Activity summary: Classes Completed, Classes Missed, Last Check-in
- Back navigation returns to Users list

**Tasks**
- [x] `UserDetail` page at `/users/$userId`
- [x] Profile header with all fields
- [x] Activity summary section
- [x] Back navigation link

---

**US-1.5 — Change a User's Role** 🟡

> As an admin, I want to change a user's role so that I can promote or demote them as needed.

**Acceptance Criteria**
- Role options: Admin, Coach, Head Coach
- Selected via a radio group on the user detail page
- Change triggers a confirmation dialog
- Confirming shows a success toast

**Tasks**
- [x] Radio group for role selection on user detail
- [x] Confirmation dialog UI
- [x] Success toast
- [ ] Persist role change to backend

---

**US-1.6 — Deactivate / Activate a User** 🟡

> As an admin, I want to deactivate or reactivate a user account so that I can control platform access.

**Acceptance Criteria**
- Action button on user detail page (contextual: "Deactivate" if active, "Activate" if inactive)
- Requires confirmation modal with a warning message
- Status badge updates after confirmation

**Tasks**
- [x] Deactivate/activate button on user detail
- [x] Confirmation dialog UI
- [x] Toast feedback
- [ ] Persist status change to backend
- [ ] Update status badge reactively after change

---

**US-1.7 — Delete a User** 🟡

> As an admin, I want to delete a user account so that I can permanently remove someone from the platform.

**Acceptance Criteria**
- Delete option available in row actions dropdown on the users table
- Confirmation dialog warns that the action is irreversible
- User is removed from the list after confirming

**Tasks**
- [x] Delete option in row actions dropdown
- [x] Confirmation dialog
- [x] Toast feedback
- [ ] Wire delete to backend API
- [ ] Remove row from table reactively

---

**US-1.8 — View Coach's Feedback History** 🟡

> As an admin, I want a shortcut from a coach's profile to their feedback history so that I can quickly review their submissions.

**Acceptance Criteria**
- "View Feedback History" button on the coach detail page
- Clicking navigates to Feedback with coach filter pre-applied

**Tasks**
- [x] Shortcut button exists on user detail page
- [ ] Pass coachId as a filter to the feedback route on click

---

**US-1.9 — Coach Check-Out Tracking** ✅

> As an admin, I want to see when a coach left the gym so that I can monitor attendance and session durations alongside check-in data.

**Acceptance Criteria**
- "Last Check-Out" column added to the Users table, right after "Last Check-In"
- Format matches Last Check-In (MM/dd/yyyy hh:mm a); displays a dash when null
- Coach Details Activity Summary includes a "Last Check-Out" stat card
- Check-out times are recorded via geolocation on the Coach App (data flows from mobile → backend → admin panel)

**Tasks**
- [x] Add `lastCheckOut` nullable date field to User schema
- [x] Populate mock data with check-out timestamps for coaches (admins get null)
- [x] Add "Last Check-Out" column to the Users table
- [x] Add "Last Check-Out" stat card to Coach Details Activity Summary
- [ ] Wire to backend API (geolocation-based check-out event)

---

**US-1.10 — Coach Tracker (Monthly/Yearly Sessions)** ✅

> As an admin, I want to see how many workout sessions a coach has completed in the current month and year so that I can keep tabs on their participation.

**Acceptance Criteria**
- Coach Details Activity Summary includes a "Sessions This Month" stat card
- Coach Details Activity Summary includes a "Sessions This Year" stat card
- Admins show `0` for both fields (they don't teach classes)
- Activity Summary grid uses a balanced 3-column layout to accommodate the 6 stat cards

**Tasks**
- [x] Add `sessionsThisMonth` and `sessionsThisYear` number fields to User schema
- [x] Populate mock data with realistic session counts
- [x] Add "Sessions This Month" and "Sessions This Year" stat cards to Coach Details Activity Summary
- [x] Adjust grid layout from 4-column to 3-column (later revised to 4-column to accommodate early/late check-in stats)
- [ ] Wire to backend API (aggregate session data by month/year)

---

**US-1.11 — Early/Late Check-In Tracking** ✅

> As an admin, I want to see how many times a coach checked in early or late so that I can identify patterns in punctuality.

**Acceptance Criteria**
- Coach Details Activity Summary includes an "Early Check-Ins" stat card
- Coach Details Activity Summary includes a "Late Check-Ins" stat card
- Both cards are placed after "Classes Missed" in the grid
- Activity Summary grid uses a 4-column layout (8 cards across 2 rows)
- Admins show `0` for both fields

**Tasks**
- [x] Add `earlyCheckIns` and `lateCheckIns` number fields to User schema
- [x] Populate mock data with realistic values for coaches
- [x] Add "Early Check-Ins" and "Late Check-Ins" stat cards to Coach Details Activity Summary
- [x] Adjust Activity Summary grid to 4-column layout
- [ ] Wire to backend API (derive from check-in timestamp vs. scheduled class start time)

---

**US-1.12 — Remove Mindbody Sync Button** ✅

> As an admin, I want a clean Coach Details page without a broken Mindbody sync button so that the UI only shows features that are functional.

**Acceptance Criteria**
- "Sync with Mindbody" button and its surrounding description text are removed from the Coach Details page

**Tasks**
- [x] Remove Mindbody sync section from `user-detail.tsx`

---

## 2. Routines

### Epic: Workout Routine Management

---

**US-2.1 — View Routines List** ✅

> As an admin, I want to see all routines in a table so that I can manage the workout library.

**Acceptance Criteria**
- Table shows: Name, Type, Status, Exercise Count, Created By
- Pagination with URL state

**Tasks**
- [x] Routines table with all columns
- [x] Pagination with URL state

---

**US-2.2 — Filter & Search Routines** ✅

> As an admin, I want to filter and search routines so that I can find a specific routine quickly.

**Acceptance Criteria**
- Filter by Type (Push / Pull / Legs / Full Body)
- Filter by Status (Draft / Published)
- Text search by Name
- Filters reflected in URL

**Tasks**
- [x] Faceted filters for type and status
- [x] Name text search
- [x] URL-synced filter state
- [x] Reset button

---

**US-2.3 — View Routine Details** ✅

> As an admin, I want to click on a routine to see its full details and exercise list so that I can review it before editing or publishing.

**Acceptance Criteria**
- Detail page at `/routines/:routineId`
- Shows: Name, Type, Status badge, Last Updated, Created By
- Read-only exercise table with: Order, Name, Entry Type, Sets, Reps, Weight, Coach Cues
- Actions available: Edit, Publish/Unpublish, Duplicate, Delete

**Tasks**
- [x] `RoutineDetail` page
- [x] Metadata header
- [x] Read-only exercise table
- [x] Edit link → Routine Editor
- [x] Action buttons (publish/unpublish/duplicate/delete with confirmation)

---

**US-2.4 — Create a New Routine** 🟡

> As an admin, I want to create a new routine so that coaches can use it in classes.

**Acceptance Criteria**
- "Create Routine" button navigates to `/routines/new/edit`
- I can set: Name, Type
- Routine starts in Draft status
- I can add exercises before saving

**Tasks**
- [x] Create Routine button in page header
- [x] Routine Editor supports `routineId === 'new'`
- [ ] Persist new routine to backend on Save

---

**US-2.5 — Edit a Routine** 🟡

> As an admin, I want to edit an existing routine's name, type, and exercises so that I can keep it up to date.

**Acceptance Criteria**
- Edit button navigates to `/routines/:routineId/edit`
- Name is editable inline (large text input)
- Type is selectable via dropdown
- Exercise list is editable (add, reorder, remove)
- "Save Draft" saves without publishing
- Changes are reflected on the detail page after saving

**Tasks**
- [x] Routine Editor page at `/routines/$routineId/edit`
- [x] Inline name edit
- [x] Type selector dropdown
- [x] Exercise table with add/edit/remove/reorder
- [x] Save Draft and Publish buttons with confirmation
- [ ] Persist changes to backend on Save
- [ ] Load existing routine data from backend on mount

---

**US-2.6 — Publish / Unpublish a Routine** 🟡

> As an admin, I want to publish a routine so that coaches can see it in the app, and unpublish it to hide it.

**Acceptance Criteria**
- Publish requires a confirmation dialog (warns coaches will see it)
- Status badge changes to "Published" after confirming
- Can be unpublished from the detail page or row actions

**Tasks**
- [x] Publish confirm dialog
- [x] Unpublish action
- [x] Toast feedback
- [ ] Persist status change to backend

---

**US-2.7 — Duplicate a Routine** 🟡

> As an admin, I want to duplicate an existing routine so that I can use it as a starting point for a new one.

**Acceptance Criteria**
- "Duplicate" option in row actions and detail page actions
- Creates a copy with a modified name (e.g., "Push Day A (Copy)")
- Duplicate starts in Draft status
- I'm taken to the new routine's editor

**Tasks**
- [x] Duplicate option in row actions dropdown (UI only)
- [ ] Implement duplication logic
- [ ] Navigate to duplicated routine's editor

---

**US-2.8 — Delete a Routine** 🟡

> As an admin, I want to delete a routine so that I can remove outdated or incorrect ones.

**Acceptance Criteria**
- Delete option in row actions and detail page actions
- Confirmation dialog warns the action is irreversible
- Routine is removed from the list after confirming

**Tasks**
- [x] Delete option in row actions and detail page
- [x] Confirmation dialog
- [x] Toast feedback
- [ ] Wire to backend API
- [ ] Remove row from list reactively

---

**US-2.9 — Add an Exercise to a Routine** ✅

> As an admin, I want to add exercises to a routine so that I can build the workout plan.

**Acceptance Criteria**
- "Add Exercise" button opens the Exercise Editor modal
- I can choose Single or Superset entry type (segmented control)
- For Single: Name (autocomplete), Sets, Reps, Recommended Weight, Coach Cues
- For Superset: Exercise A and Exercise B, each with the same fields; sections are collapsible
- Exercise Name autocomplete searches the Exercise Library; selecting auto-fills Coach Cues
- Coach Cues field is a mini rich-text editor supporting bullet points and bold
- Saving adds the exercise to the routine's list

**Tasks**
- [x] Exercise Editor dialog with Single / Superset toggle
- [x] Exercise name autocomplete from library
- [x] Auto-fill coach cues on exercise selection
- [x] Coach cues rich text editor (Tiptap, bullet + bold)
- [x] Collapsible sections for Exercise A / B in superset
- [x] Modal max height with internal scroll

---

**US-2.10 — Edit an Exercise in a Routine** ✅

> As an admin, I want to edit an existing exercise entry in a routine so that I can correct details.

**Acceptance Criteria**
- Edit button on each exercise row opens the Exercise Editor modal pre-filled
- I can change any field
- Saving updates the entry in the list

**Tasks**
- [x] Edit button per exercise row
- [x] Modal pre-fills with existing exercise data
- [x] Save updates local routine state

---

**US-2.11 — Reorder Exercises in a Routine** 🟡

> As an admin, I want to reorder exercises in a routine so that they follow the intended workout sequence.

**Acceptance Criteria**
- Up / Down arrow buttons on each exercise row change its order
- Order number column updates accordingly

**Tasks**
- [x] Up / Down reorder buttons on exercise rows
- [ ] Drag-and-drop reorder (specified in IA but not yet built)

---

**US-2.12 — Remove an Exercise from a Routine** 🟡

> As an admin, I want to remove an exercise from a routine so that I can clean up incorrect entries.

**Acceptance Criteria**
- Remove button on each exercise row
- Confirmation required before removal
- Exercise disappears from the list after confirming

**Tasks**
- [x] Remove button on each exercise row
- [x] Confirmation dialog
- [ ] Persist removal to backend

---

## 2.2 Exercise Library

### Epic: Exercise Template Management

---

**US-EL.1 — View Exercise Library** ✅

> As an admin, I want to browse the exercise library so that I can see all available exercise templates.

**Acceptance Criteria**
- Table shows: Exercise Name, Muscle Group, Coach Cues (preview)
- Accessible via "Exercise Library" button on the Routines page header
- Back navigation returns to Routines

**Tasks**
- [x] Exercise Library page at `/routines/exercises`
- [x] Table with Name, Muscle Group, Coach Cues preview
- [x] "Exercise Library" button on Routines header
- [x] Back link to Routines

---

**US-EL.2 — Search & Filter the Exercise Library** ✅

> As an admin, I want to search and filter exercises so that I can find a template quickly.

**Acceptance Criteria**
- Search by Name
- Filter by Muscle Group (Chest / Back / Shoulders / Arms / Legs / Core / Full Body)
- Column visibility toggle

**Tasks**
- [x] Name search
- [x] Muscle Group faceted filter
- [x] Column visibility ("View" toggle)

---

**US-EL.3 — Add an Exercise Template** 🟡

> As an admin, I want to add a new exercise to the library so that coaches can use it with pre-filled coach cues.

**Acceptance Criteria**
- "Add Exercise" button opens the Exercise Template Editor modal
- Required fields: Name, Muscle Group
- Optional: Coach Cues (rich text editor with bullet + bold support)
- Saving adds the template to the library

**Tasks**
- [x] Add Exercise button and dialog UI
- [x] Form with Name, Muscle Group, Coach Cues (rich text editor)
- [x] Client-side state update on save
- [ ] Persist new template to backend

---

**US-EL.4 — Edit an Exercise Template** 🟡

> As an admin, I want to edit an existing exercise template so that I can update its name, muscle group, or coach cues.

**Acceptance Criteria**
- Edit option in row actions opens the modal pre-filled
- All fields are editable
- Saving updates the template in the library
- Updated coach cues auto-fill when that exercise is selected in the Exercise Editor

**Tasks**
- [x] Edit option in row actions
- [x] Modal pre-fills with existing template data
- [x] Client-side state update on save
- [ ] Persist to backend

---

**US-EL.5 — Delete an Exercise Template** 🟡

> As an admin, I want to delete an exercise template so that I can remove outdated entries.

**Acceptance Criteria**
- Delete option in row actions
- Confirmation dialog
- Template removed from the list after confirming

**Tasks**
- [x] Delete option in row actions
- [x] Confirmation dialog
- [x] Client-side removal on confirm
- [ ] Persist deletion to backend

---

**US-EL.6 — Use Exercise Library in Exercise Editor (Autocomplete)** ✅

> As an admin, when adding an exercise to a routine, I want to search the library by name so that I can quickly find and auto-fill coach cues.

**Acceptance Criteria**
- Exercise Name field in the Exercise Editor shows a searchable popover as I type
- Selecting a match fills the name and auto-populates the Coach Cues field
- I can still manually edit the Coach Cues after auto-fill
- Custom exercise names (not in library) are also accepted

**Tasks**
- [x] `ExerciseNameCombobox` with popover + filter
- [x] Auto-fill coach cues on selection
- [x] Manual entry still accepted (not locked to library)

---

## 3. FAQs

### Epic: FAQ Content Management

---

**US-3.1 — View FAQ List** ✅

> As an admin, I want to see all FAQs in a list so that I can manage the knowledge base.

**Acceptance Criteria**
- Table shows: Question, Answer Preview, Category, Status
- Pagination with URL state

**Tasks**
- [x] FAQ table with all columns
- [x] Pagination with URL state

---

**US-3.2 — Filter & Search FAQs** ✅

> As an admin, I want to filter and search FAQs so that I can find a specific entry.

**Acceptance Criteria**
- Filter by Status (Draft / Published)
- Filter by Category (Account / Classes / Billing / General)
- Text search by Question
- Filters reflected in URL

**Tasks**
- [x] Status and Category faceted filters
- [x] Question text search
- [x] URL-synced filter state

---

**US-3.3 — Add a FAQ** 🟡

> As an admin, I want to add a new FAQ so that users have access to helpful information.

**Acceptance Criteria**
- "Add FAQ" button opens the FAQ Editor modal
- Required: Question, Category, Status (Draft / Published)
- Optional: Answer
- Saving adds the FAQ to the list

**Tasks**
- [x] FAQ Editor dialog UI with all fields
- [x] Client-side state update on save
- [ ] Persist to backend

---

**US-3.4 — Edit a FAQ** 🟡

> As an admin, I want to edit an existing FAQ so that I can keep the content accurate.

**Acceptance Criteria**
- Edit option in row actions opens the FAQ Editor pre-filled
- All fields are editable
- Saving updates the FAQ in the list

**Tasks**
- [x] Edit option in row actions
- [x] Modal pre-fills with existing data
- [ ] Persist changes to backend

---

**US-3.5 — Archive a FAQ** 🟡

> As an admin, I want to archive a FAQ so that it is hidden from users without being permanently deleted.

**Acceptance Criteria**
- Archive option in row actions
- Confirmation dialog before archiving
- FAQ status changes to "Archived" and is removed from the visible list (or filtered out by default)

**Tasks**
- [x] Archive option in row actions
- [x] Confirmation dialog UI
- [x] Toast feedback
- [ ] Mutate FAQ status in state / backend
- [ ] Filter out archived FAQs from default view

---

**US-3.6 — Publish / Unpublish a FAQ** 🟡

> As an admin, I want to publish or unpublish a FAQ so that I can control what users see.

**Acceptance Criteria**
- Status toggle available in the FAQ Editor
- Status badge on the list updates accordingly

**Tasks**
- [x] Draft / Published status field in editor
- [ ] Persist status change to backend
- [ ] Reflect updated status in table row reactively

---

## 4. Feedback

### Epic: Coach Feedback Review

---

**US-4.1 — View Feedback Inbox** ✅

> As an admin, I want to see all coach feedback submissions in a table so that I can review them.

**Acceptance Criteria**
- Table shows: Location, Coach, Class Type, Class Date, Preview, Status
- Pagination with URL state

**Tasks**
- [x] Feedback table with all columns
- [x] Pagination with URL state

---

**US-4.2 — Filter & Search Feedback** ✅

> As an admin, I want to filter and search feedback so that I can find specific submissions.

**Acceptance Criteria**
- Filter by Location (BAM New York / BAM Mexico / BAM Madrid)
- Filter by Status (New / Reviewed)
- Filter by Coach
- Filter by Class Type
- Text keyword search in feedback content
- Filter by Class Date (date picker — shows only entries for that day)
- All filters reflected in URL (except date picker, which is local state)

**Tasks**
- [x] Location faceted filter
- [x] Status faceted filter
- [x] Coach faceted filter
- [x] Class Type faceted filter
- [x] Keyword text search
- [x] Date picker for class date filtering
- [x] URL-synced filter state (for faceted filters)

---

**US-4.3 — View Feedback Detail** ✅

> As an admin, I want to click on a feedback row to see its full content so that I can read the coach's notes.

**Acceptance Criteria**
- Clicking any row opens a side panel (Sheet)
- Sheet shows: Date, Status badge, Full feedback text
- Class Info section: Class Name, Class Type, Date & Time, Routine Used
- Coach Info section: Coach Name, Gym Location, link to Coach Profile
- "Mark as Reviewed" action button in the sheet

**Tasks**
- [x] Side panel Sheet opens on row click
- [x] Full feedback content display
- [x] Class Info section
- [x] Coach Info section with location
- [x] "View Coach Profile" link navigates to `/users/:coachId`
- [x] "Mark as Reviewed" button with toast

---

**US-4.4 — View Feedback Detail from Row Menu** ✅

> As an admin, I want a "View Details" option in the row actions menu so that I can open the detail panel without clicking the row.

**Acceptance Criteria**
- "View Details" option in the row actions dropdown
- Opens the same detail sheet as clicking the row

**Tasks**
- [x] "View Details" in row actions dropdown
- [x] Opens feedback detail sheet

---

**US-4.5 — Mark Feedback as Reviewed** 🟡

> As an admin, I want to mark a feedback submission as reviewed so that I can track what I've already read.

**Acceptance Criteria**
- "Mark as Reviewed" available in the row actions menu and in the detail sheet
- Status badge changes from "New" to "Reviewed"
- The change is visible in both the table and the sheet

**Tasks**
- [x] "Mark as Reviewed" in row actions and sheet
- [x] Toast feedback on action
- [ ] Mutate feedback status in state / backend
- [ ] Update status badge reactively in the table row

---

**US-4.6 — Navigate to Coach Profile from Feedback** ✅

> As an admin, I want a link from a feedback entry to the coach's profile so that I can quickly access more information about them.

**Acceptance Criteria**
- "View Coach Profile →" link in the detail sheet navigates to `/users/:coachId`
- Link is functional (uses the coach's actual ID)

**Tasks**
- [x] "View Coach Profile" link in detail sheet
- [x] Link navigates to `/users/$userId` with correct coachId

---

## 5. Class Checklists

### Epic: Pre- and Post-Class Checklist Management

---

**US-5.1 — View Checklist Bundles List** ✅

> As an admin, I want to see a list of all checklist bundles so that I can manage pre- and post-class checklists across all locations.

**Acceptance Criteria**
- Table shows: Bundle Name, Type (Pre-Class / Post-Class), Location, Status (Draft / Published), Items Count, Last Updated
- Clicking a row opens the edit modal
- Table supports pagination

**Tasks**
- [x] Checklists route at `/checklists`
- [x] Sidebar navigation entry with ClipboardCheck icon
- [x] Table component with columns and pagination
- [x] Row click opens edit modal
- [ ] Wire to backend API for checklist data

---

**US-5.2 — Filter and Search Checklist Bundles** ✅

> As an admin, I want to filter and search checklists so that I can quickly find the one I need.

**Acceptance Criteria**
- Filter by Type (Pre-Class / Post-Class) — faceted filter
- Filter by Location (BAM New York / BAM Mexico / BAM Madrid) — faceted filter
- Filter by Status (Draft / Published) — faceted filter
- Search by checklist name
- Filters are URL-synced and persist across page refreshes

**Tasks**
- [x] Type faceted filter in toolbar
- [x] Location faceted filter in toolbar
- [x] Status faceted filter in toolbar
- [x] Name search input in toolbar
- [x] URL-synced filter state via `useTableUrlState`

---

**US-5.3 — Create a New Checklist Bundle** ✅

> As an admin, I want to create a new checklist bundle so that I can define checklists for coaches at a specific location.

**Acceptance Criteria**
- "Add Checklist" button opens the bundle editor modal
- Form fields: Name (required), Type (segmented control), Location (select), Checklist Items (ordered list)
- At least one item is required
- Save as Draft or Publish via two-button footer
- Publishing triggers a confirmation warning: "All changes will be pushed to the mobile app."

**Tasks**
- [x] "Add Checklist" primary button
- [x] Bundle editor modal with react-hook-form + Zod validation
- [x] Name, Type (ToggleGroup), Location (Select) fields
- [x] Checklist items manager (add, remove, reorder)
- [x] "Save as Draft" and "Publish" two-button footer
- [x] Publish confirmation dialog
- [ ] Wire to backend API for creating bundles

---

**US-5.4 — Edit Checklist Bundle Details and Items** ✅

> As an admin, I want to edit an existing checklist bundle so that I can update its details and items.

**Acceptance Criteria**
- Clicking a row or choosing "Edit" from row actions opens the editor modal pre-filled with current data
- All fields are editable
- Items can be added, removed, or reordered
- Save as Draft or Publish with confirmation warning

**Tasks**
- [x] Edit modal pre-fills form from current row data
- [x] Item list updates (add, remove, reorder) work in edit mode
- [x] Two-button footer in edit mode
- [ ] Wire to backend API for updating bundles

---

**US-5.5 — Delete a Checklist Bundle** ✅

> As an admin, I want to delete a checklist bundle so that obsolete checklists are removed.

**Acceptance Criteria**
- "Delete" action in row dropdown
- Confirmation dialog with warning and bundle name
- Success toast after deletion

**Tasks**
- [x] Delete option in row actions dropdown
- [x] Confirmation dialog with destructive styling
- [x] Success toast on confirm
- [ ] Wire to backend API for deletion

---

**US-5.6 — Manage Checklist Items** ✅

> As an admin, I want to add, remove, and reorder items within a checklist bundle so that I can maintain accurate checklists.

**Acceptance Criteria**
- Each item is a text input with an order number
- Items can be moved up or down via reorder controls
- Items can be removed (minimum 1 item required)
- "Add Item" button appends a new blank item

**Tasks**
- [x] Ordered item list with text inputs
- [x] Up/down move controls per item
- [x] Remove button per item (disabled when only 1 item)
- [x] "Add Item" button at the bottom

---

---

## 6. Settings

### Epic: Admin Configuration & Profile

---

**US-6.1 — Edit My Profile** 🟡

> As an admin, I want to update my profile information so that my details are accurate.

**Acceptance Criteria**
- Edit: Photo, Name, Phone
- Read-only: Email, Role
- Saving shows a success toast

**Tasks**
- [x] Profile form UI with all fields
- [x] Toast feedback on submit
- [ ] Persist changes to backend
- [ ] Profile photo upload / storage

---

**US-6.2 — Manage Notification Preferences** 🟡

> As an admin, I want to control which email notifications I receive so that I only get alerts that are relevant to me.

**Acceptance Criteria**
- Toggle notifications for: New Feedback Submitted, New Invitation Accepted, Routine Published
- Changes save with a success toast

**Tasks**
- [x] Notifications form with toggles
- [x] Toast on save
- [ ] Persist preferences to backend
- [ ] Wire to actual email notification system

---

**US-6.3 — Configure Studio Settings** 🟡

> As an admin, I want to set studio-level information so that it is reflected across the platform.

**Acceptance Criteria**
- Editable: Studio Name, Studio Location, Timezone
- Saving shows a success toast

**Tasks**
- [x] Studio settings form UI
- [x] Toast on save
- [ ] Persist to backend
- [ ] Use studio timezone in date/time displays throughout app

---

**US-6.4 — Sign Out** ✅

> As an admin, I want to sign out securely so that my session is ended on this device.

**Acceptance Criteria**
- Sign Out option in profile dropdown
- Confirmation dialog before signing out
- Redirects to sign-in page after confirming

**Tasks**
- [x] Sign-out confirmation dialog
- [x] Navigation to sign-in on confirm
- [ ] Invalidate server-side session / token on sign-out

---

---

## 7. Contact Messages

### Epic: Contact Message Inbox

---

**US-7.1 — View Contact Messages Inbox** ✅

> As an admin, I want to see all contact messages from coaches and clients in a table so that I can review and respond to them.

**Acceptance Criteria**
- Table shows: Location, Name, Email, User Type, Date, Preview, Status
- Pagination with URL state
- Separate page from Class Feedback

**Tasks**
- [x] Contact Messages page at `/messages`
- [x] Sidebar navigation entry with Mail icon (between Feedback and Checklists)
- [x] Table with all columns and pagination

---

**US-7.2 — Filter & Search Contact Messages** ✅

> As an admin, I want to filter and search contact messages so that I can find specific submissions.

**Acceptance Criteria**
- Filter by Location (BAM New York / BAM Mexico / BAM Madrid)
- Filter by User Type (Client / Coach)
- Filter by Status (New / Read)
- Keyword search in message content
- Filters reflected in URL

**Tasks**
- [x] Location faceted filter
- [x] User Type faceted filter
- [x] Status faceted filter
- [x] Keyword text search
- [x] URL-synced filter state

---

**US-7.3 — View Message Detail** ✅

> As an admin, I want to click on a message row to see its full content and sender details so that I can understand what the person is asking.

**Acceptance Criteria**
- Clicking any row opens a side panel (Sheet)
- Sheet shows: Date, Status badge, Full message text
- Sender Info: Name, User Type badge, Email, Location
- If sender is a coach: "View Coach Profile →" link to `/users/:senderId`
- If sender is a client: display info only (no profile link — clients are app-only)
- "Mark as Read" action button in the sheet

**Tasks**
- [x] Side panel Sheet opens on row click
- [x] Full message content display
- [x] Sender Info section with User Type badge and Email
- [x] Conditional "View Coach Profile" link for coach senders
- [x] "Mark as Read" button with toast

---

**US-7.4 — View Message Detail from Row Menu** ✅

> As an admin, I want a "View Details" option in the row actions menu so that I can open the detail panel without clicking the row.

**Acceptance Criteria**
- "View Details" option in the row actions dropdown
- Opens the same detail sheet as clicking the row

**Tasks**
- [x] "View Details" in row actions dropdown
- [x] Opens message detail sheet

---

**US-7.5 — Mark Message as Read** 🟡

> As an admin, I want to mark a message as read so that I can track which messages I have already reviewed.

**Acceptance Criteria**
- "Mark as Read" available in the row actions menu and in the detail sheet
- Status badge changes from "New" to "Read"
- The change is visible in both the table and the sheet

**Tasks**
- [x] "Mark as Read" in row actions and sheet
- [x] Toast feedback on action
- [ ] Mutate message status in state / backend
- [ ] Update status badge reactively in the table row

---

## Cross-cutting Gaps & Known Issues

The following items were identified during the prototype review and should be addressed before shipping.

| # | Area | Issue | Priority |
|---|------|--------|----------|
| G-1 | Users | Row actions has an "Edit" option that has no corresponding dialog — the edit dialog is not mounted in `users-dialogs.tsx` | High |
| G-2 | Routines | "Duplicate" row action sets provider state but there is no follow-through: no duplicate dialog, no route, no copy logic | High |
| G-3 | Feedback | "Mark as Reviewed" shows a toast but does not update the row's status badge in the table | Medium |
| G-4 | Feedback | Date picker filter is local state (not URL-synced); refreshing the page loses the selected date | Low |
| G-5 | FAQs | "Archive" confirmation fires a toast but does not remove or update the FAQ in the list | Medium |
| G-6 | Feedback | `FeedbackPrimaryButtons` component is an empty stub (`return <div />`) — no primary action exists on the Feedback page header | Low |
| G-7 | Settings | Account, Appearance, and Display routes exist (`/settings/account`, `/settings/appearance`, `/settings/display`) but are not linked from the Settings inner nav | Low |
| G-8 | Users | Sidebar uses `url: '/'` for Users, which works only because the index route redirects to `/users` — should use `/users` directly for clarity | Low |
| G-9 | All | All data is static mock data; no backend API is wired anywhere | Critical |
| G-10 | Exercise Library | Edits and additions to exercise templates persist only for the session; refreshing resets the library to its initial mock state | High |
| G-11 | Contact Messages | "Mark as Read" shows a toast but does not update the row's status badge in the table | Medium |

---

## Implementation Priority (Suggested)

### P0 — Backend Foundation
- Authentication (real OTP delivery, session management)
- User CRUD API
- Routine CRUD API
- Exercise Library API
- FAQ CRUD API
- Feedback read + status update API
- Checklist Bundle CRUD API
- Contact Messages read + status update API

### P1 — Core Flows
- US-1.3 Invite User (email delivery)
- US-2.5 Edit Routine (persist)
- US-2.6 Publish Routine (persist)
- US-EL.3 / EL.4 / EL.5 Exercise template CRUD (persist)
- US-4.5 Mark Feedback as Reviewed (persist)
- US-5.3 / US-5.4 / US-5.5 Checklist bundle CRUD (persist)
- US-7.5 Mark Message as Read (persist)

### P2 — Completeness
- US-2.7 Duplicate Routine (implement logic + navigation)
- Fix G-1 (Users edit dialog)
- Fix G-3 (Feedback status badge after review)
- Fix G-5 (FAQ archive mutation)
- US-1.8 Feedback shortcut with pre-applied coach filter

### P3 — Polish
- US-2.11 Drag-to-reorder exercises
- URL-synced date filter for feedback (G-4)
- Persist theme preference to user settings
- Wire studio timezone throughout the app

---

*This document reflects the admin panel prototype as of March 2026.*
