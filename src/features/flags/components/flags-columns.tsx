import { endOfDay, startOfDay } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { type DateRangeFilterValue } from '@/hooks/use-table-url-state'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import {
  classTypeLabels,
  flagNameLabels,
  flagTypeLabels,
  flagTypeStyles,
  getClassProgressLabel,
  getClassProgressSortValue,
  getCurrentOwner,
  getDisplayStatus,
  getFlagType,
  getResolvedByLabel,
  isOverdue,
  statusLabels,
  statusStyles,
} from '../data/data'
import { type Flag } from '../data/schema'

const dash = <span className='text-muted-foreground'>—</span>

const shortDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

// Order follows the Aug 26 sync: people and accountability first (client,
// creator, owner, status + class progress, resolver), then what the flag is
// about, with Class last. Status and class progress stay separate columns
// so each can be sorted and filtered on its own.
export const flagsColumns: ColumnDef<Flag>[] = [
  {
    id: 'client',
    accessorFn: (row) => row.client.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Client' />
    ),
    cell: ({ row }) => (
      <span className='font-medium text-nowrap'>{row.original.client.name}</span>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: false,
    // Pinned so the row stays identifiable when narrow laptops scroll the
    // table sideways.
    meta: { label: 'Client', className: 'sticky start-0 z-10 border-e' },
  },
  {
    // A separate, always-hidden column for the free-text search box. It
    // must not share the 'client' column: that one's filter value is an
    // array (for the "+ Client" facet), while the search box's is a plain
    // string — reusing the same column let the two stomp on each other's
    // filter value.
    id: 'clientSearch',
    accessorFn: (row) => row.client.name,
    enableHiding: false,
    filterFn: (row, id, value: string) =>
      row.getValue<string>(id).toLowerCase().includes(value.toLowerCase()),
  },
  {
    id: 'createdBy',
    accessorFn: (row) => row.createdByName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created by' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{row.original.createdByName}</span>
    ),
    meta: { label: 'Created by' },
  },
  {
    id: 'createdAt',
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created date' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{shortDate(row.original.createdAt)}</span>
    ),
    filterFn: (row, id, value: DateRangeFilterValue) => {
      if (!value.from && !value.to) return true
      const date = row.getValue(id) as Date
      if (value.from && date < startOfDay(value.from)) return false
      if (value.to && date > endOfDay(value.to)) return false
      return true
    },
    meta: { label: 'Created date' },
  },
  {
    // Transient: only populated while the flag is still open. Once it's
    // resolved or permanent, "Resolved by" is the lasting record instead.
    id: 'currentOwner',
    accessorFn: (row) => getCurrentOwner(row) ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Current owner' />
    ),
    cell: ({ row }) => {
      const owner = getCurrentOwner(row.original)
      return owner ? <span className='text-nowrap'>{owner}</span> : dash
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    meta: { label: 'Current owner' },
  },
  {
    id: 'status',
    accessorFn: (row) => getDisplayStatus(row),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const displayStatus = getDisplayStatus(row.original)
      return (
        <Badge variant='outline' className={statusStyles.get(displayStatus)}>
          {statusLabels[displayStatus]}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    meta: { label: 'Status' },
  },
  {
    id: 'classProgress',
    accessorFn: (row) => getClassProgressSortValue(row),
    sortUndefined: 'last',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Class progress' />
    ),
    cell: ({ row }) => {
      const progress = getClassProgressLabel(row.original)
      if (!progress) return dash
      return (
        <span
          className={cn(
            'text-nowrap',
            isOverdue(row.original) && 'text-red-600 dark:text-red-400',
            row.original.status !== 'active' && 'text-muted-foreground'
          )}
        >
          {progress}
        </span>
      )
    },
    meta: { label: 'Class progress' },
  },
  {
    id: 'resolvedBy',
    accessorFn: (row) => getResolvedByLabel(row) ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Resolved by' />
    ),
    cell: ({ row }) => {
      const resolvedBy = getResolvedByLabel(row.original)
      if (!resolvedBy) return dash
      return (
        <span
          className={cn(
            'text-nowrap',
            !row.original.resolvedByName && 'text-muted-foreground'
          )}
        >
          {resolvedBy}
        </span>
      )
    },
    meta: { label: 'Resolved by' },
  },
  {
    // Hidden by default (View menu) to keep narrow screens readable; always
    // in the detail panel and the CSV.
    id: 'resolvedAt',
    accessorFn: (row) => row.resolvedAt ?? undefined,
    sortUndefined: 'last',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Resolved date' />
    ),
    cell: ({ row }) => {
      const { resolvedAt } = row.original
      return resolvedAt ? (
        <span className='text-nowrap'>{shortDate(resolvedAt)}</span>
      ) : (
        dash
      )
    },
    meta: { label: 'Resolved date' },
  },
  {
    // Derived from who created the flag, not from its category.
    id: 'type',
    accessorFn: (row) => getFlagType(row),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type = getFlagType(row.original)
      return (
        <Badge variant='outline' className={flagTypeStyles.get(type)}>
          {flagTypeLabels[type]}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    meta: { label: 'Type' },
  },
  {
    id: 'flag',
    accessorFn: (row) => flagNameLabels[row.flagName],
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Flag' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{flagNameLabels[row.original.flagName]}</span>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    meta: { label: 'Flag' },
  },
  {
    id: 'exercise',
    accessorFn: (row) => row.exerciseName ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Exercise' />
    ),
    cell: ({ row }) => {
      const { exerciseName } = row.original
      return exerciseName ? (
        <span className='font-medium text-nowrap'>{exerciseName}</span>
      ) : (
        dash
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    meta: { label: 'Exercise' },
  },
  {
    id: 'location',
    accessorFn: (row) => row.location ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => {
      const { location } = row.original
      return location ? <span className='text-nowrap'>{location}</span> : dash
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    meta: { label: 'Location' },
  },
  {
    id: 'classType',
    accessorFn: (row) => row.classType ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Class' />
    ),
    cell: ({ row }) => {
      const { classType } = row.original
      return classType ? <span>{classTypeLabels[classType]}</span> : dash
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    meta: { label: 'Class' },
  },
]
