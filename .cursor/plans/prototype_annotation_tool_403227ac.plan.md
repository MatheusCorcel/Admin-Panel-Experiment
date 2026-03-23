---
name: Prototype Annotation Tool
overview: Build a standalone annotation/comment overlay tool that sits outside the admin panel and gets "installed" into it with a single import. Press Cmd+Shift+C to toggle comment mode, click anywhere to drop a comment pin, and see all comments for the current page.
todos:
  - id: create-types
    content: Create annotation-tool/src/types.ts with Annotation interface
    status: completed
  - id: create-store
    content: Create annotation-tool/src/store.ts — Zustand store with localStorage persistence, keyed by pathname
    status: completed
  - id: create-pin
    content: Create annotation-tool/src/comment-pin.tsx — numbered pin with expand/collapse on click
    status: completed
  - id: create-input
    content: Create annotation-tool/src/comment-input.tsx — floating input that anchors to click position
    status: completed
  - id: create-overlay
    content: Create annotation-tool/src/overlay.tsx — full-screen overlay, handles click-to-create, renders all pins
    status: completed
  - id: create-provider
    content: Create annotation-tool/src/provider.tsx — listens for ⌘⇧C, mounts overlay into a portal, reacts to route changes
    status: completed
  - id: create-index
    content: Create annotation-tool/index.ts — re-exports AnnotationProvider
    status: completed
  - id: configure-vite
    content: Add @annotation-tool path alias to admin-panel/vite.config.ts
    status: completed
  - id: configure-tsconfig
    content: Add @annotation-tool path to admin-panel/tsconfig.json
    status: completed
  - id: install-provider
    content: Wrap app with <AnnotationProvider> in admin-panel/src/main.tsx
    status: completed
isProject: false
---

# Prototype Annotation Tool

## How It Works

```mermaid
flowchart TD
    A["User presses ⌘⇧C"] --> B["Comment mode activates"]
    B --> C["Translucent overlay covers the screen"]
    C --> D["Existing comment pins shown"]
    D --> E["User clicks anywhere on screen"]
    E --> F["Floating text input appears at click position"]
    F --> G["User types comment, presses Enter"]
    G --> H["Pin saved to localStorage (keyed by URL path)"]
    H --> D
    B --> I["User presses ⌘⇧C or Escape"]
    I --> J["Overlay hides, back to normal"]
```



## Architecture: Standalone Tool Outside the Admin Panel

The tool lives at `annotation-tool/` in the project root — completely separate from the admin panel. To use it on any prototype, you add one path alias and wrap the app with one component.

```
15_BAM-Labs/
├── annotation-tool/         ← NEW: portable, standalone tool
│   ├── src/
│   │   ├── types.ts           ← Annotation data type
│   │   ├── store.ts           ← Zustand store (localStorage)
│   │   ├── provider.tsx       ← Main provider + ⌘⇧C listener
│   │   ├── overlay.tsx        ← Full-screen overlay (comment mode)
│   │   ├── comment-pin.tsx    ← Numbered pin marker on screen
│   │   └── comment-input.tsx  ← Floating input on click
│   └── index.ts               ← Exports AnnotationProvider
└── admin-panel/             ← Existing app
```

## Data Model

Comments stored in `localStorage` keyed by URL pathname (`/users`, `/routines`, etc.):

```ts
interface Annotation {
  id: string
  x: number        // % of screen width (responsive)
  y: number        // % of screen height
  text: string
  page: string     // window.location.pathname
  createdAt: number
}
```

## "Installation" into the Admin Panel (3 changes)

**1. `[admin-panel/vite.config.ts](admin-panel/vite.config.ts)`** — add a path alias:

```ts
'@annotation-tool': path.resolve(__dirname, '../annotation-tool/src')
```

**2. `admin-panel/tsconfig.json`** — add the same path for TypeScript:

```json
"paths": { "@annotation-tool": ["../annotation-tool/src/index.ts"] }
```

**3. `[admin-panel/src/main.tsx](admin-panel/src/main.tsx)`** — wrap the app with one line:

```tsx
import { AnnotationProvider } from '@annotation-tool'
// ...
<AnnotationProvider>
  <RouterProvider router={router} />
</AnnotationProvider>
```

## UX Details

- **Activation**: `⌘+Shift+C` toggles comment mode on/off (Cmd+C is native copy — can't override it safely)
- **Active state**: a subtle blue-tinted overlay + crosshair cursor + a small floating badge showing "Comment Mode • ⌘⇧C to exit"
- **Comment pins**: yellow numbered circles at the saved x/y positions; click a pin to expand its text, click again to collapse
- **New comment**: click anywhere on the overlay → floating input anchors to that point → Enter saves, Escape cancels
- **Per-page**: switching routes clears/loads the correct set of pins automatically
- **No auth needed**: completely anonymous, no backend

## To Use on Future Prototypes

Copy `annotation-tool/` to the other project, add the same alias and tsconfig path, wrap the root with `<AnnotationProvider>` — done.