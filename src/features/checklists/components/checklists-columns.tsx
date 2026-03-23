import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { statusStyles, checklistTypes } from '../data/data'
import { type ChecklistBundle } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const checklistsColumns: ColumnDef<ChecklistBundle>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bundle Name' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('name')}</span>
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
      const checklistType = checklistTypes.find(({ value }) => value === type)
      if (!checklistType) return null
      return (
        <div className='flex items-center gap-x-2'>
          {checklistType.icon && (
            <checklistType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm'>{checklistType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => (
      <span className='text-sm'>{row.getValue('location')}</span>
    ),
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
    accessorKey: 'itemCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Items' />
    ),
    cell: ({ row }) => <span>{row.getValue('itemCount')}</span>,
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
