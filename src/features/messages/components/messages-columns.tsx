import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { CopyableEmail } from '@/components/copyable-email'
import { statusStyles, senderTypeStyles } from '../data/data'
import { type ContactMessage } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const messagesColumns: ColumnDef<ContactMessage>[] = [
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
    accessorKey: 'senderName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <span>{row.getValue('senderName')}</span>,
  },
  {
    accessorKey: 'senderEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <CopyableEmail
        email={row.getValue('senderEmail')}
        className='text-muted-foreground text-sm'
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'senderType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User Type' />
    ),
    cell: ({ row }) => {
      const senderType = row.original.senderType
      const badgeColor = senderTypeStyles.get(senderType)
      return (
        <Badge variant='outline' className={cn('capitalize', badgeColor)}>
          {senderType}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return (
        <span className='text-nowrap'>{format(date, 'MM/dd/yyyy hh:mm a')}</span>
      )
    },
  },
  {
    accessorKey: 'message',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Preview' />
    ),
    cell: ({ row }) => {
      const message = row.getValue('message') as string
      const truncated =
        message.length > 60 ? `${message.slice(0, 60)}…` : message
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
