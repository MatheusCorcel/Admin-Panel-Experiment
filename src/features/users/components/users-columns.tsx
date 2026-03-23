import { type ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { statusStyles, roles } from '../data/data'
import { type User } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const usersColumns: ColumnDef<User>[] = [
  {
    id: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const { firstName, lastName, id } = row.original
      return (
        <Link
          to='/users/$userId'
          params={{ userId: id }}
          className='font-medium text-primary hover:underline'
        >
          {firstName} {lastName}
        </Link>
      )
    },
    enableHiding: false,
    sortingFn: (a, b) => {
      const nameA = `${a.original.firstName} ${a.original.lastName}`
      const nameB = `${b.original.firstName} ${b.original.lastName}`
      return nameA.localeCompare(nameB)
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const userRole = roles.find(({ value }) => value === role)
      if (!userRole) return null
      return (
        <div className='flex items-center gap-x-2'>
          {userRole.icon && (
            <userRole.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm'>{userRole.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.getValue('email')}</span>
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => <span>{row.getValue('location')}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'lastCheckIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Check In' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('lastCheckIn') as Date | null
      if (!date) return <span className='text-muted-foreground'>—</span>
      return <span className='text-nowrap'>{format(date, 'MM/dd/yyyy hh:mm a')}</span>
    },
  },
  {
    accessorKey: 'classesMissed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Missed' />
    ),
    cell: ({ row }) => {
      const val = row.getValue('classesMissed') as number
      const isAdmin = row.original.role === 'admin'
      if (isAdmin) return <span className='text-muted-foreground'>—</span>
      return <span>{String(val).padStart(2, '0')}</span>
    },
  },
  {
    accessorKey: 'classesCompleted',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Completed' />
    ),
    cell: ({ row }) => {
      const val = row.getValue('classesCompleted') as number
      const isAdmin = row.original.role === 'admin'
      if (isAdmin) return <span className='text-muted-foreground'>—</span>
      return <span>{val}</span>
    },
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
