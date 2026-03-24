import { type MessageStatus, type SenderType } from './schema'

export const statusStyles = new Map<MessageStatus, string>([
  ['new', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['read', 'bg-neutral-300/40 border-neutral-300'],
])

export const senderTypeStyles = new Map<SenderType, string>([
  [
    'coach',
    'bg-purple-100/30 text-purple-900 dark:text-purple-200 border-purple-200',
  ],
  [
    'client',
    'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200',
  ],
])

export const messageStatuses = [
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
] as const

export const senderTypeOptions = [
  { label: 'Client', value: 'client' },
  { label: 'Coach', value: 'coach' },
] as const

export const locationOptions = [
  { label: 'BAM New York', value: 'BAM New York' },
  { label: 'BAM Mexico', value: 'BAM Mexico' },
  { label: 'BAM Madrid', value: 'BAM Madrid' },
] as const
