# Exercise Equipment Configuration

**Status:** Implemented in prototype
**Scope:** Admin Panel Experiment — Exercise Library editor

## Context

`equipment` already exists in the expected exercise data shape and can be one of `barbell`, `dumbbell`, `cable`, `machine`, or `bodyweight`. Exercises created in the admin currently have no equipment selector, so they fall back to `none` in the prototype. Equipment must be selected explicitly; it must not be inferred from the exercise name (for example, Deadlift, Russian Twist, Weighted Sit Ups, Pullover, Reverse Flys, and Jefferson Curl are ambiguous by name).

For dumbbells, Single versus Pair affects how a weight is interpreted. A one-dumbbell exercise should default to Single, while still allowing an admin to change it to Pair.

## Requirements

- Add an Equipment selector to Add/Edit Exercise with `None`, `Barbell`, `Dumbbell`, `Cable`, `Machine`, and `Bodyweight`.
- Add a configurable Equipment setup control for Dumbbell only with `Single` and `Pair`.
- Default new and legacy records to `None` equipment and `Single` dumbbell setup without inferring from names.
- Preserve the selected values when editing, canceling, reopening, and saving.
- Show the saved equipment in the Exercise Library table; show Single/Pair for dumbbell rows.
- Do not change routine editing or any other admin flow.

## Acceptance criteria

- Creating an exercise with Dumbbell + Single saves and displays `Dumbbell · single`.
- Editing the same exercise to Pair, saving, closing, and reopening shows Pair.
- Equipment setup is hidden for None, Barbell, Cable, Machine, and Bodyweight; it appears only for Dumbbell. During editing, switching equipment remembers each equipment’s setup independently. Dumbbell defaults to Single. Barbell is always saved as Single and has no Single/Pair selector. Cancel restores the saved record.
- Canceling after changing equipment or setup leaves the original row unchanged.
- Existing records without these fields remain valid and display `None` until explicitly configured.

## Limitations

- This checkout is a frontend prototype: exercise edits are held in React state and reset on a full page refresh.
- No API field or persistence contract for Single/Pair was evidenced, so `dumbbellMode` is retained as optional prototype metadata for backward compatibility; the UI uses the generic label Equipment setup. Wiring it to the real API requires confirmation of the backend field and payload shape.
