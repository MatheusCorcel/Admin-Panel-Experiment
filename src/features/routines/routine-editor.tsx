import { useState, useCallback } from 'react'
import { Link, getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { ConfirmDialog } from '@/components/confirm-dialog'
import { statusStyles, routineTypes, getExerciseDisplay } from './data/data'
import { routines, routineExercises } from './data/routines'
import { type Exercise, type RoutineType } from './data/schema'
import { ExerciseEditorDialog } from './components/exercise-editor-dialog'

const editRoute = getRouteApi('/_authenticated/routines/$routineId/edit')

export function RoutineEditor() {
  const { routineId } = editRoute.useParams()
  const isNew = routineId === 'new'
  const routine = isNew ? null : routines.find((r) => r.id === routineId)

  const [name, setName] = useState(routine?.name ?? '')
  const [type, setType] = useState<RoutineType>(routine?.type ?? 'push')
  const status = routine?.status ?? 'draft'

  const [exercises, setExercises] = useState<Exercise[]>(() => {
    if (isNew || !routine) return []
    return [...(routineExercises[routine.id] ?? [])].map((ex) => ({ ...ex }))
  })

  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [removeTarget, setRemoveTarget] = useState<Exercise | null>(null)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)

  const badgeColor = statusStyles.get(status)

  const reorder = useCallback(
    (exercises: Exercise[]) =>
      exercises.map((ex, i) => ({ ...ex, order: i + 1 })),
    []
  )

  const handleAddExercise = () => {
    setEditingExercise(null)
    setExerciseDialogOpen(true)
  }

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setExerciseDialogOpen(true)
  }

  const handleSaveExercise = (exercise: Exercise) => {
    setExercises((prev) => {
      const existingIndex = prev.findIndex((ex) => ex.id === exercise.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = { ...exercise, order: existingIndex + 1 }
        return updated
      }
      return reorder([...prev, exercise])
    })
  }

  const handleRemoveExercise = () => {
    if (!removeTarget) return
    setExercises((prev) =>
      reorder(prev.filter((ex) => ex.id !== removeTarget.id))
    )
    setRemoveTarget(null)
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    setExercises((prev) => {
      const updated = [...prev]
      ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
      return reorder(updated)
    })
  }

  const handleMoveDown = (index: number) => {
    setExercises((prev) => {
      if (index >= prev.length - 1) return prev
      const updated = [...prev]
      ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
      return reorder(updated)
    })
  }

  const handleSaveDraft = () => {
    if (!name.trim()) {
      toast.error('Routine name is required.')
      return
    }
    toast.success('Routine saved as draft.', { description: name })
  }

  const handlePublish = () => {
    if (!name.trim()) {
      toast.error('Routine name is required.')
      return
    }
    if (exercises.length === 0) {
      toast.error('Add at least one exercise before publishing.')
      return
    }
    setPublishDialogOpen(true)
  }

  const confirmPublish = () => {
    setPublishDialogOpen(false)
    toast.success('Routine published successfully.', { description: name })
  }

  if (!isNew && !routine) {
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

  const backTo = isNew ? '/routines' : `/routines/${routineId}`
  const backLabel = isNew ? 'Back to Routines' : 'Back to Routine'

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
          <Button
            variant='link'
            asChild
            className='mb-2 -ml-4 text-muted-foreground'
          >
            <Link to={backTo}>
              <ArrowLeft size={16} className='mr-1' />
              {backLabel}
            </Link>
          </Button>

          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-wrap items-center gap-3'>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Routine name...'
                  className='h-auto border-transparent bg-transparent px-0 text-2xl font-bold tracking-tight shadow-none placeholder:text-muted-foreground/50 focus-visible:border-border focus-visible:ring-0'
                />
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as RoutineType)}
                >
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {routineTypes.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge
                  variant='outline'
                  className={cn('capitalize', badgeColor)}
                >
                  {status}
                </Badge>
              </div>
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
                <TableHead className='w-[80px]'>Sets</TableHead>
                <TableHead className='w-[100px]'>Reps</TableHead>
                <TableHead>Rec. Weight</TableHead>
                <TableHead className='min-w-[200px]'>Coach Cues</TableHead>
                <TableHead className='w-[140px] text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.length ? (
                exercises.map((exercise, index) => {
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
                      <TableCell>{display.sets}</TableCell>
                      <TableCell>{display.reps}</TableCell>
                      <TableCell>{display.weight}</TableCell>
                      <TableCell className='text-muted-foreground'>
                        {display.cues}
                      </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8'
                          disabled={index === 0}
                          onClick={() => handleMoveUp(index)}
                        >
                          <ArrowUp size={14} />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8'
                          disabled={index === exercises.length - 1}
                          onClick={() => handleMoveDown(index)}
                        >
                          <ArrowDown size={14} />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8'
                          onClick={() => handleEditExercise(exercise)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-destructive hover:text-destructive'
                          onClick={() => setRemoveTarget(exercise)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className='h-24 text-center'>
                    No exercises yet. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div>
          <Button variant='outline' onClick={handleAddExercise}>
            <Plus size={16} className='mr-2' />
            Add Exercise
          </Button>
        </div>

        <div className='flex items-center gap-2 border-t pt-4'>
          <Button variant='outline' onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button onClick={handlePublish}>Publish</Button>
          <Button variant='ghost' asChild>
            <Link to={backTo}>Cancel</Link>
          </Button>
        </div>
      </Main>

      <ExerciseEditorDialog
        open={exerciseDialogOpen}
        onOpenChange={setExerciseDialogOpen}
        exercise={editingExercise}
        onSave={handleSaveExercise}
      />

      <ConfirmDialog
        open={!!removeTarget}
        onOpenChange={(open) => {
          if (!open) setRemoveTarget(null)
        }}
        title='Remove Exercise'
        desc={`Are you sure you want to remove "${removeTarget ? getExerciseDisplay(removeTarget).name : ''}" from this routine?`}
        confirmText='Remove'
        destructive
        handleConfirm={handleRemoveExercise}
      />

      <ConfirmDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        title='Publish Routine'
        desc={`Are you sure you want to publish "${name}"? This will make it available to all users.`}
        confirmText='Publish'
        handleConfirm={confirmPublish}
      />
    </>
  )
}
