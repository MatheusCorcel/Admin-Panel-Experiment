import { type ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { statusStyles, routineTypes } from '../data/data'
import { type Routine } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const routinesColumns: ColumnDef<Routine>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Routine Name' />
    ),
    cell: ({ row }) => (
      <Link
        to='/routines/$routineId'
        params={{ routineId: row.original.id }}
        className='font-medium text-primary hover:underline'
      >
        {row.getValue('name')}
      </Link>
    ),
    enableHiding: false,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const { type } = row.original
      const routineType = routineTypes.find(({ value }) => value === type)
      if (!routineType) return null
      return (
        <div className='flex items-center gap-x-2'>
          {routineType.icon && (
            <routineType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm'>{routineType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = statusStyles.get(status)
      return (
        <Badge variant='outline' className={cn('capitalize', badgeColor)}>
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'exerciseCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Exercises' />
    ),
    cell: ({ row }) => <span>{row.getValue('exerciseCount')}</span>,
  },
  {
    accessorKey: 'createdBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created By' />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.getValue('createdBy')}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'lastUpdated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Updated' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('lastUpdated') as Date
      return <span className='text-nowrap'>{format(date, 'MM/dd/yyyy')}</span>
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
