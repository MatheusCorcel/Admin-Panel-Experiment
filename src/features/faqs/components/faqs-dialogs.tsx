import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { FaqEditorDialog } from './faq-editor-dialog'
import { useFaqs } from './faqs-provider'

export function FaqsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFaqs()
  return (
    <>
      <FaqEditorDialog
        key='faq-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <FaqEditorDialog
            key={`faq-edit-${currentRow.id}`}
            currentRow={currentRow}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            onArchive={() => {
              setOpen('delete')
            }}
          />

          <ConfirmDialog
            key={`faq-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            title='Archive FAQ'
            desc={`Are you sure you want to archive "${currentRow.question}"? This FAQ will no longer be visible to users.`}
            confirmText='Archive'
            destructive
            handleConfirm={() => {
              setOpen('delete')
              toast.success('FAQ archived successfully.')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
          />
        </>
      )}
    </>
  )
}
