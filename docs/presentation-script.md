# BAM Labs — Internal Presentation Script

**Duration:** 5–10 minutes  
**Audience:** Coworkers at Goji Labs  
**Goal:** Share the process, learnings, and tools from the BAM Labs admin panel project

---

## 1. Context (~30s)

BAM Labs is a fitness/coaching platform. They needed a web admin panel for managing users, routines, exercises, FAQs, and feedback — seven full modules.

My role was to design and prototype this admin panel in a way that reduces the gap between design and development — making the handoff faster and the output closer to production-ready code.

---

## 2. The Goal (~1–2 min)

Long story short: I wanted to create a system to make admin panels more efficient.

- **Reduce design and dev effort** — instead of designing every screen in Figma and then rebuilding it from scratch in code, generate working prototypes directly from structured design decisions.
- **Make handoff easier and seamless** — the prototype _is_ the handoff. Devs can inspect real components, real routing, real layout — not a static image.
- **Design the UX, logic, and architecture IA** to produce artifacts that are ready for dev prototypes — not just pretty pictures.

The open question: can this connect directly to the devs' stack? That's still being explored, but the foundation is there.

---

## 3. The Process (~2–3 min)

This is where the interesting learnings are.

**What didn't work:**  
Taking IA screenshots (from Figma or whiteboard) and feeding them straight into a prototype generator. The output was messy — it couldn't interpret the structure well enough, and the result needed so much fixing it wasn't saving time.

**What worked:**  — Plan mode worked really well here (meetings transcript + project context + Structured IA)
Taking those same IA screenshots and first converting them into a structured, text-based IA document — a clear hierarchy of pages, sections, components, and data. Then feeding _that_ into the prototype generator. The results were dramatically better. The AI had clear, unambiguous input and produced clean, navigable prototypes.

**The workflow that emerged:**  
IA screenshots → structured IA (text) → working prototype

**Feature-by-feature iterations:**  
Rather than generating the entire admin panel at once, I worked module by module — Users, Routines, Exercises, FAQs, Feedback, Settings. Each one went through its own cycle. This can still be improved, but it kept things manageable and reviewable.

---

## 4. Demo / Show the Work (~1–2 min)

> _[Live demo or screenshots of the prototype]_

Walk through 2–3 screens to show:
- The navigation and overall shell
- One detailed module (e.g., Routines → Routine Editor → Exercise Editor) to show depth
- The level of UI fidelity — real components, real interactions, not mockups

---

## 5. The Annotation Tool (~1–2 min)

A side problem came up: how do we get client feedback on a live prototype?

Traditional flow: take screenshots, annotate in Figma, send back and forth. Slow.

**The idea:** what if the client could annotate directly on the live prototype? Like Figma comments, but on the real thing.

So I built a portable annotation tool:
- Click anywhere on the prototype to leave a comment
- Comments are pinned to their location with numbered markers
- Shared across devices via Supabase (real-time database)
- Works on any Vite + React project — just wrap your app with one component
- No auth needed — anyone with the link can comment

> _[Quick demo: Cmd+Shift+C → click → type → pin appears]_

This turned feedback from a multi-step process into a single action on the actual product.

---

## 6. Key Takeaways (~30s–1 min)

- **Text-based IA is the breakthrough.** Starting from structured text instead of screenshots changed the quality of everything downstream. Next time, I'd start there from day one.
- **The prototype _is_ the spec.** When the handoff artifact is already running code, the conversation with devs shifts from "what should this look like?" to "what needs to change?"
- **Build tools for the process, not just the product.** The annotation tool wasn't in the original scope, but it solved a real friction point in the feedback loop.

---

## Notes to Self

- Keep the demo short — pick one flow, show it end to end
- If time is tight, the annotation tool demo alone is a strong closer
- Anticipate questions about: connecting to devs' stack, scaling this to other projects, AI model/tools used
