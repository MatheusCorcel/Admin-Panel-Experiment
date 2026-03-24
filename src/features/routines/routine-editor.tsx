import { useState, useCallback } from 'react'
import { Link, getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  ArrowLeft,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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

type SortableExerciseRowProps = {
  exercise: Exercise
  onEdit: (exercise: Exercise) => void
  onRemove: (exercise: Exercise) => void
}

function SortableExerciseRow({
  exercise,
  onEdit,
  onRemove,
}: SortableExerciseRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const display = getExerciseDisplay(exercise)

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className='w-[40px]'>
        <button
          type='button'
          className='cursor-grab touch-none text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing'
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
      </TableCell>
      <TableCell className='w-[50px] font-medium'>{exercise.order}</TableCell>
      <TableCell className='font-medium'>{display.name}</TableCell>
      <TableCell>
        <Badge variant='secondary'>{display.label}</Badge>
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
      <TableCell className='w-[80px]'>{display.sets}</TableCell>
      <TableCell className='w-[100px]'>{display.reps}</TableCell>
      <TableCell>{display.rest}</TableCell>
      <TableCell className='min-w-[200px] text-muted-foreground'>
        {display.cues}
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex items-center justify-end gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => onEdit(exercise)}
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 text-destructive hover:text-destructive'
            onClick={() => onRemove(exercise)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

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

  const sensors = useSensors(useSensor(PointerSensor))

  const reorder = useCallback(
    (list: Exercise[]) => list.map((ex, i) => ({ ...ex, order: i + 1 })),
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setExercises((prev) => {
      const oldIndex = prev.findIndex((ex) => ex.id === active.id)
      const newIndex = prev.findIndex((ex) => ex.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return prev
      return reorder(arrayMove(prev, oldIndex, newIndex))
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
                <TableHead className='w-[40px]' />
                <TableHead className='w-[50px]'>#</TableHead>
                <TableHead>Exercise Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className='w-[80px]'>Sets</TableHead>
                <TableHead className='w-[100px]'>Reps</TableHead>
                <TableHead>Rec. Rest</TableHead>
                <TableHead className='min-w-[200px]'>Coach Cues</TableHead>
                <TableHead className='w-[100px] text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.length ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={exercises.map((ex) => ex.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {exercises.map((exercise) => (
                      <SortableExerciseRow
                        key={exercise.id}
                        exercise={exercise}
                        onEdit={handleEditExercise}
                        onRemove={(ex) => setRemoveTarget(ex)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className='h-24 text-center'>
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
        desc={`Are you sure you want to publish "${name}"? All changes will be pushed to the mobile app.`}
        confirmText='Publish'
        handleConfirm={confirmPublish}
      />
    </>
  )
}
