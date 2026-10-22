import {
  Eye,
  Ruler,
  TrendingDown,
  TrendingUp,
  UserPlus,
  HeartPulse,
  Baby,
  Bandage,
  Syringe,
  HandHelping,
} from 'lucide-react'
import type {
  Flag,
  FlagActorRole,
  FlagAuditActorRole,
  FlagAuditEventType,
  FlagName,
  FlagStatus,
} from './schema'

// NOTE: the flag `category` (coach / system / condition) is still a real
// part of the model — it drives resolve rules, owner rules, and which flag
// names are valid. It just isn't surfaced as its own UI label any more; the
// admin-facing "Type" below replaced it. That's why there are no
// category label/colour maps here.

// The "Type" shown in the admin UI is derived from WHO CREATED the flag,
// not from its category: Coach / System / Client (Aug 26 sync). A Condition
// flag entered by a coach as a courtesy reads "Coach", not "Client". Only the
// origin label changed — condition content (Injury, Pregnancy…) keeps its name.
//
// Trade-off accepted knowingly: Type no longer separates Coach-category
// flags from Condition-category ones — a coach-entered injury and a
// coach-entered form check both read "Coach". The underlying `category`
// field is untouched and still drives resolve rules, flag-name grouping,
// and owner rules; only this display/filter dimension is creator-based.
export const flagTypes = [
  { label: 'Coach', value: 'coach' },
  { label: 'System', value: 'system' },
  { label: 'Client', value: 'client' },
] as const

export const flagTypeLabels: Record<FlagActorRole, string> = {
  coach: 'Coach',
  system: 'System',
  client: 'Client',
}

export const flagTypeStyles = new Map<FlagActorRole, string>([
  ['coach', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  [
    'system',
    'bg-purple-100/30 text-purple-900 dark:text-purple-200 border-purple-200',
  ],
  [
    'client',
    'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200',
  ],
])

export const flagTypeDotColor = new Map<FlagActorRole, string>([
  ['coach', 'bg-blue-500'],
  ['system', 'bg-purple-500'],
  ['client', 'bg-amber-500'],
])

/** The admin-facing Type: who actually entered the flag. */
export function getFlagType(flag: Flag): FlagActorRole {
  return flag.createdByRole
}

/** How each actor's role reads in the History timeline. */
export const actorRoleLabels: Record<FlagAuditActorRole, string> = {
  coach: 'Coach',
  client: 'Client',
  system: 'System',
  admin: 'Admin',
}

// Labels + icons for every specific flag, keyed by name. "scale_up" and
// "scale_down" are shared between the "coach" and "system" categories.
export const flagNames = [
  { label: 'Watch Closely', value: 'watch_closely', icon: Eye },
  { label: 'Form Check', value: 'form_check', icon: HandHelping },
  { label: 'Scale Up', value: 'scale_up', icon: TrendingUp },
  { label: 'Scale Down', value: 'scale_down', icon: TrendingDown },
  { label: 'Range of Motion', value: 'range_of_motion', icon: Ruler },
  { label: 'New Client', value: 'new_client', icon: UserPlus },
  { label: 'Condition', value: 'condition', icon: HeartPulse },
  { label: 'Pregnancy', value: 'pregnancy', icon: Baby },
  { label: 'Injury', value: 'injury', icon: Bandage },
  { label: 'Surgery', value: 'surgery', icon: Syringe },
  { label: 'No Touch', value: 'no_touch', icon: HandHelping },
] as const satisfies ReadonlyArray<{
  label: string
  value: FlagName
  icon: unknown
}>

export const flagNameLabels: Record<FlagName, string> = Object.fromEntries(
  flagNames.map((f) => [f.value, f.label])
) as Record<FlagName, string>

// Flags with no exercise attached — the rest always require one when
// created under the "coach" category (Gate 1 model).
export const generalCoachFlags: FlagName[] = ['watch_closely']

export const flagStatuses = [
  { label: 'Active', value: 'active' },
  { label: 'Overdue', value: 'overdue' }, // derived, not a stored status — kept here only for the filter UI
  { label: 'Resolved', value: 'resolved' },
  { label: 'Permanent', value: 'permanent' },
] as const

export const statusLabels = Object.fromEntries(
  flagStatuses.map((s) => [s.value, s.label])
) as Record<FlagStatus | 'overdue', string>

export const statusStyles = new Map<FlagStatus | 'overdue', string>([
  ['active', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['overdue', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
  [
    'resolved',
    'bg-slate-100/30 text-slate-700 dark:text-slate-300 border-slate-200',
  ],
  [
    'permanent',
    'bg-slate-100/30 text-slate-700 dark:text-slate-300 border-slate-200',
  ],
])

// Reuses the same class types as the routines feature and the same
// locations as the checklists feature, rather than inventing new ones.
export const flagClassTypes = [
  { label: 'Push', value: 'push' },
  { label: 'Pull', value: 'pull' },
  { label: 'Legs', value: 'legs' },
  { label: 'Full Body', value: 'full_body' },
] as const

export const flagLocations = [
  { label: 'BAM New York', value: 'BAM New York' },
  { label: 'BAM Mexico', value: 'BAM Mexico' },
  { label: 'BAM Madrid', value: 'BAM Madrid' },
] as const

export const classTypeLabels: Record<string, string> = Object.fromEntries(
  flagClassTypes.map((c) => [c.value, c.label])
)

/**
 * "Overdue" is derived, not a stored status (Gate 1 model) — this is the one
 * place that comparison happens. It's class-based only, so Status always
 * agrees with the class-progress text; calendar dates never make a flag
 * overdue.
 */
export function isOverdue(flag: Flag): boolean {
  return (
    flag.status === 'active' &&
    flag.classesRemaining !== null &&
    flag.classesRemaining < 0
  )
}

export function getDisplayStatus(flag: Flag): FlagStatus | 'overdue' {
  return isOverdue(flag) ? 'overdue' : flag.status
}

/**
 * Current owner is transient, not a permanent record: it only means
 * something while the flag is still open. Once a flag is resolved or
 * converted to permanent, "Resolved by" carries the lasting record and
 * this returns null so the UI stops implying someone still owns it.
 */
export function getCurrentOwner(flag: Flag): string | null {
  if (flag.status !== 'active') return null
  return flag.currentOwnerName
}

export const RESOLVER_NOT_RECORDED = 'Not recorded'

/**
 * Who resolved a closed flag (the PIN holder). A closed flag with no
 * recorded resolver says so explicitly — it's never filled in from the
 * owner or creator. Open flags have no resolver yet, so this returns null.
 */
export function getResolvedByLabel(flag: Flag): string | null {
  if (flag.status === 'active') return null
  return flag.resolvedByName ?? RESOLVER_NOT_RECORDED
}

export function formatClassCount(classes: number): string {
  return `${classes} class${classes === 1 ? '' : 'es'}`
}

/**
 * The class-progress text shown next to Status, in the detail panel and in
 * the CSV: "2 classes remaining", "Due this class", "1 class overdue", or
 * "Resolved in 2 classes" once closed.
 */
export function getClassProgressLabel(flag: Flag): string | null {
  if (flag.status !== 'active') {
    return flag.classesToResolve === null
      ? null
      : `Resolved in ${formatClassCount(flag.classesToResolve)}`
  }
  const remaining = flag.classesRemaining
  if (remaining === null) return null
  if (remaining === 0) return 'Due this class'
  return remaining > 0
    ? `${formatClassCount(remaining)} remaining`
    : `${formatClassCount(-remaining)} overdue`
}

/** Open flags sort by urgency (most overdue first); closed ones go last. */
export function getClassProgressSortValue(flag: Flag): number | undefined {
  if (flag.status !== 'active') return undefined
  return flag.classesRemaining ?? undefined
}

export function isReopened(flag: Flag): boolean {
  return flag.status === 'active' && Boolean(flag.reopenedAt)
}

/** Mean of the sample `classesToResolve` values, rounded to one decimal. */
export function getAverageClassesToResolve(flags: Flag[]): number | null {
  const counts = flags
    .filter((f) => f.status !== 'active' && f.classesToResolve !== null)
    .map((f) => f.classesToResolve as number)
  if (counts.length === 0) return null
  const mean = counts.reduce((sum, n) => sum + n, 0) / counts.length
  return Math.round(mean * 10) / 10
}

/**
 * Gate 1, Q8: Pregnancy flag creation is gender-gated to female clients,
 * using the existing (optional) `gender` field on the client profile.
 * The UI behavior is intentionally asymmetric and NOT enforced by this
 * helper alone:
 *  - Coach app: hide the "Pregnancy" option entirely when this is false.
 *  - Client app: show it, but disabled, when this is false for themself.
 * Anything other than 'Female' (including an unset gender) is treated the
 * same way — there's no separate case for missing data.
 */
export function canHavePregnancyFlag(gender: string | undefined): boolean {
  return gender === 'Female'
}

// Gate 4: which flags can be manually Resolved from the detail panel.
// Coach/System flags all resolve normally. Of the Condition-category flags,
// only Injury and Surgery have a resolvable lifecycle (Gate 1, Q1 — each
// converts to a permanent reminder on resolve, see fl-009/fl-010 in the mock
// data). The rest (generic Condition, Pregnancy, No Touch) are
// persistent/informational and have no resolve action — they never carry a
// resolvedAt in the mock data. "New Client" auto-clears on a class-count
// threshold rather than by manual action, so it isn't resolvable here
// either.
const resolvableFlagNames: FlagName[] = [
  'watch_closely',
  'form_check',
  'scale_up',
  'scale_down',
  'range_of_motion',
  'injury',
  'surgery',
]

export function isResolvable(flag: Flag): boolean {
  return resolvableFlagNames.includes(flag.flagName)
}

/** Whether resolving this flag converts it straight to "permanent" (Gate 1, Q1). */
export function resolvesToPermanent(flag: Flag): boolean {
  return flag.flagName === 'injury' || flag.flagName === 'surgery'
}

const shortDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

/**
 * The status pill text shown in the flag detail panel. Status only — the
 * class window has its own row, mirroring the separate table columns.
 */
export function getStatusPillLabel(flag: Flag): string {
  switch (getDisplayStatus(flag)) {
    case 'overdue':
      return 'Overdue'
    case 'resolved':
      return flag.resolvedAt
        ? `Resolved ${shortDate(flag.resolvedAt)}`
        : 'Resolved'
    case 'permanent':
      return flag.convertedAt
        ? `Permanent · converted ${shortDate(flag.convertedAt)}`
        : 'Permanent'
    default:
      return 'Active'
  }
}

export const auditEventVerbLabels: Record<FlagAuditEventType, string> = {
  created: 'Created',
  edited: 'Edited',
  snoozed: 'Rescheduled',
  ownership_transferred: 'Ownership transferred',
  resolved: 'Resolved',
  converted_to_permanent: 'Converted to permanent',
}

// Preset due-date increments confirmed in Gate 1, Q5 (see the "Set a
// Reminder" screenshot on the Paper "Confirmed Mechanics" artboard). No
// numeric cap on how many times a flag's due date can be pushed out was
// confirmed — flagged as open in the Paper "Open Questions & Dev Flags"
// artboard. A preset sets the class window and restarts the sample
// countdown at that many classes; it's never turned into a date.
export const reschedulePresets = [
  { label: 'Next class', classes: 1 },
  { label: 'In 2 classes', classes: 2 },
  { label: 'In 3 classes', classes: 3 },
] as const

// The signed-in admin that panel actions are attributed to — there's no real
// auth session wired into this mock data layer yet. Recorded as an Admin
// actor, never as the flag's current owner.
export const CURRENT_ACTOR_NAME = 'Miguel Berlanga'
export const CURRENT_ACTOR_ROLE = 'admin' satisfies FlagAuditActorRole
