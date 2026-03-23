---
name: Exercise Library Feature
overview: Add an Exercise Library — a searchable database of exercises with predefined coach cues — accessible from the Routines page, with autocomplete in the Exercise Editor dialog that auto-populates coach cues on selection.
todos:
  - id: ex-lib-data
    content: Create ExerciseTemplate schema and mock data (~45 exercises with coach cues)
    status: completed
  - id: ex-lib-page
    content: Build Exercise Library page (index, columns, table, provider, dialogs, primary buttons)
    status: completed
  - id: ex-lib-route
    content: Create route /routines/exercises/index.tsx
    status: completed
  - id: ex-lib-combobox
    content: Build exercise name combobox with auto-fill coach cues in exercise-editor-dialog.tsx
    status: completed
  - id: ex-lib-entry
    content: Add Exercise Library button to routines-primary-buttons.tsx
    status: completed
  - id: ex-lib-ia
    content: Update docs/web-admin-ia.md with Exercise Library section
    status: completed
isProject: false
---

# Exercise Library Feature

## What Gets Built

1. **Exercise Library page** (`/routines/exercises`) — manage exercises with name, muscle group, and coach cues (add, edit, delete, search)
2. **Autocomplete on name fields** in the Exercise Editor dialog — searching the library and auto-filling coach cues on selection
3. **"Exercise Library" button** on the Routines page header
4. **IA update** — `docs/web-admin-ia.md`

---

## Data Layer

### New file: `admin-panel/src/features/exercises/data/schema.ts`

```typescript
type ExerciseTemplate = {
  id: string
  name: string
  muscleGroup: 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'full_body'
  coachCues: string
}
```

### New file: `admin-panel/src/features/exercises/data/exercises.ts`

Static mock array of ~45 exercises covering all muscle groups. Examples:

- Chest: Barbell Bench Press, Incline DB Press, Cable Flyes, Dips, Pec Deck
- Back: Barbell Row, Pull-Ups, Seated Cable Row, Lat Pulldown, Face Pulls, T-Bar Row
- Shoulders: Overhead Press, Lateral Raises, Arnold Press, Rear Delt Flyes
- Arms: Barbell Curls, Hammer Curls, Tricep Pushdowns, Skull Crushers, Overhead Tricep Extension
- Legs: Back Squat, Romanian Deadlift, Leg Press, Leg Curls, Leg Extensions, Calf Raises, Bulgarian Split Squat, Hip Thrust, Deadlift
- Core: Plank, Hanging Leg Raises, Cable Crunch, Ab Wheel

All entries include a `coachCues` string written as real coaching instructions.

---

## Exercise Library Page

### New files under `admin-panel/src/features/exercises/`

- `index.tsx` — page component (same structure as Users/Routines pages)
- `data/schema.ts`, `data/exercises.ts` — (above)
- `components/exercise-library-columns.tsx` — columns: Name, Muscle Group, Coach Cues preview, Actions
- `components/exercise-library-table.tsx` — data table with name search
- `components/exercise-library-provider.tsx` — context for dialog state
- `components/exercise-template-dialog.tsx` — Add/Edit modal (name input, muscle group select, coach cues textarea)
- `components/exercise-library-dialogs.tsx` — dialog orchestration (add/edit/delete)
- `components/exercise-library-primary-buttons.tsx` — "Add Exercise" button

### New route: `admin-panel/src/routes/_authenticated/routines/exercises/index.tsx`

```tsx
export const Route = createFileRoute('/_authenticated/routines/exercises/')({
  component: ExerciseLibrary,
})
```

URL: `/routines/exercises/`

---

## Autocomplete in Exercise Editor Dialog

### Modified file: `[admin-panel/src/features/routines/components/exercise-editor-dialog.tsx](admin-panel/src/features/routines/components/exercise-editor-dialog.tsx)`

Replace the plain `<Input>` for `name` fields with an inline combobox composed from existing `Popover` + `Command` components (shadcn combobox pattern — no new UI file needed).

Behavior:

- User types → fuzzy-filters the exercises list → dropdown appears below the input
- User selects an exercise → name field filled, coach cues field auto-populated
- User can ignore suggestions and type freely (free-form entry still works)
- Applied to: `single.name`, `superset.exerciseA.name`, `superset.exerciseB.name`

The combobox will be a small reusable component created inside this file or extracted to `components/exercise-name-combobox.tsx`.

---

## Routines Page Entry Point

### Modified file: `[admin-panel/src/features/routines/components/routines-primary-buttons.tsx](admin-panel/src/features/routines/components/routines-primary-buttons.tsx)`

Add an "Exercise Library" secondary button next to "Create Routine":

```tsx
<Button variant='outline' asChild>
  <Link to='/routines/exercises'>
    <BookOpen size={16} />
    Exercise Library
  </Link>
</Button>
```

---

## IA Update

### Modified file: `[docs/web-admin-ia.md](docs/web-admin-ia.md)`

Add **Exercise Library (2.2)** under Routines:

```
├── Exercise Library (2.2)
│   ├── Table View
│   │   ├── Exercise Name
│   │   ├── Muscle Group
│   │   └── Coach Cues (preview)
│   │
│   ├── Search by Name
│   │
│   └── Row Actions
│       ├── Edit → Exercise Template Editor (modal)
│       └── Delete (with confirmation)
│
└── Exercise Template Editor (2.2.1) — Modal
    ├── Name (text input, required)
    ├── Muscle Group (select)
    ├── Coach Cues (textarea)
    └── Save / Cancel
```

Also update the Exercise Editor (2.1.1.1) notes to mention the name autocomplete and coach cue auto-population.

---

## File Summary


| Action | File                                                            |
| ------ | --------------------------------------------------------------- |
| Create | `src/features/exercises/data/schema.ts`                         |
| Create | `src/features/exercises/data/exercises.ts`                      |
| Create | `src/features/exercises/index.tsx`                              |
| Create | `src/features/exercises/components/` (5–6 files)                |
| Create | `src/routes/_authenticated/routines/exercises/index.tsx`        |
| Modify | `src/features/routines/components/exercise-editor-dialog.tsx`   |
| Modify | `src/features/routines/components/routines-primary-buttons.tsx` |
| Modify | `docs/web-admin-ia.md`                                          |


