import { MessageDetailSheet } from './messages-detail-sheet'
import { useMessages } from './messages-provider'

export function MessagesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useMessages()
  return (
    <>
      {currentRow && (
        <MessageDetailSheet
          key={`message-detail-${currentRow.id}`}
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
