# Client Meeting – Discussion Points

**Date:** Tomorrow  
**Purpose:** Present BAM Labs Admin Panel prototype and align on open items.

---

## Demo Walkthrough

Present the prototype in this order:

1. **Auth Flow** – Sign In (email) → OTP verification. Invite-only, no passwords.
2. **Users** – List with filters (role, status), Invite Coach dialog, User Detail (profile + activity + actions).
3. **Routines** – Library table, Routine Detail (read-only), Routine Editor (add/edit/reorder exercises, save draft / publish), Exercise Library.
4. **FAQs** – List with categories, Add/Edit FAQ dialog.
5. **Feedback** – Inbox table with filters, Feedback Detail sheet with Mark as Reviewed.
6. **Settings** – Profile, Notifications, Studio Settings.

---

## Open Points to Discuss

### 1. Mindbody Integration (Critical)

- [ ] **Which data fields sync from Mindbody?**
  - Coach name, phone, email?
  - Class schedule and class types?
  - Studio/location info?
  - Client (athlete) data for station maps?
- [ ] **When does sync run?**
  - Real-time via webhooks?
  - Scheduled (e.g. every X minutes/hours)?
  - Manual trigger from admin panel?
- [ ] **What happens when Mindbody data conflicts with local data?**
  - Does Mindbody always win (overwrite)?
  - Are there fields that are admin-editable and should NOT be overwritten?
- [ ] **Are class metrics (completed, missed) pulled from Mindbody or tracked internally?**
  - The Users table shows "Classes Completed" and "Classes Missed" — where does this data come from?
- [ ] **Coach profile editing** – In the Coach App, the name field is "editable unless synced from Mindbody." What determines if a coach is synced?

### 2. Head Coach Access Model

- [ ] **Does Head Coach get admin panel access?** – Currently assumed Head Coaches access both the admin panel and the coach app. Confirm.
- [ ] **If yes, do they see all admin features or a subset?** – Current Access Control Matrix is admin-only for all features. If Head Coaches get partial access, which features?
- [ ] **Can Head Coaches invite other users?** – Or is that admin-only?

### 3. User Profile Edit Rules

- [ ] **Confirm: admins cannot edit user profiles.** – Only users change their own info; coach data synced from Mindbody would be overwritten on next sync anyway.
- [ ] **What about admin profiles?** – Admin data is NOT from Mindbody. Can one admin edit another admin's profile, or only self-edit?

---

## Assumptions Already Baked In

Confirm or flag any of these during the meeting:

- [ ] Web Admin is **admin-only** (coaches use the Coach App exclusively)
- [ ] **OTP auth only**, no password-based authentication
- [ ] **Invite-only** access, no public registration
- [ ] Roles: **Admin, Coach, Head Coach** (role assigned at invite time)
- [ ] **Draft-first** content workflow for Routines and FAQs
- [ ] Feedback is **review/triage only** — no analytics dashboards in MVP
- [ ] Exercise Library coach cues are **defaults**; each routine entry can override them
- [ ] **Mindbody is the source of truth** for schedule/class data (synced, not duplicated)

---

## Meeting Summary

> We built a working prototype of the admin panel covering all MVP screens: Auth (sign-in + OTP), Users (list, detail, invite), Routines (library, detail, editor, exercise library), FAQs (list, editor), Feedback (inbox, detail), and Settings (profile, notifications, studio).
>
> The prototype uses mock data with a service layer ready for real API integration. The same tech stack (React, Vite, TanStack Router, shadcn/ui) will be used in production.
>
> **Open items needing client input:**
> 1. Mindbody integration scope — which fields sync, frequency, conflict handling
> 2. Head Coach access model — admin panel access yes/no, feature subset
> 3. User profile edit rules — confirm admins cannot edit user profiles
>
> **Next steps after alignment:** Hand off prototype to dev team, begin API integration, swap mock data for real endpoints.

---

## Assumptions to Review
- **Head Coach access** – Currently assumed Head Coaches have access to both the admin 
panel and the coach profile on the app. Verify with client.
- **User profile edits** – Only users can change their own information. Admins cannot 
edit user profiles. Coach/Head Coach data is synced from Mindbody.

## Notes

_Add more discussion points as needed._
