import { differenceInCalendarDays } from 'date-fns'
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
  FlagAuditEventType,
  FlagCategory,
  FlagName,
  FlagStatus,
} from './schema'

export const flagCategories = [
  { label: 'Coach', value: 'coach' },
  { label: 'System', value: 'system' },
  { label: 'Condition', value: 'condition' },
] as const

export const categoryStyles = new Map<FlagCategory, string>([
  ['coach', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  [
    'system',
    'bg-purple-100/30 text-purple-900 dark:text-purple-200 border-purple-200',
  ],
  [
    'condition',
    'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200',
  ],
])

export const categoryDotColor = new Map<FlagCategory, string>([
  ['coach', 'bg-blue-500'],
  ['system', 'bg-purple-500'],
  ['condition', 'bg-amber-500'],
])

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
 * "Overdue" is derived from `dueAt`, not a stored status (Gate 1 model) —
 * this is the one place that comparison happens.
 */
export function isOverdue(flag: Flag, now: Date = new Date()): boolean {
  return flag.status === 'active' && flag.dueAt !== null && flag.dueAt < now
}

export function getDisplayStatus(
  flag: Flag,
  now: Date = new Date()
): FlagStatus | 'overdue' {
  return isOverdue(flag, now) ? 'overdue' : flag.status
}

/** Right-most table column: what's due, or how it was closed out. */
export function getDueResolvedLabel(
  flag: Flag,
  now: Date = new Date()
): string {
  switch (getDisplayStatus(flag, now)) {
    case 'overdue': {
      const days = differenceInCalendarDays(now, flag.dueAt as Date)
      return `${days} day${days === 1 ? '' : 's'} over`
    }
    case 'resolved':
      return flag.resolvedAt
        ? `Resolved ${flag.resolvedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : '—'
    case 'permanent':
      return flag.convertedAt
        ? `Converted ${flag.convertedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : '—'
    default:
      return flag.dueAt
        ? `Due ${flag.dueAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : '—'
  }
}

// SIMULATED METRIC — flagged for devs (Paper: "Open Questions & Dev Flags").
// The dashboard's "Avg. Time to Resolution" is defined in classes, not
// calendar days, to stay consistent with the rest of the flag lifecycle
// (due windows are counted in classes via `dueInClasses`, not days). This
// prototype has no real per-client class-attendance history, so there is
// no way to count classes actually attended between `createdAt` and
// resolution. Instead this assumes a flat cadence and converts elapsed
// calendar days into an approximate class count. Real implementation must
// replace this with an actual count of completed classes for that client
// in the window.
export const ASSUMED_CLASSES_PER_WEEK = 3

export function getResolutionClasses(flag: Flag): number | null {
  const closedAt = flag.resolvedAt ?? flag.convertedAt
  if (!closedAt) return null
  const days = Math.max(
    0,
    (closedAt.getTime() - flag.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  )
  return days * (ASSUMED_CLASSES_PER_WEEK / 7)
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

/** The status pill text shown in the flag detail panel. */
export function getStatusPillLabel(flag: Flag, now: Date = new Date()): string {
  switch (getDisplayStatus(flag, now)) {
    case 'overdue': {
      const days = differenceInCalendarDays(now, flag.dueAt as Date)
      return `Overdue · ${days} day${days === 1 ? '' : 's'} over`
    }
    case 'resolved':
      return flag.resolvedAt
        ? `Resolved ${shortDate(flag.resolvedAt)}`
        : 'Resolved'
    case 'permanent':
      return flag.convertedAt
        ? `Permanent · converted ${shortDate(flag.convertedAt)}`
        : 'Permanent'
    default:
      if (flag.dueInClasses !== null) {
        return `Active · due in ${flag.dueInClasses} class${flag.dueInClasses === 1 ? '' : 'es'}`
      }
      if (flag.dueAt) return `Active · due ${shortDate(flag.dueAt)}`
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
// artboard.
export const reschedulePresets = [
  { label: 'Next class', classes: 1 },
  { label: 'In 2 classes', classes: 2 },
  { label: 'In 3 classes', classes: 3 },
] as const

/**
 * Approximates a due date from a class count using the same simulated
 * cadence as getResolutionClasses() above — this prototype has no real
 * per-client class schedule to count forward from.
 */
export function classesToApproximateDate(
  classes: number,
  from: Date = new Date()
): Date {
  const days = classes * (7 / ASSUMED_CLASSES_PER_WEEK)
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000)
}

// Who admin/coach actions in the prototype are attributed to — there's no
// real auth session wired into this mock data layer yet.
export const CURRENT_ACTOR_NAME = 'Miguel Berlanga'
