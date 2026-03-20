import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { statusStyles } from '../data/data'
import { type Feedback } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const feedbackColumns: ColumnDef<Feedback>[] = [
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{row.getValue('location')}</span>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'coachName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Coach' />
    ),
    cell: ({ row }) => <span>{row.getValue('coachName')}</span>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'classType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Class Type' />
    ),
    cell: ({ row }) => <span>{row.getValue('classType')}</span>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'classDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Class Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('classDate') as Date
      return (
        <span className='text-nowrap'>
          {format(date, 'MM/dd/yyyy hh:mm a')}
        </span>
      )
    },
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Preview' />
    ),
    cell: ({ row }) => {
      const content = row.getValue('content') as string
      const truncated =
        content.length > 60 ? `${content.slice(0, 60)}…` : content
      return (
        <span className='text-muted-foreground text-sm'>{truncated}</span>
      )
    },
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
    id: 'actions',
    cell: DataTableRowActions,
  },
]
