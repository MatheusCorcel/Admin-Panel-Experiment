import { ClipboardCheck, ClipboardList } from 'lucide-react'
import { type ChecklistStatus } from './schema'

export const checklistTypes = [
  {
    label: 'Pre-Class',
    value: 'pre_class',
    icon: ClipboardList,
  },
  {
    label: 'Post-Class',
    value: 'post_class',
    icon: ClipboardCheck,
  },
] as const

export const checklistLocations = [
  { label: 'BAM New York', value: 'BAM New York' },
  { label: 'BAM Mexico', value: 'BAM Mexico' },
  { label: 'BAM Madrid', value: 'BAM Madrid' },
] as const

export const checklistStatuses = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
] as const

export const statusStyles = new Map<ChecklistStatus, string>([
  [
    'published',
    'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
  ],
  [
    'draft',
    'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200',
  ],
])
