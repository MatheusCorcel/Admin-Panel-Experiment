import { FeedbackDetailSheet } from './feedback-detail-sheet'
import { useFeedback } from './feedback-provider'

export function FeedbackDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFeedback()
  return (
    <>
      {currentRow && (
        <FeedbackDetailSheet
          key={`feedback-detail-${currentRow.id}`}
          open={open === 'detail'}
          onOpenChange={() => {
            setOpen('detail')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          currentRow={currentRow}
        />
      )}
    </>
  )
}
