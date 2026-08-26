import { format } from 'date-fns'
import { type Column } from '@tanstack/react-table'
import { CalendarIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type DateRangeFilterValue } from '@/hooks/use-table-url-state'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DateRangeFilterProps<TData> = {
  column: Column<TData, unknown> | undefined
}

export function DateRangeFilter<TData>({
  column,
}: DateRangeFilterProps<TData>) {
  if (!column) return null

  const value = (column.getFilterValue() as DateRangeFilterValue) ?? {}
  const isSet = Boolean(value.from || value.to)

  const label = isSet
    ? `Date: ${value.from ? format(value.from, 'MMM d') : '…'} – ${
        value.to ? format(value.to, 'MMM d, yyyy') : '…'
      }`
    : 'Date range'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn(
            'h-8 gap-1 text-sm font-normal',
            isSet && 'border-primary text-primary'
          )}
        >
          <CalendarIcon size={14} />
          {label}
          {isSet && (
            <span
              role='button'
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation()
                column.setFilterValue({})
              }}
              className='-mr-1 rounded-full p-0.5 hover:bg-muted'
              aria-label='Clear date range'
            >
              <XIcon size={12} />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='range'
          numberOfMonths={2}
          selected={{ from: value.from, to: value.to }}
          onSelect={(range) => column.setFilterValue(range ?? {})}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
