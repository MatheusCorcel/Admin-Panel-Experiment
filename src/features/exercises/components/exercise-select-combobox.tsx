import { useState } from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { groupByMuscleGroup } from '../lib/group-by-muscle-group'
import type { ExerciseTemplate } from '../data/schema'

type ExerciseSelectComboboxProps = {
  value: string | undefined
  onChange: (value: string | undefined) => void
  exercises: ExerciseTemplate[]
  excludeIds?: string[]
  placeholder?: string
  disabled?: boolean
}

export function ExerciseSelectCombobox({
  value,
  onChange,
  exercises,
  excludeIds = [],
  placeholder = 'Select an exercise',
  disabled,
}: ExerciseSelectComboboxProps) {
  const [open, setOpen] = useState(false)

  const options = exercises.filter(
    (ex) => ex.id === value || !excludeIds.includes(ex.id)
  )
  const groups = groupByMuscleGroup(options)
  const selected = exercises.find((ex) => ex.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className='w-full justify-between font-normal'
        >
          <span
            className={cn(
              'truncate',
              !selected && 'text-muted-foreground'
            )}
          >
            {selected ? selected.name : placeholder}
          </span>
          <div className='ml-2 flex shrink-0 items-center gap-1'>
            {selected && (
              <X
                className='size-4 opacity-50 hover:opacity-100'
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(undefined)
                }}
              />
            )}
            <ChevronsUpDown className='size-4 opacity-50' />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[--radix-popover-trigger-width] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Search exercises...' />
          <CommandList>
            <CommandEmpty>No exercises found.</CommandEmpty>
            {groups.map(({ group, label, items }) => (
              <CommandGroup key={group} heading={label}>
                {items.map((ex) => (
                  <CommandItem
                    key={ex.id}
                    value={ex.name}
                    onSelect={() => {
                      onChange(ex.id)
                      setOpen(false)
                    }}
                    className='cursor-pointer'
                  >
                    <Check
                      className={cn(
                        'mr-2 size-4',
                        value === ex.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <span className='text-sm font-medium'>{ex.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
