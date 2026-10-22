import {
  classTypeLabels,
  flagNameLabels,
  flagTypeLabels,
  formatClassCount,
  getClassProgressLabel,
  getCurrentOwner,
  getDisplayStatus,
  getFlagType,
  getResolvedByLabel,
  statusLabels,
} from './data'
import { type Flag } from './schema'

// Mirrors the on-screen column order, including columns hidden by default
// (Resolved date), plus the configured resolution window and the note.
const csvColumns = [
  'Client',
  'Created by',
  'Created date',
  'Current owner',
  'Status',
  'Class progress',
  'Resolution window',
  'Resolved by',
  'Resolved date',
  'Type',
  'Flag',
  'Exercise',
  'Location',
  'Class',
  'Note',
]

const longDate = (d: Date) =>
  d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function csvEscape(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

function flagToRow(flag: Flag): string[] {
  return [
    flag.client.name,
    flag.createdByName,
    longDate(flag.createdAt),
    getCurrentOwner(flag) ?? '—',
    statusLabels[getDisplayStatus(flag)],
    getClassProgressLabel(flag) ?? '—',
    flag.dueInClasses === null ? '—' : formatClassCount(flag.dueInClasses),
    getResolvedByLabel(flag) ?? '—',
    flag.resolvedAt ? longDate(flag.resolvedAt) : '—',
    flagTypeLabels[getFlagType(flag)],
    flagNameLabels[flag.flagName],
    flag.exerciseName ?? '—',
    flag.location ?? '—',
    flag.classType ? classTypeLabels[flag.classType] : '—',
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
