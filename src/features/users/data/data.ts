import { Shield, UserCheck, Crown } from 'lucide-react'
import { type UserStatus } from './schema'

export const statusStyles = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
])

export const roles = [
  {
    label: 'Admin',
    value: 'admin',
    icon: Shield,
  },
  {
    label: 'Head Coach',
    value: 'head_coach',
    icon: Crown,
  },
  {
    label: 'Coach',
    value: 'coach',
    icon: UserCheck,
  },
] as const

export const statuses = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
] as const
