import { useEffect, useMemo, useState } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { isSameDay } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar, DataTableViewOptions } from '@/components/data-table'
import { feedbackStatuses, classTypes, coachOptions, locationOptions } from '../data/data'
import { type Feedback } from '../data/schema'
import { feedbackColumns as columns } from './feedback-columns'
import { useFeedback } from './feedback-provider'

type DataTableProps = {
  data: Feedback[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function FeedbackTable({ data, search, navigate }: DataTableProps) {
  const { setOpen, setCurrentRow } = useFeedback()
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [dateFilter, setDateFilter] = useState<Date | undefined>()

  const filteredData = useMemo(
    () =>
      dateFilter
        ? data.filter((item) => isSameDay(item.classDate, dateFilter))
        : data,
    [data, dateFilter]
  )

  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: false },
    columnFilters: [
      { columnId: 'content', searchKey: 'keyword', type: 'string' },
      { columnId: 'status', searchKey: 'status', type: 'array' },
      { columnId: 'classType', searchKey: 'classType', type: 'array' },
      { columnId: 'coachName', searchKey: 'coachName', type: 'array' },
      { columnId: 'location', searchKey: 'location', type: 'array' },
    ],
  })

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: false,
    onPaginationChange,
    onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    ensurePageInRange(table.getPageCount())
  }, [table, ensurePageInRange])

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
        <DataTableToolbar
          table={table}
          searchPlaceholder='Search by keyword...'
          searchKey='content'
          hideViewOptions
          filters={[
            {
              columnId: 'location',
              title: 'Location',
              options: locationOptions.map(({ label, value }) => ({
                label,
                value,
              })),
            },
            {
              columnId: 'status',
              title: 'Status',
              options: feedbackStatuses.map(({ label, value }) => ({
                label,
                value,
              })),
            },
            {
              columnId: 'coachName',
              title: 'Coach',
              options: coachOptions.map(({ label, value }) => ({
                label,
                value,
              })),
            },
            {
              columnId: 'classType',
              title: 'Class Type',
              options: classTypes.map(({ label, value }) => ({ label, value })),
            },
          ]}
        />
        <div className='flex items-center gap-2'>
          <DataTableViewOptions table={table} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className={cn(
                  'h-8 gap-1 text-sm font-normal',
                  dateFilter && 'border-primary text-primary'
                )}
              >
                <CalendarIcon size={14} />
                {dateFilter
                  ? format(dateFilter, 'MMM d, yyyy')
                  : 'Filter by date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {dateFilter && (
            <Button
              variant='ghost'
              size='sm'
              className='h-8 px-2'
              onClick={() => setDateFilter(undefined)}
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                      header.column.columnDef.meta?.className,
                      header.column.columnDef.meta?.thClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group/row cursor-pointer'
                  onClick={() => {
                    setCurrentRow(row.original)
                    setOpen('detail')
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        cell.column.columnDef.meta?.className,
                        cell.column.columnDef.meta?.tdClassName
                      )}
                      onClick={
                        cell.column.id === 'actions'
                          ? (e) => e.stopPropagation()
                          : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No feedback found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className='mt-auto' />
    </div>
  )
}
