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
import { cn } from '@/lib/utils'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import {
  flagCategories,
  flagClassTypes,
  flagLocations,
  flagStatuses,
} from '../data/data'
import { type Flag } from '../data/schema'
import { DateRangeFilter } from './date-range-filter'
import { flagsColumns as columns } from './flags-columns'
import { useFlags } from './flags-provider'

type FlagsTableProps = {
  data: Flag[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function FlagsTable({ data, search, navigate }: FlagsTableProps) {
  const { setOpen, setCurrentRow, setVisibleFlags } = useFlags()
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    clientSearch: false,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  // Client/Coach/Exercise have no fixed enum, so their filter options come
  // from what's actually in the data rather than a static list.
  const clientOptions = useMemo(
    () =>
      Array.from(new Set(data.map((f) => f.client.name))).map((name) => ({
        label: name,
        value: name,
      })),
    [data]
  )
  const currentOwnerOptions = useMemo(
    () =>
      Array.from(
        new Set(
          data
            .map((f) => f.currentOwnerName)
            .filter((name): name is string => Boolean(name))
        )
      ).map((name) => ({ label: name, value: name })),
    [data]
  )
  const exerciseOptions = useMemo(
    () =>
      Array.from(
        new Set(
          data
            .map((f) => f.exerciseName)
            .filter((name): name is string => Boolean(name))
        )
      ).map((name) => ({ label: name, value: name })),
    [data]
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
      { columnId: 'clientSearch', searchKey: 'q', type: 'string' },
      { columnId: 'client', searchKey: 'client', type: 'array' },
      { columnId: 'currentOwner', searchKey: 'owner', type: 'array' },
      { columnId: 'category', searchKey: 'type', type: 'array' },
      { columnId: 'classType', searchKey: 'classType', type: 'array' },
      { columnId: 'location', searchKey: 'location', type: 'array' },
      { columnId: 'exercise', searchKey: 'exercise', type: 'array' },
      { columnId: 'status', searchKey: 'status', type: 'array' },
      {
        columnId: 'createdAt',
        type: 'dateRange',
        searchKeyFrom: 'dateFrom',
        searchKeyTo: 'dateTo',
      },
    ],
  })

  const table = useReactTable({
    data,
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

  const sortedRows = table.getSortedRowModel().rows
  useEffect(() => {
    setVisibleFlags(sortedRows.map((row) => row.original))
  }, [sortedRows, setVisibleFlags])

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by client...'
        searchKey='clientSearch'
        beforeFilters={
          <DateRangeFilter column={table.getColumn('createdAt')} />
        }
        filters={[
          { columnId: 'client', title: 'Client', options: clientOptions },
          {
            columnId: 'currentOwner',
            title: 'Current Owner',
            options: currentOwnerOptions,
          },
          {
            columnId: 'location',
            title: 'Location',
            options: flagLocations.map(({ label, value }) => ({
              label,
              value,
            })),
          },
          {
            columnId: 'classType',
            title: 'Class',
            options: flagClassTypes.map(({ label, value }) => ({
              label,
              value,
            })),
          },
          { columnId: 'exercise', title: 'Exercise', options: exerciseOptions },
          {
            columnId: 'category',
            title: 'Type',
            options: flagCategories.map(({ label, value }) => ({
              label,
              value,
            })),
          },
          {
            columnId: 'status',
            title: 'Status',
            options: flagStatuses.map(({ label, value }) => ({ label, value })),
          },
        ]}
      />
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
                  No flags found.
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
