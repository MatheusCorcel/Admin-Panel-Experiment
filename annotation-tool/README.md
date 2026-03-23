# Annotation Tool

A portable, standalone comment/annotation overlay for React prototypes. Drop it into any Vite + React project to let anyone click anywhere on screen and leave feedback — like Figma comments, but for live prototypes.

## Features

- **Click-to-comment** — enter Comment Mode, click anywhere, type, save.
- **Per-page pins** — each route/page stores its own set of numbered comment pins.
- **Shared via Supabase** — comments sync across devices and browsers in real time (optional, works offline too).
- **Keyboard shortcuts** — `Cmd+Shift+C` (Mac) or `Ctrl+Shift+C` (PC) to toggle.
- **Right-click menu** — a hidden "Comment Mode" entry in the right-click context menu.
- **No auth** — fully anonymous, anyone with the link can comment.
- **Portable** — lives outside your app. One wrapper component to install.

## Quick Start

### 1. Copy the folder

Place `annotation-tool/` as a sibling to your project:

```
your-workspace/
├── annotation-tool/     ← this folder
└── your-app/            ← your Vite + React project
```

### 2. Configure Vite

In your project's `vite.config.ts`, add the alias, dedupe, and filesystem rules:

```ts
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@annotation-tool': path.resolve(__dirname, '../annotation-tool'),
    },
    // Required: ensures packages imported by annotation-tool resolve
    // from your project's node_modules (not from its own missing ones)
    dedupe: ['react', 'react-dom', 'zustand', 'lucide-react'],
  },
  server: {
    fs: {
      // Required: allow Vite to serve files from outside the project root
      allow: ['..'],
    },
  },
})
```

### 3. Configure TypeScript

Add the path aliases to `tsconfig.json` (and `tsconfig.app.json` if you have one):

```json
{
  "compilerOptions": {
    "paths": {
      "@annotation-tool": ["../annotation-tool/index.ts"],
      "@annotation-tool/*": ["../annotation-tool/src/*"]
    }
  },
  "include": ["src", "../annotation-tool/src", "../annotation-tool/index.ts"]
}
```

### 4. Configure Tailwind CSS (v4)

The annotation tool uses Tailwind classes. Since its files live outside your project root, Tailwind's automatic scanning won't find them. Add a `@source` directive to your main CSS file:

```css
@import 'tailwindcss';

@source "../../../annotation-tool/src";
```

The relative path goes from your CSS file's location to the `annotation-tool/src` directory. Adjust based on your project structure.

### 5. Wrap your app

In your root component (e.g. `main.tsx`):

```tsx
import { AnnotationProvider } from '@annotation-tool'

root.render(
  <AnnotationProvider>
    <App />
  </AnnotationProvider>
)
```

That's it. Press `Cmd+Shift+C` to start commenting.

## Supabase Setup (optional — for shared comments)

Without Supabase, comments are stored in-memory only (lost on refresh). To persist and share comments across devices:

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a free project.

### 2. Create the database table

In the Supabase SQL Editor, run:

```sql
create table if not exists annotations (
  id text primary key,
  x float not null,
  y float not null,
  text text not null,
  page text not null,
  created_at bigint not null
);

alter table annotations enable row level security;

create policy public_access on annotations
  for all using (true) with check (true);
```

### 3. Add environment variables

Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Find these values in Supabase Dashboard > Project Settings > API.

The annotation tool auto-detects these variables. If they're present, comments sync to Supabase. If they're missing, everything still works — comments just won't persist between sessions.

## Peer Dependencies

These must be installed in your host project (they are NOT bundled with the annotation tool):

| Package | Version |
|---|---|
| `react` | 18+ or 19+ |
| `react-dom` | 18+ or 19+ |
| `zustand` | 5+ |
| `lucide-react` | any |
| `tailwindcss` | 4+ |

## Project Structure

```
annotation-tool/
├── index.ts              ← Single export: AnnotationProvider
└── src/
    ├── types.ts           ← Annotation interface
    ├── store.ts           ← Zustand state management
    ├── supabase.ts        ← Supabase REST client (plain fetch, no SDK)
    ├── provider.tsx       ← Main wrapper: keyboard listener, route tracking, data loading
    ├── overlay.tsx         ← Full-screen comment mode overlay
    ├── comment-pin.tsx     ← Numbered pin with expandable comment popup
    ├── comment-input.tsx   ← Floating textarea for new comments
    └── context-menu.tsx    ← Hidden right-click menu entry
```

## How It Works

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd+Shift+C` | Toggle Comment Mode (Mac) |
| `Ctrl+Shift+C` | Toggle Comment Mode (PC) |
| `Escape` | Close comment input, or exit Comment Mode |
| `Enter` | Save comment |
| `Shift+Enter` | New line in comment |

### Right-click Menu

Right-click anywhere on the prototype to see a "Comment Mode" option. This is intentionally hidden — not shown in the overlay badge — so only people who know about it can use it.

### Comment Lifecycle

1. Enter Comment Mode via shortcut or right-click
2. A blue overlay with crosshair cursor appears
3. Click anywhere to place a comment — a floating textarea appears
4. Type your comment, press Enter to save
5. A numbered blue pin appears at that location
6. Click any pin to read the comment, delete it, or close the popup
7. Exit Comment Mode via shortcut or Escape

### Data Storage

- **Coordinates** are stored as viewport percentages (0-100), making pins responsive across screen sizes.
- **Page** is stored as `window.location.pathname`, so each route has its own set of comments.
- **Persistence** flows through Supabase REST API using plain `fetch` — no SDK dependency. If Supabase is not configured, the tool works in-memory.

## Troubleshooting

### Tailwind classes not rendering (unstyled overlay)

Your Tailwind config isn't scanning the annotation-tool files. Add the `@source` directive as described in step 4 above, then restart the dev server.

### "Failed to resolve import" errors on startup

Vite can't find packages imported from outside the project root. Make sure your `resolve.dedupe` array includes all shared packages and `server.fs.allow` includes `['..']`.

### Comments not syncing across devices

Check that your `.env.local` has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Open browser DevTools > Network tab and look for failed requests to `rest/v1/annotations`. Common causes:
- Row Level Security (RLS) policy not created — run the SQL from step 2 above
- Wrong anon key — copy it again from Supabase Dashboard > Settings > API
