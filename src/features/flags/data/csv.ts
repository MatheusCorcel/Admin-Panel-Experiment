import {
  classTypeLabels,
  flagCategories,
  flagNameLabels,
  getDisplayStatus,
  getDueResolvedLabel,
} from './data'
import { type Flag } from './schema'

const csvColumns = [
  'Client',
  'Coach',
  'Created By',
  'Type',
  'Flag',
  'Class',
  'Location',
  'Exercise',
  'Status',
  'Created',
  'Due / Resolved',
  'Note',
]

function csvEscape(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

function flagToRow(flag: Flag): string[] {
  const categoryLabel =
    flagCategories.find(({ value }) => value === flag.category)?.label ??
    flag.category
  return [
    flag.client.name,
    flag.responsibleCoachName ?? '—',
    flag.createdByName,
    categoryLabel,
    flagNameLabels[flag.flagName],
    flag.classType ? classTypeLabels[flag.classType] : '—',
    flag.location ?? '—',
    flag.exerciseName ?? '—',
    getDisplayStatus(flag),
    flag.createdAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    getDueResolvedLabel(flag),
    flag.note ?? '',
  ]
}

/**
 * Exports the same display values the table renders (labels, not raw
 * enum values) — this is meant to read like the on-screen table, not a
 * dump of the underlying record.
 */
export function flagsToCsv(flags: Flag[]): string {
  const rows = [csvColumns, ...flags.map(flagToRow)]
  return rows.map((row) => row.map(csvEscape).join(',')).join('\r\n')
}

/**
 * No CSV library in the repo (Gate 5 decision) — the export is flat,
 * already-escaped text, so a tiny Blob + object URL download covers it
 * without adding a dependency.
 */
export function downloadCsv(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
