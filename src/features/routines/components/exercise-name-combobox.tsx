import { useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover'
import { exerciseTemplates } from '@/features/exercises/data/exercises'
import { muscleGroupLabels } from '@/features/exercises/data/schema'

type ExerciseNameComboboxProps = {
  value: string
  onChange: (value: string) => void
  onSelectExercise: (coachCues: string) => void
  placeholder?: string
}

export function ExerciseNameCombobox({
  value,
  onChange,
  onSelectExercise,
  placeholder = 'e.g., Barbell Bench Press',
}: ExerciseNameComboboxProps) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = value.trim()
    ? exerciseTemplates.filter((ex) =>
        ex.name.toLowerCase().includes(value.toLowerCase())
      )
    : []

  const handleSelect = (exerciseName: string) => {
    const match = exerciseTemplates.find((ex) => ex.name === exerciseName)
    onChange(exerciseName)
    if (match) {
      onSelectExercise(match.coachCues)
    }
    setOpen(false)
    inputRef.current?.blur()
  }

  return (
    <Popover open={open && filtered.length > 0} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <Input
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            if (filtered.length > 0) setOpen(true)
          }}
          onBlur={() => {
            setTimeout(() => setOpen(false), 150)
          }}
          autoComplete='off'
        />
      </PopoverAnchor>
      <PopoverContent
        className='w-[--radix-popover-trigger-width] p-0'
        align='start'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList>
            <CommandEmpty>No exercises found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((ex) => (
                <CommandItem
                  key={ex.id}
                  value={ex.name}
                  onSelect={handleSelect}
                  className='cursor-pointer'
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === ex.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium'>{ex.name}</span>
                    <span className='text-xs text-muted-foreground'>
                      {muscleGroupLabels[ex.muscleGroup]}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
