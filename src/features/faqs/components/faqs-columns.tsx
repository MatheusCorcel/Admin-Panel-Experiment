import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { statusStyles } from '../data/data'
import { type Faq } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const faqsColumns: ColumnDef<Faq>[] = [
  {
    id: 'dragHandle',
    header: () => null,
    cell: () => (
      <span className='cursor-grab text-muted-foreground select-none'>⠿</span>
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { className: 'w-8' },
  },
  {
    accessorKey: 'question',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Question' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('question')}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'answer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Answer Preview' />
    ),
    cell: ({ row }) => {
      const answer = row.getValue('answer') as string
      const truncated = answer.length > 80 ? `${answer.slice(0, 80)}…` : answer
      return (
        <span className='text-muted-foreground text-sm'>{truncated}</span>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => <span>{row.getValue('category')}</span>,
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
    id: 'actions',
    cell: DataTableRowActions,
  },
]
