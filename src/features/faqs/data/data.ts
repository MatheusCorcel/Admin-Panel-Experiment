import { type FaqStatus } from './schema'

export const statusStyles = new Map<FaqStatus, string>([
  ['draft', 'bg-neutral-300/40 border-neutral-300'],
  ['published', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
])

export const categories = [
  { label: 'Account', value: 'Account' },
  { label: 'Classes', value: 'Classes' },
  { label: 'Billing', value: 'Billing' },
  { label: 'General', value: 'General' },
] as const

export const faqStatuses = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
] as const
