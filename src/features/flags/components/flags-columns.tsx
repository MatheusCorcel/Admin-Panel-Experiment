import { endOfDay, startOfDay } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { type DateRangeFilterValue } from '@/hooks/use-table-url-state'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import {
  categoryStyles,
  classTypeLabels,
  flagCategories,
  flagNameLabels,
  getDisplayStatus,
  getDueResolvedLabel,
  statusStyles,
} from '../data/data'
import { type Flag } from '../data/schema'

export const flagsColumns: ColumnDef<Flag>[] = [
  {
    id: 'client',
    accessorFn: (row) => row.client.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Client' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.client.name}</span>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
    id: 'coach',
    accessorFn: (row) => row.responsibleCoachName ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Coach' />
    ),
    cell: ({ row }) => {
      const { responsibleCoachName } = row.original
      if (responsibleCoachName) return <span>{responsibleCoachName}</span>
      return <span className='text-muted-foreground'>—</span>
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const category = flagCategories.find(
        ({ value }) => value === row.original.category
      )
      if (!category) return null
      return (
        <Badge
          variant='outline'
          className={categoryStyles.get(row.original.category)}
        >
          {category.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'flag',
    accessorFn: (row) => flagNameLabels[row.flagName],
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Flag' />
    ),
    cell: ({ row }) => <span>{flagNameLabels[row.original.flagName]}</span>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'classType',
    accessorFn: (row) => row.classType ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Class' />
    ),
    cell: ({ row }) => {
      const { classType } = row.original
      return (
        <span className={classType ? undefined : 'text-muted-foreground'}>
          {classType ? classTypeLabels[classType] : '—'}
        </span>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'location',
    accessorFn: (row) => row.location ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => {
      const { location } = row.original
      return (
        <span className={location ? undefined : 'text-muted-foreground'}>
          {location ?? '—'}
        </span>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'exercise',
    accessorFn: (row) => row.exerciseName ?? '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Exercise' />
    ),
    cell: ({ row }) => {
      const { exerciseName } = row.original
      return (
        <span className={exerciseName ? undefined : 'text-muted-foreground'}>
          {exerciseName ?? '—'}
        </span>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
        <Badge
          variant='outline'
          className={cn('capitalize', statusStyles.get(displayStatus))}
        >
          {displayStatus}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'createdAt',
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>
        {row.original.createdAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </span>
    ),
    filterFn: (row, id, value: DateRangeFilterValue) => {
      if (!value.from && !value.to) return true
      const date = row.getValue(id) as Date
      if (value.from && date < startOfDay(value.from)) return false
      if (value.to && date > endOfDay(value.to)) return false
      return true
    },
  },
  {
    id: 'dueResolved',
    accessorFn: (row) => getDueResolvedLabel(row),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Due / Resolved' />
    ),
    cell: ({ row }) => {
      const displayStatus = getDisplayStatus(row.original)
      return (
        <span
          className={cn(
            'text-nowrap',
            displayStatus === 'overdue'
              ? 'text-red-600 dark:text-red-400'
              : 'text-muted-foreground'
          )}
        >
          {getDueResolvedLabel(row.original)}
        </span>
      )
    },
  },
]
