import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type ChecklistBundle } from '../data/schema'
import { ChecklistBundleDialog } from './checklist-bundle-dialog'
import { useChecklists } from './checklists-provider'

export function ChecklistsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useChecklists()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSave = (bundle: ChecklistBundle) => {
    if (currentRow) {
      toast.success('Checklist updated.', { description: bundle.name })
    } else {
      toast.success('Checklist created.', { description: bundle.name })
    }
    setCurrentRow(null)
  }

  const handleDelete = () => {
    if (!currentRow) return
    setIsDeleting(true)
    toast.success('Checklist deleted.', { description: currentRow.name })
    setIsDeleting(false)
    setOpen(null)
    setTimeout(() => setCurrentRow(null), 500)
  }

  return (
    <>
      <ChecklistBundleDialog
        key={currentRow ? `edit-${currentRow.id}` : 'add'}
        open={open === 'add' || open === 'edit'}
        onOpenChange={(state) => {
          if (!state) {
            setOpen(null)
            setTimeout(() => setCurrentRow(null), 300)
          }
        }}
        bundle={open === 'edit' ? currentRow : null}
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
              Delete Checklist
            </span>
          }
          desc={
            <p>
              Are you sure you want to delete{' '}
              <span className='font-bold'>{currentRow.name}</span>?
              <br />
              This action cannot be undone.
            </p>
          }
          confirmText='Delete'
          destructive
        />
      )}
    </>
  )
}
