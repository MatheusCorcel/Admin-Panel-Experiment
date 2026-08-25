import { z } from 'zod'

// The category a flag belongs to. Determines its lifecycle rules.
const flagCategorySchema = z.union([
  z.literal('coach'),
  z.literal('system'),
  z.literal('condition'),
])
export type FlagCategory = z.infer<typeof flagCategorySchema>

// The specific flag. "scale_up" / "scale_down" are valid under both "coach"
// and "system" — same name, different origin — so category + flagName
// together identify a flag, not flagName alone.
const flagNameSchema = z.union([
  // coach
  z.literal('watch_closely'),
  z.literal('form_check'),
  z.literal('scale_up'),
  z.literal('scale_down'),
  z.literal('range_of_motion'),
  // system
  z.literal('new_client'),
  // condition
  z.literal('condition'),
  z.literal('pregnancy'),
  z.literal('injury'),
  z.literal('surgery'),
  z.literal('no_touch'),
])
export type FlagName = z.infer<typeof flagNameSchema>

// "range_of_motion" was renamed from "alternate_needed" (Gate 1, Q6).
// Historical records may still carry the retired name; treat both as the
// same flag for filtering and metrics.
const legacyFlagNameSchema = z.literal('alternate_needed')
export type LegacyFlagName = z.infer<typeof legacyFlagNameSchema>

// "permanent" is the terminal state for a resolved Injury or Surgery flag
// only (Gate 1, Q1) — it converts into a static reminder, no longer active
// or counted. "overdue" is derived from dueAt/dueInClasses, not stored here.
const flagStatusSchema = z.union([
  z.literal('active'),
  z.literal('resolved'),
  z.literal('permanent'),
])
export type FlagStatus = z.infer<typeof flagStatusSchema>

const flagActorRoleSchema = z.union([
  z.literal('coach'),
  z.literal('client'),
  z.literal('system'),
])
export type FlagActorRole = z.infer<typeof flagActorRoleSchema>

// One entry in a flag's audit trail (Gate 1, user story 2).
const flagAuditEventTypeSchema = z.union([
  z.literal('created'),
  z.literal('edited'),
  z.literal('snoozed'),
  z.literal('ownership_transferred'),
  z.literal('resolved'),
  z.literal('converted_to_permanent'),
])
export type FlagAuditEventType = z.infer<typeof flagAuditEventTypeSchema>

const flagAuditEventSchema = z.object({
  id: z.string(),
  type: flagAuditEventTypeSchema,
  actorName: z.string(),
  actorRole: flagActorRoleSchema,
  at: z.coerce.date(),
  detail: z.string().optional(),
})
export type FlagAuditEvent = z.infer<typeof flagAuditEventSchema>

// There is no client schema yet in this codebase (`users` only covers
// admin/coach/head_coach staff) — a flag embeds the minimum client info it
// needs rather than joining to a feature that doesn't exist.
const flagClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string().optional(),
})
export type FlagClient = z.infer<typeof flagClientSchema>

const flagSchema = z.object({
  id: z.string(),
  client: flagClientSchema,
  category: flagCategorySchema,
  flagName: flagNameSchema,
  legacyFlagName: legacyFlagNameSchema.optional(),

  // Scoping. Null for Condition flags, which aren't tied to a class type,
  // location, or exercise.
  classType: z.string().nullable(),
  location: z.string().nullable(),
  exerciseId: z.string().nullable(),
  exerciseName: z.string().nullable(),

  note: z.string().optional(),
  status: flagStatusSchema,

  // Who actually entered the flag — distinct from `currentOwnerName`
  // below (Gate 1, Q9). A coach can add a Condition flag as a courtesy;
  // that doesn't make them responsible for resolving it.
  createdByRole: flagActorRoleSchema,
  createdByName: z.string(),
  createdAt: z.coerce.date(),
  createdInClassId: z.string().nullable(),

  // The due-date countdown (Gate 1, Q5). Null for flags that never resolve
  // on a timer (generic Condition) or auto-clear on a threshold (New Client).
  dueAt: z.coerce.date().nullable(),
  dueInClasses: z.number().nullable(),

  // The coach on the hook to resolve this flag right now — renamed from
  // "Coach" to "Current Owner" in the UI after user feedback that "Coach"
  // read as ambiguous on System-category flags. Always null for Condition
  // flags — nobody is responsible for those (Gate 1, Q7/Q9). For Coach/System
  // flags this is a derived value: it starts as the creating coach and
  // auto-transfers to whoever teaches the client's last class before the
  // flag is due (Gate 1, Q2) — captured here as the current snapshot, with
  // the transfer itself logged in `auditTrail`.
  currentOwnerName: z.string().nullable(),

  resolvedByName: z.string().nullable(),
  resolvedAt: z.coerce.date().nullable(),

  // Set only when an Injury or Surgery flag converts to a permanent reminder.
  convertedAt: z.coerce.date().nullable(),

  auditTrail: z.array(flagAuditEventSchema),
})
export type Flag = z.infer<typeof flagSchema>

export const flagListSchema = z.array(flagSchema)
