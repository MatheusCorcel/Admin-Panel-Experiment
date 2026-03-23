---
name: Exercise Editor Modal Improvements
overview: Refactor the Exercise Editor dialog to use a Sticky Footer layout with internal scrolling, collapsible Exercise A/B sections, and a ToggleGroup for Single/Superset type selection.
todos: []
isProject: false
---

# Exercise Editor Modal Improvements

## Context

The Exercise Editor modal (`[admin-panel/src/features/routines/components/exercise-editor-dialog.tsx](admin-panel/src/features/routines/components/exercise-editor-dialog.tsx)`) needs three refinements: max-height with scroll, collapsible exercise sections, and a button-group style for type selection. The project already has Collapsible; `toggle-group` must be added.

---

## 1. Add ToggleGroup component

Install shadcn toggle-group (not yet in the project):

```bash
cd admin-panel && npx shadcn@latest add toggle-group
```

This creates `admin-panel/src/components/ui/toggle-group.tsx`.

---

## 2. Sticky Footer layout in Exercise Editor

Restructure the dialog to follow the [shadcn Sticky Footer pattern](https://ui.shadcn.com/docs/components/dialog#sticky-footer):

- **DialogContent**: Keep `sm:max-w-lg`, add `max-h-[90vh]` or similar so the modal does not exceed viewport
- **DialogHeader**: Stays at top (no change)
- **Scrollable body**: Wrap the form content (entry type + single/superset fields) in a div with:
  - `-mx-4 px-4 no-scrollbar max-h-[50vh] overflow-y-auto` (matches shadcn example)
  - The `-mx-4 px-4` compensates for DialogContent padding so content aligns when scrolling
- **DialogFooter**: Stays at bottom (sticky) – no structural change

Layout sketch:

```
DialogContent (max-h-[90vh], grid gap-4)
├── DialogHeader
├── scrollable div (max-h-[50vh] overflow-y-auto)
│   └── Form content
└── DialogFooter
```

---

## 3. Replace RadioGroup with ToggleGroup

Replace the existing `RadioGroup` for `entryType` (Single/Superset) with `ToggleGroup`:

- Use `ToggleGroup` with `type="single"`, `variant="outline"`, and `value`/`onValueChange` from the form
- Wrap in `FormField` / `FormControl` as usual
- Use two `ToggleGroupItem` entries: `value="single"` ("Single") and `value="superset"` ("Superset")

Remove imports for `RadioGroup`, `RadioGroupItem`, and `Label` (for the radio labels).

---

## 4. Make Exercise sections collapsible

Wrap the Exercise A and Exercise B blocks (superset mode) in `Collapsible`:

- **Exercise A**: `Collapsible` with `CollapsibleTrigger` showing "Exercise A" + chevron, and `CollapsibleContent` with the form fields. Default: `defaultOpen={true}`.
- **Exercise B**: Same pattern.

Use `CollapsibleTrigger` as a button/row with `flex items-center justify-between`; show a chevron (e.g. `ChevronDown` from lucide) that rotates when open (via `data-[state=open]`). Keep the existing card styling (`rounded-lg border p-4`) inside `CollapsibleContent`.

Single-exercise mode can stay as-is (no collapsible needed).

---

## Files to modify


| File                                                                      | Changes                                                                           |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `admin-panel/src/components/ui/toggle-group.tsx`                          | Create via `npx shadcn@latest add toggle-group`                                   |
| `admin-panel/src/features/routines/components/exercise-editor-dialog.tsx` | 1) Sticky footer layout; 2) ToggleGroup for type; 3) Collapsible for Exercise A/B |


---

## Diagram: Modal structure after changes

```mermaid
flowchart TB
    subgraph DialogContent [DialogContent max-h-90vh]
        Header[DialogHeader]
        ScrollBody["Scrollable div (max-h-50vh overflow-y-auto)"]
        Footer[DialogFooter]
        Header --> ScrollBody --> Footer
    end

    subgraph ScrollContent [Content inside scroll div]
        Type[ToggleGroup: Single | Superset]
        SingleFields[Single exercise fields]
        SupersetSection[Superset section]
        Type --> SingleFields
        Type --> SupersetSection
    end

    subgraph CollapsibleA [Exercise A - Collapsible]
        TriggerA[CollapsibleTrigger: Exercise A]
        ContentA[CollapsibleContent: form fields]
        TriggerA --> ContentA
    end

    subgraph CollapsibleB [Exercise B - Collapsible]
        TriggerB[CollapsibleTrigger: Exercise B]
        ContentB[CollapsibleContent: form fields]
        TriggerB --> ContentB
    end

    SupersetSection --> CollapsibleA
    SupersetSection --> CollapsibleB
```



