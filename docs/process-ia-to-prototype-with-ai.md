# Process: IA to Prototype with AI

Documenting how we go from Information Architecture to a working prototype using AI-assisted development. This doc will evolve as we iterate.

---

## Overview

1. **Define the IA** — Structure, screens, and content (client-validated)
2. **Build the prototype** — AI generates code from the IA; we polish and refine
3. **Hand off to dev** — Prototype serves as foundation for real implementation

---

## Phase 1: Information Architecture

**Artifacts:**
- [`docs/web-admin-ia.md`](web-admin-ia.md) — Full IA structure, screens, content

**Key decisions:**
- Client validated the IA via screenshots
- No public registration — invite-only, OTP auth
- Roles: Admin, Coach, Head Coach
- Coach/Head Coach info comes from Mindbody

---

## Phase 2: Prototype Build

**Stack:** React, Vite, TanStack Router, shadcn/ui, TypeScript (same stack devs will use)

**Approach:**
- Single prompt or feature-by-feature instructions to AI (Cursor)
- IA docs + content are the source of truth
- Mock data for unbuilt APIs; service layer prepared for swap when real endpoints exist

**Artifacts:**
- `admin-panel/` — React app (runs locally, shareable via ngrok)
- `admin-panel-prototype.html` — Earlier lo-fi HTML prototype (reference)

**Learnings so far:**
- Feature-by-feature tends to reduce AI hallucination vs. one big prompt
- Components and schemas transfer well into dev repos
- Some flows need manual polish after AI output

---

## Phase 3: Handoff

**Goal:** Give devs (e.g. Yusuf) a working prototype instead of Figma screens — faster iteration, less rework.

**Plan:**
- Review code quality and structure with dev
- Integrate into BAM Labs repo when foundation is ready
- Swap mock services for real API calls

---

## Open / To Review

- [ ] Mindbody integration details — confirm with client
- [ ] Head Coach access model — admin panel + coach app

---

## Changelog

- _Start simple; add more detail as we iterate._
