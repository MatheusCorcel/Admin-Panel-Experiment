---
name: BAM Admin Panel Build
overview: "Build the BAM Labs admin panel using shadcn-admin as the base template. Phase 1: clone template and build all features now with mock data. Phase 2: integrate into Yusuf's repo when his foundation is ready."
todos:
  - id: setup-template
    content: Clone shadcn-admin template, install deps, strip demo content, rebrand to BAM Labs
    status: completed
  - id: layout-sidebar
    content: "Update sidebar/layout: BAM Labs branding, correct nav items, remove demo features"
    status: completed
  - id: auth-flow
    content: "Build Account Creation 0.0: email input, OTP verification, onboarding"
    status: completed
  - id: users-feature
    content: "Build Users 1.0: table, filters, search, row actions + Invite User 1.1.0 modal"
    status: completed
  - id: user-details
    content: Build Coach Details 1.2.0 and Admin Details 1.3.0 pages
    status: completed
  - id: routines-feature
    content: "Build Routines 2.0: library table + Routine Details 2.1.0 + Routine Editor 2.1.1 + Exercise Editor 2.1.1.1"
    status: completed
  - id: faqs-feature
    content: "Build FAQs 3.0: reorderable list + FAQ Editor 3.1 modal"
    status: completed
  - id: feedback-feature
    content: "Build Feedback 4.0: inbox table + Feedback Detail 4.1 drawer"
    status: completed
  - id: settings-feature
    content: "Build Settings 5.0: profile, password, notifications, studio settings, sign out"
    status: completed
  - id: polish-handoff
    content: "Polish: verify all flows, empty states, confirmations, document mock vs. real API endpoints"
    status: completed
  - id: integrate-yusuf
    content: "Phase 2: Coordinate with Yusuf to integrate features into the real BAM Labs repo"
    status: pending
isProject: false
---

# BAM Labs Admin Panel -- Build Plan

## Context

Arthur (tech lead) confirmed: **don't replicate Versity's Ruby/Active Admin pattern**. Yusuf (backend dev) is building a Go backend foundation using **shadcn-admin** as the UI base. We start now by cloning the same template and building all features with mock data. When Yusuf's foundation is ready, the feature code (components, schemas, types) transfers directly since it's the same stack.

**Source of truth for features:** Our validated IA docs:

- `docs/web-admin-ia.md` -- full IA structure
- `docs/web-admin-sitemap.md` -- screen-by-screen content specs
- `admin-panel-prototype.html` -- working lo-fi prototype for flow reference

---

## Phase 1: Build Now (No Yusuf dependency)

Clone the open-source shadcn-admin template, strip demo content, build all BAM Labs features with mock data. This gives us a working React app for the client demo AND production-quality code that transfers into the real repo later.

### What transfers directly to Yusuf's repo later:

- All feature modules (components, forms, tables, modals)
- Zod schemas and TypeScript types
- TanStack Table column definitions and filter configs
- Mock data structures (match future API shapes)

### What will need adjustment later:

- API service layer (swap mocks for real endpoints)
- Auth provider (plug into Yusuf's auth strategy)
- Minor routing tweaks (if his conventions differ)

---

## Phase 2 (Later): Integrate with Yusuf

When Yusuf's foundation is ready:

1. Clone BAM Labs repo, checkout his branch
2. Copy feature modules into his project structure
3. Replace mock service layer with real API calls
4. Adapt auth flow to his provider
5. Test end-to-end with staging backend

---

## Build Features

The shadcn-admin template structure organizes code as:

```
src/
  features/         -- feature modules (one per IA section)
  components/       -- shared components (data-table, layout, UI)
  routes/           -- TanStack Router file-based routes
  lib/              -- utilities
  stores/           -- Zustand state
```

### Expected tech stack (from shadcn-admin):

- **UI**: shadcn/ui (TailwindCSS + Radix UI)
- **Routing**: TanStack Router
- **Tables**: TanStack React Table
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand
- **Icons**: Lucide Icons
- **HTTP**: Axios or fetch (depends on Yusuf's setup)

### Feature Modules to Build

Each feature maps directly to our IA. For endpoints Yusuf hasn't built yet, we create the UI with mock data and a clear service layer that's trivial to swap for real API calls.

#### 2a. Sidebar + Layout

- Update sidebar nav items: Users, Routines, FAQs, Feedback, Settings
- BAM Labs branding (logo, name)
- Remove demo items (Apps, Chats, Tasks, Dashboard)

#### 2b. Account Creation (0.0)

- Route: `/sign-in` (email input), `/otp` (OTP verification), `/onboarding` (profile setup)
- shadcn-admin already has OTP and sign-in templates in `src/features/auth/`
- Adapt to match our spec: email-only (no password), OTP, then onboarding (name, photo, gender, phone)

#### 2c. Users (1.0)

- Route: `/users`
- shadcn-admin already has a full users feature in `src/features/users/` with table, dialogs, invite, delete
- Adapt columns: Name, Role (Admin/Coach/Head Coach), Email, Location, Last Check In, Missed, Completed, Status
- Add row actions: View, Edit, Remove
- Filters: Role, Status, Sort options
- Search: name or email

#### 2d. User Detail Pages

- Routes: `/users/:id/coach` (1.2.0), `/users/:id/admin` (1.3.0)
- New pages (not in shadcn-admin template) -- build from scratch
- Coach Details: profile header, general details, activity summary (Classes Completed, Missed, Early/Late Check-in), View Feedbacks button, More Actions dropdown
- Admin Details: same layout but no class metrics, only "Last Check-in Online"

#### 2e. Invite User (1.1.0)

- Modal/dialog from Users page
- shadcn-admin has `users-invite-dialog.tsx` -- adapt it
- Fields: email, role selector (Admin/Coach/Head Coach), email template preview

#### 2f. Routines (2.0)

- Route: `/routines`
- New feature module: table with Name, Type, Status, Exercise Count, Created By
- Filters: Type, Status, Sort by Last Updated
- Row actions: View, Edit, Duplicate, Delete (with confirmation)

#### 2g. Routine Details (2.1.0)

- Route: `/routines/:id`
- Read-only detail page: header with name/type/status/metadata, exercise table
- Actions: Edit (goes to editor), Publish/Unpublish, Duplicate, Delete

#### 2h. Routine Editor (2.1.1)

- Route: `/routines/:id/edit`
- Editable inline name, type selector, status badge
- Exercise list with drag-to-reorder, edit/remove per row
- Add Exercise button (select existing or create new)
- Publish confirmation modal

#### 2i. Exercise Editor (2.1.1.1)

- Modal from Routine Editor
- Fields: Name, Sets, Reps, Recommended Weight + unit, Coach Cues textarea

#### 2j. FAQs (3.0)

- Route: `/faqs`
- Reorderable list (drag and drop): Question, Answer Preview, Category, Status
- Row actions: Edit, Publish/Unpublish, Archive
- Filters: Category, Status

#### 2k. FAQ Editor (3.1)

- Modal from FAQs page
- Fields: Question (text), Answer (rich text), Category (dropdown with create new), Status toggle
- Actions: Save, Archive, Cancel

#### 2l. Feedback (4.0)

- Route: `/feedback`
- Table: Date, Coach, Class Type, Class Date, Preview, Status
- Filters: Date range, Coach, Class Type, Status (New/Reviewed)
- Search: keyword
- Row actions: Mark as Reviewed, View Coach Profile

#### 2m. Feedback Detail (4.1)

- Drawer/sheet component (slides in from right)
- Full feedback text, class info, coach info with link, actions

#### 2n. Settings (5.0)

- Route: `/settings`
- shadcn-admin already has settings with profile/notifications/appearance
- Adapt to our spec: Profile Management, Change Password, Notification Preferences, Studio Settings, Sign Out

---

## Phase 3: Polish and Handoff

- Verify all navigation flows match the IA
- Ensure confirmation modals on all destructive actions
- Toast notifications on actions (save, delete, invite, etc.)
- Empty states for all tables
- Responsive sidebar behavior
- Document which endpoints are mocked vs. connected to real API

---

## Key Decision: Mock Data Strategy

For any API endpoint Yusuf hasn't built yet, create a service layer pattern:

```typescript
// src/services/users.ts
export async function getUsers(): Promise<User[]> {
  // TODO: Replace with real API call
  // return api.get('/admin/users')
  return MOCK_USERS
}
```

This lets us build the full UI now while making the API swap trivial later.