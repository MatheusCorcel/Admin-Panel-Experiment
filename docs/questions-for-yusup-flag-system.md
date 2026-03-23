# Questions for Yusup — Flag System & Admin Panel Setup

Based on the [Flag System Design plan](../.cursor/plans/flag_system_design_fdeb08ff.plan.md) and the discussion with Arthur. Use this as a prep sheet before the call.

---

## Setup & Foundation (Ask First)

1. **What foundation have you built so far?** What branch should I fork from to start generating the admin panel?
2. **How do I set up the project locally?** Step-by-step to run it on my machine.
3. **Is BAM Labs using Go or Ruby?** (This determines library choice: Active Admin vs. ShadCN Admin.)
4. **Can you provide the API contract** (or list of existing endpoints) so the generated UI connects to real data instead of mocks?
5. **Is there a staging backend** I can point to for local development?

---

## Flag System — Data Model Alignment

6. **Do `class_type`, `client_id`, and `exercise_id` already exist in the backend?** What are the exact names/IDs the API uses?
7. **How are class types represented?** (e.g., "Push", "Pull") — enum, string IDs, or something else?
8. **How are exercises linked to class routines?** (The plan assumes we filter exercise-specific flags by whether the exercise is in the current class routine.)

---

## Flag System — API Endpoints Needed

9. **Which of these endpoints already exist (or are planned)?**
   - Create a coach flag
   - List active flags for a client (filtered by class type)
   - Resolve a flag
   - Edit a flag (add note, change type)
   - Fetch system flags per client (New Client status, Scale Down/Up trends)

10. **For system flags (Scale Down / Scale Up):** Is there existing backend logic that computes weight trends? What threshold defines "consistently increasing/decreasing"? Or does this still need to be built?

11. **For the "New Client" system flag:** Is there already a count of how many classes a client has taken per class type?

---

## During-Class Context

12. **How is the "current exercise" tracked during a live class?** (The plan says exercise-specific flags auto-attach the current exercise from the Exercise Card.)

---

## Practical / Workflow

13. **Can you generate all the API request functions for me** as part of the foundation? (Arthur suggested this so everything connects to the real backend.)
14. **What's the priority/timeline for the flag system on the backend?** Should I generate layouts only for parts that don't exist yet, or are all endpoints ready?

---

## Key Reminder (from Arthur)

> Don't start generating UI until the foundation is set up. Without a good foundation (libraries, API request layer, local dev, branch), everything generated will have very poor quality and only be partially usable. Get the setup done together first, then move into flag system implementation.
