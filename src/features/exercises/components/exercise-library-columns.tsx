import { type ColumnDef } from '@tanstack/react-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table'
import {
  contributionMuscleLabels,
  muscleGroupLabels,
  exerciseTypeLabels,
  type ExerciseTemplate,
} from '../data/schema'
import { useExerciseLibrary } from './exercise-library-provider'

function RowActions({ row }: { row: { original: ExerciseTemplate } }) {
  const { setOpen, setCurrentRow } = useExerciseLibrary()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('edit')
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('delete')
          }}
          className='text-red-500!'
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const exerciseLibraryColumns: ColumnDef<ExerciseTemplate>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Exercise Name' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('name')}</span>
    ),
    enableHiding: false,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'muscleGroup',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Muscle Group' />
    ),
    cell: ({ row }) => {
      const group = row.getValue('muscleGroup') as keyof typeof muscleGroupLabels
      return (
        <Badge variant='outline' className='capitalize'>
          {muscleGroupLabels[group] ?? group}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    id: 'muscleContribution',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Muscle Contribution' />
    ),
    cell: ({ row }) => {
      const exercise = row.original
      if (!exercise.primaryMuscle) {
        return <span className='text-muted-foreground'>—</span>
      }
      const secondary = exercise.secondaryMuscles ?? []
      return (
        <div className='flex flex-col gap-0.5'>
          <Badge variant='outline' className='w-fit'>
            {contributionMuscleLabels[exercise.primaryMuscle.muscle]} ·{' '}
            {exercise.primaryMuscle.contribution}
          </Badge>
          {secondary.length > 0 && (
            <span className='text-xs text-muted-foreground'>
              +{' '}
              {secondary
                .map(
                  (m) => `${contributionMuscleLabels[m.muscle]} ${m.contribution}`
                )
                .join(', ')}
            </span>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'exerciseType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type = row.getValue('exerciseType') as keyof typeof exerciseTypeLabels
      return (
        <Badge variant='secondary' className='capitalize'>
          {exerciseTypeLabels[type] ?? type}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'coachCues',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Coach Cues' />
    ),
    cell: ({ row }) => {
      const cues = row.getValue('coachCues') as string
      return (
        <span className='line-clamp-2 max-w-sm text-sm text-muted-foreground'>
          {cues}
        </span>
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions row={row} />,
  },
]
