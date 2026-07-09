import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
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
import {
  contributionMuscleLabels,
  contributionMuscles,
  type ContributionMuscle,
} from '../data/schema'

type MuscleComboboxProps = {
  value: ContributionMuscle | undefined
  onChange: (value: ContributionMuscle) => void
  excludeMuscles?: ContributionMuscle[]
  placeholder?: string
  disabled?: boolean
}

export function MuscleCombobox({
  value,
  onChange,
  excludeMuscles = [],
  placeholder = 'Select a muscle',
  disabled,
}: MuscleComboboxProps) {
  const [open, setOpen] = useState(false)

  const options = contributionMuscles.filter(
    (muscle) => muscle === value || !excludeMuscles.includes(muscle)
  )

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
          <span className={cn(!value && 'text-muted-foreground')}>
            {value ? contributionMuscleLabels[value] : placeholder}
          </span>
          <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[--radix-popover-trigger-width] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Search muscles...' />
          <CommandList>
            <CommandEmpty>No muscle found.</CommandEmpty>
            <CommandGroup>
              {options.map((muscle) => (
                <CommandItem
                  key={muscle}
                  value={contributionMuscleLabels[muscle]}
                  onSelect={() => {
                    onChange(muscle)
                    setOpen(false)
                  }}
                  className='cursor-pointer'
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === muscle ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {contributionMuscleLabels[muscle]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
