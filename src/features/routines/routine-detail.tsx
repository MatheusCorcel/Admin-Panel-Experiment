import { Link, useParams } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  ArrowLeft,
  Pencil,
  MoreHorizontal,
  Copy,
  Trash2,
  EyeOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { statusStyles, routineTypes, getExerciseDisplay } from './data/data'
import { routines, routineExercises } from './data/routines'

export function RoutineDetail() {
  const { routineId } = useParams({ from: '/_authenticated/routines/$routineId/' })
  const routine = routines.find((r) => r.id === routineId)

  if (!routine) {
    return (
      <>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main className='flex flex-1 flex-col items-center justify-center gap-2'>
          <h2 className='text-2xl font-bold'>Routine not found</h2>
          <p className='text-muted-foreground'>
            The routine you are looking for does not exist.
          </p>
          <Button variant='outline' asChild className='mt-4'>
            <Link to='/routines'>
              <ArrowLeft size={16} className='mr-2' />
              Back to Routines
            </Link>
          </Button>
        </Main>
      </>
    )
  }

  const exercises = routineExercises[routine.id] ?? []
  const routineType = routineTypes.find(({ value }) => value === routine.type)
  const badgeColor = statusStyles.get(routine.status)

  return (
    <>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-6'>
        <div>
          <Button variant='link' asChild className='mb-2 -ml-4 text-muted-foreground'>
            <Link to='/routines'>
              <ArrowLeft size={16} className='mr-1' />
              Back to Routines
            </Link>
          </Button>

          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-wrap items-center gap-3'>
                <h2 className='text-2xl font-bold tracking-tight'>
                  {routine.name}
                </h2>
                {routineType && (
                  <Badge variant='secondary' className='gap-1'>
                    {routineType.icon && <routineType.icon size={14} />}
                    {routineType.label}
                  </Badge>
                )}
                <Badge variant='outline' className={cn('capitalize', badgeColor)}>
                  {routine.status}
                </Badge>
              </div>
              <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
                <span>
                  Last Updated:{' '}
                  <span className='text-foreground'>
                    {format(routine.lastUpdated, 'MMM d, yyyy')}
                  </span>
                </span>
                <span>
                  Created By:{' '}
                  <span className='text-foreground'>{routine.createdBy}</span>
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button asChild>
                <Link
                  to='/routines/$routineId/edit'
                  params={{ routineId: routine.id }}
                >
                  <Pencil size={16} className='mr-2' />
                  Edit Routine
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='icon'>
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-[180px]'>
                  {routine.status === 'published' && (
                    <DropdownMenuItem>
                      Unpublish
                      <DropdownMenuShortcut>
                        <EyeOff size={16} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    Duplicate
                    <DropdownMenuShortcut>
                      <Copy size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-red-500!'>
                    Delete
                    <DropdownMenuShortcut>
                      <Trash2 size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className='overflow-hidden rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[60px]'>#</TableHead>
                <TableHead>Exercise Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className='w-[80px]'>Sets</TableHead>
                <TableHead className='w-[100px]'>Reps</TableHead>
                <TableHead>Rec. Rest</TableHead>
                <TableHead className='min-w-[200px]'>Coach Cues</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.length ? (
                exercises.map((exercise) => {
                  const display = getExerciseDisplay(exercise)
                  return (
                    <TableRow key={exercise.id}>
                      <TableCell className='font-medium'>
                        {exercise.order}
                      </TableCell>
                      <TableCell className='font-medium'>
                        {display.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant='secondary'>
                          {display.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {display.category ? (
                          <Badge variant='outline' className='capitalize'>
                            {display.category}
                          </Badge>
                        ) : (
                          <span className='text-muted-foreground'>—</span>
                        )}
                      </TableCell>
                      <TableCell>{display.sets}</TableCell>
                      <TableCell>{display.reps}</TableCell>
                      <TableCell>{display.rest}</TableCell>
                      <TableCell className='text-muted-foreground'>
                        {display.cues}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className='h-24 text-center'>
                    No exercises in this routine.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>
    </>
  )
}
