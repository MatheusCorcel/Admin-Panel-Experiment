import { type FeedbackStatus } from './schema'

export const statusStyles = new Map<FeedbackStatus, string>([
  ['new', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['reviewed', 'bg-neutral-300/40 border-neutral-300'],
])

export const feedbackStatuses = [
  { label: 'New', value: 'new' },
  { label: 'Reviewed', value: 'reviewed' },
] as const

export const classTypes = [
  { label: 'Push', value: 'Push' },
  { label: 'Pull', value: 'Pull' },
  { label: 'Legs', value: 'Legs' },
  { label: 'Full Body', value: 'Full Body' },
] as const

export const coachOptions = [
  { label: 'Sarah Chen', value: 'Sarah Chen' },
  { label: 'James Rodriguez', value: 'James Rodriguez' },
] as const

export const locationOptions = [
  { label: 'BAM New York', value: 'BAM New York' },
  { label: 'BAM Mexico', value: 'BAM Mexico' },
  { label: 'BAM Madrid', value: 'BAM Madrid' },
] as const
