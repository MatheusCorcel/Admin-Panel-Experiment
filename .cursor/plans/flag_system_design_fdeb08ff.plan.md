---
name: Flag System Design
overview: Structured review of the coach flag system concept for BAM Labs, identifying gaps, simplifying the model, and defining clear rules for scoping, lifecycle, and UX across pre-class, during-class, and post-class phases.
todos:
  - id: review-plan
    content: Review the structured flag system concept and confirm the direction before moving to design/implementation
    status: completed
isProject: false
---

# Flag System -- Concept Review and Structure

## The Core Idea (Validated)

A coach can flag clients to signal they need attention. Flags are **scoped by context** so only relevant information surfaces in each class. All coaches share visibility into flags (team-wide awareness).

---

## Two Categories of Flags

### 1. System Flags (auto-computed)

These are **derived from data** -- the system surfaces them automatically so coaches don't have to discover trends on their own.

- **New Client**: Client has fewer than 5 classes of the **current class type** (e.g., fewer than 5 Push classes). This scopes naturally: a client might be "new" to Push but experienced in Pull. Purely informational -- disappears on its own once the threshold is crossed.
- **Scale Down**: Client is consistently **decreasing** their exercise weights on their own in the app across recent sessions. This signals the coach that something may be off -- fatigue, discomfort, or loss of confidence.
- **Scale Up**: Client is consistently **increasing** their exercise weights on their own in the app across recent sessions. This signals the coach that the client is progressing and may be ready for more challenge or form attention at higher loads.

Why per class type (not total): A client with 50 Pull classes but 2 Push classes genuinely needs more attention in Push. Scale Down/Up trends are also scoped per class type -- a client scaling up in Pull doesn't mean they're scaling up in Push.

**Scale Down/Up are resolvable.** Unlike "New Client" (which is purely informational and disappears on its own), Scale Down/Up system flags exist to prompt a coach to take action. Once a coach has reviewed the trend and adjusted the client's weights, they can **resolve** the flag. This keeps the flagged clients list clean and confirms the trend was addressed.

> **Visual and communication parity**: Scale Down/Up look and feel the same whether triggered by the system or created manually by a coach. The only difference is the trigger -- the system detects a pattern from the client's app data, the coach observes something live in class. From the coach's perspective, it's the same flag with the same actions available.

### 2. Coach Flags (manually created)

These are stored records created by coaches. Each flag has:


| Field               | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| client_id           | Who is flagged                                                            |
| flag_type           | Predetermined type (see list below)                                       |
| class_type          | Scoping -- which class type this flag applies to (always set, never null) |
| exercise_id         | Optional -- if flagging for a specific exercise                           |
| note                | Optional text (added post-flag or during editing)                         |
| created_by          | Which coach created it                                                    |
| created_at          | Timestamp                                                                 |
| created_in_class_id | Which class session it was created in                                     |
| status              | active or resolved                                                        |


---

## Predetermined Coach Flag Types (for quick-flagging during class)

Keep this list **short** -- 4-5 max for a quick-tap UI.

### General Flag (no exercise attached, class-type scoped)

- **Watch Closely** -- General "keep an eye on this person." This is the **only** general coach flag. It is never tied to a specific exercise -- it signals broad awareness for a client within a class type.

### Exercise-Specific Flags (attached to a specific exercise)

- **Form Check** -- Client needs form correction on this exercise
- **Scale Down** -- Client needs weight/intensity reduction on this exercise
- **Scale Up** -- Client is ready for more challenge on this exercise
- **Alternate Needed** -- Client needs an alternative movement for this exercise (injury, limitation)

These are the "tap and done" types used during class. No notes required at flag time.

> **Key distinction**: Watch Closely is always general (exercise_id is null). The other four types are always exercise-specific (exercise_id is required). This removes ambiguity from the flagging UI -- when a coach taps "Watch Closely," no exercise selection is needed; when they tap any other type, the current exercise is auto-attached.

---

## Scoping and Visibility Rules

This is the core logic that makes the system smart:

```
When displaying flags for a client in a class:

1. Show System Flags:
   - "New Client" if client has < 5 classes of THIS class type
   - "Scale Down" if client weight trend is consistently decreasing for THIS class type
   - "Scale Up" if client weight trend is consistently increasing for THIS class type

2. Show Coach Flags where:
   - flag.class_type == current class type
   - AND flag.status == active
   - AND (flag.exercise_id IS NULL               -- general flags (Watch Closely)
          OR flag.exercise_id is in current class routine)  -- exercise-specific flags
```

In plain language:

- System flags surface automatically based on data -- "New Client" is informational only; "Scale Down/Up" can be resolved by a coach once addressed
- A "Watch Closely" flag created in Push **shows in all Push classes** (it's general, not tied to an exercise)
- An exercise-specific flag (Form Check, Scale Down, Scale Up, Alternate Needed) for "Dumbbell Press" only shows in Push classes **that include Dumbbell Press in their routine**
- If the routine is swapped and the flagged exercise is no longer in it, the flag simply does not surface -- no data is lost, it just hides

This is simple to implement: one query filter at display time.

---

## Flag Lifecycle

```
Coach Flag lifecycle:

  Created (during class, quick-tap)
     |
     v
  Active -- visible in matching classes
     |
     +--> Edited (note added, type changed) -- stays active
     |
     +--> Resolved (coach explicitly resolves it) -- moves to history

System Flag lifecycle:

  "New Client"   -- informational only, no resolve action, disappears automatically
  "Scale Down"   -- resolvable by coach once weights are adjusted
  "Scale Up"     -- resolvable by coach once weights are adjusted
```

**Key decisions**:

- **No auto-expiration** for coach flags. They stay active until a coach resolves them. This is simpler and safer -- a coach might not see a client for weeks, and the flag should still be there.
- **System Scale Down/Up are resolvable**. Once a coach adjusts the client's weights, they resolve the flag. This prevents stale trend flags from cluttering the view after the coach has already acted on them.
- **Resolution is explicit**. Coach taps "resolve" in pre-class or post-class. This prevents accidental data loss.
- **History is preserved**. Resolved flags move to history, visible in the flag details panel filtered by current class type.

---

## UX Per Phase

### Pre-Class (Screen 3.1)

- **Station Map**: Each station shows client name + flag indicator (dot/badge with count of active flags)
- **Flagged Clients Panel**: List of clients with active flags for THIS class type. Includes system flags (New Client, Scale Down, Scale Up) and coach flags.
- **Tap a client** opens Flag Detail:
  - List of active flags (type + note + who created it + when)
  - History section: resolved flags for this class type
  - Actions: Edit flag, Add note, Resolve flag, Add new flag
- **"Add new flag" from pre-class**: Requires selecting flag type, optionally selecting an exercise from the class routine, optionally adding a note. This is the detailed flow (vs. the quick flow during class).

### During Class (Screen 3.2)

Priority: **speed**. The coach is busy.

- **Station Map (floating toggle)**: Stations show flag indicators
- **Quick Flag Flow** (tap station -> tap flag type -> done):
  1. Tap a station on the map
  2. See the predetermined flag types as large tap targets
  3. Tap one -- flag is created, scoped to current class type. "Watch Closely" has no exercise. The other four auto-attach the current exercise.
  4. Done. Back to class.
- **Exercise auto-attachment**: When the coach taps an exercise-specific flag type (Form Check, Scale Down, Scale Up, Alternate Needed), the current exercise from the Exercise Card is automatically attached. When the coach taps "Watch Closely," no exercise is attached -- it's a general flag by definition.
- **View existing flags**: Tap a flagged station to see a summary (read-only during class to keep it fast). An "Edit" button is available but not the primary action.

### Post-Class (Screen 3.3)

- **Client Flag Review**: List of ALL clients who were flagged during this session (new flags from today)
- **For each flagged client**:
  - See the flag(s) created today
  - Add/edit notes (this is when coaches add context)
  - Change flag type if needed
  - Resolve flag if the issue was handled
- This is the **detail phase** -- the coach just finished class and has a moment to add context to the quick flags they created.

---

## Gaps and Decisions Identified

### 1. General vs. exercise-specific coach flags

"Watch Closely" is the **only** general coach flag (no exercise attached). All other coach flag types (Form Check, Scale Down, Scale Up, Alternate Needed) are exercise-specific. Every coach flag is still scoped to a class type -- "general" means no exercise, not "visible across all class types."

### 2. What happens when a client is not checked into a class?

Flags are attached to clients, not stations. If a flagged client doesn't show up to the next Push class, their flags should still be visible somewhere (maybe a "flagged clients not in today's class" section in pre-class, or just accessible via a search). For V1, you could skip this and only show flags for checked-in clients.

### 3. Who resolves flags?

Since all coaches see all flags: any coach can resolve any flag. This is simple but means Coach B might resolve something Coach A intended to track longer. For V1 this is fine -- trust the coaching team. You could add a confirmation ("Coach A flagged this -- resolve?") later if needed.

### 4. Flag editing audit trail

When a flag is edited (note changed, type changed), should the system track who edited it and when? For V1, skip it -- just store the latest state. Add audit logging later if needed.

### 5. Maximum flags per client per class type

Should there be a limit? Recommendation: no hard limit, but the UI should handle 1-5 flags gracefully. More than 5 active flags on one client for one class type probably means something else is going on.

---

## Simplified Data Model

```
SystemFlag -- "New Client" (computed, not stored):
  - rule: client.class_count[class_type] < 5
  - No resolve action. Disappears automatically.

SystemFlag -- "Scale Down" / "Scale Up" (computed, resolvable):
  - rule: client weight trend is consistently decreasing/increasing for THIS class type
  - Resolvable by coach (stores resolved_by + resolved_at to suppress until trend recurs)
  - Same visuals and actions as coach Scale Down/Up flags

CoachFlag (stored):
  - id
  - client_id
  - class_type        (required -- "Push", "Pull", etc.)
  - exercise_id       (null for Watch Closely; required for Form Check, Scale Down, Scale Up, Alternate Needed)
  - flag_type         (enum: watch, form_check, scale_down, scale_up, alternate_needed)
  - note              (optional text)
  - status            (active | resolved)
  - created_by        (coach_id)
  - created_at
  - resolved_by       (coach_id, nullable)
  - resolved_at       (nullable)
  - created_in_class  (class_id -- for history tracking)
```

---

## Final Flag System Structure

### System Flags (auto-computed)


| Flag       | Trigger                                                        | Scoping        | Resolvable                                    |
| ---------- | -------------------------------------------------------------- | -------------- | --------------------------------------------- |
| New Client | Client has < 5 classes of this class type                      | Per class type | No -- disappears automatically                |
| Scale Down | Client consistently decreasing weights on their own in the app | Per class type | Yes -- coach resolves after adjusting weights |
| Scale Up   | Client consistently increasing weights on their own in the app | Per class type | Yes -- coach resolves after adjusting weights |


### Coach Flags (manual, stored)


| Flag             | Scope             | exercise_id | Purpose                                                     |
| ---------------- | ----------------- | ----------- | ----------------------------------------------------------- |
| Watch Closely    | General           | null        | "Keep an eye on this person" -- the only general coach flag |
| Form Check       | Exercise-specific | required    | Client needs form correction on this exercise               |
| Scale Down       | Exercise-specific | required    | Coach observed client needs to reduce on this exercise      |
| Scale Up         | Exercise-specific | required    | Coach observed client is ready for more on this exercise    |
| Alternate Needed | Exercise-specific | required    | Client needs an alternative movement (injury, limitation)   |


### Scale Down/Up: Same Flag, Two Triggers

Scale Down and Scale Up use the **same visuals, same copy, and same coach actions** regardless of whether the system or a coach created them. The only difference is the trigger:

- **System trigger**: Auto-detected from the client's weight trends in the app across recent sessions. The system surfaces the flag so the coach doesn't have to spot the pattern themselves.
- **Coach trigger**: Manually created during class for a specific exercise. The coach observed something live.

Both are resolvable. A coach resolves a Scale Down/Up flag once they've reviewed the situation and adjusted the client's weights. Both can coexist on the same client -- a system-triggered trend flag and a coach-created exercise-specific flag provide complementary information.