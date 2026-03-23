import { AlertTriangle } from 'lucide-react'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useRoutines } from './routines-provider'

export function RoutinesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRoutines()
  return (
    <>
      {currentRow && (
        <ConfirmDialog
          key={`routine-delete-${currentRow.id}`}
          open={open === 'delete'}
          onOpenChange={() => {
            setOpen('delete')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          handleConfirm={() => {
            setOpen(null)
            setCurrentRow(null)
          }}
          title={
            <span className='text-destructive'>
              <AlertTriangle
                className='me-1 inline-block stroke-destructive'
                size={18}
              />{' '}
              Delete Routine
            </span>
          }
          desc={
            <p>
              Are you sure you want to delete{' '}
              <span className='font-bold'>{currentRow.name}</span>?
              <br />
              This action cannot be undone. The routine and all its exercises
              will be permanently removed.
            </p>
          }
          confirmText='Delete'
          destructive
        />
      )}
    </>
  )
}
