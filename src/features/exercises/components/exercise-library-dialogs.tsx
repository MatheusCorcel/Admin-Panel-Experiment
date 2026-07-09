import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type ExerciseTemplate } from '../data/schema'
import { ExerciseTemplateDialog } from './exercise-template-dialog'
import { useExerciseLibrary } from './exercise-library-provider'

type ExerciseLibraryDialogsProps = {
  exercises: ExerciseTemplate[]
  onAdd: (exercise: ExerciseTemplate) => void
  onEdit: (exercise: ExerciseTemplate) => void
  onDelete: (id: string) => void
}

export function ExerciseLibraryDialogs({
  exercises,
  onAdd,
  onEdit,
  onDelete,
}: ExerciseLibraryDialogsProps) {
  const { open, setOpen, currentRow, setCurrentRow } = useExerciseLibrary()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSave = (exercise: ExerciseTemplate) => {
    if (currentRow) {
      onEdit(exercise)
    } else {
      onAdd(exercise)
    }
    setCurrentRow(null)
  }

  const handleDelete = () => {
    if (!currentRow) return
    setIsDeleting(true)
    onDelete(currentRow.id)
    setIsDeleting(false)
    setOpen(null)
    setTimeout(() => setCurrentRow(null), 500)
  }

  return (
    <>
      <ExerciseTemplateDialog
        key={currentRow ? `edit-${currentRow.id}` : 'add'}
        open={open === 'add' || open === 'edit'}
        onOpenChange={(state) => {
          if (!state) {
            setOpen(null)
            setTimeout(() => setCurrentRow(null), 300)
          }
        }}
        exercise={open === 'edit' ? currentRow : null}
        exercises={exercises}
        onSave={handleSave}
      />

      {currentRow && (
        <ConfirmDialog
          key={`delete-${currentRow.id}`}
          open={open === 'delete'}
          onOpenChange={(state) => {
            if (!state) {
              setOpen(null)
              setTimeout(() => setCurrentRow(null), 500)
            }
          }}
          handleConfirm={handleDelete}
          isLoading={isDeleting}
          title={
            <span className='text-destructive'>
              <AlertTriangle
                className='me-1 inline-block stroke-destructive'
                size={18}
              />{' '}
              Delete Exercise
            </span>
          }
          desc={
            <p>
              Are you sure you want to delete{' '}
              <span className='font-bold'>{currentRow.name}</span>?
              <br />
              This action cannot be undone. The exercise will be permanently
              removed from the library.
            </p>
          }
          confirmText='Delete'
          destructive
        />
      )}
    </>
  )
}
