import { FlagDetailSheet } from './flag-detail-sheet'
import { useFlags } from './flags-provider'

export function FlagsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, updateFlag } = useFlags()
  return (
    <>
      {currentRow && (
        <FlagDetailSheet
          key={`flag-detail-${currentRow.id}`}
          open={open === 'detail'}
          onOpenChange={() => {
            setOpen('detail')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          currentRow={currentRow}
          onUpdate={updateFlag}
        />
      )}
    </>
  )
}
