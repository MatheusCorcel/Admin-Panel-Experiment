import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { flags as initialFlags } from '../data/flags'
import { type Flag } from '../data/schema'

type FlagDialogType = 'detail'

type FlagsContextType = {
  open: FlagDialogType | null
  setOpen: (str: FlagDialogType | null) => void
  currentRow: Flag | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Flag | null>>
  flags: Flag[]
  updateFlag: (updated: Flag) => void
  // The table's currently filtered + sorted rows (ignoring pagination) —
  // what CSV export treats as "the current view" (Gate 5).
  visibleFlags: Flag[]
  setVisibleFlags: React.Dispatch<React.SetStateAction<Flag[]>>
}

const FlagsContext = React.createContext<FlagsContextType | null>(null)

export function FlagsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<FlagDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Flag | null>(null)
  const [flags, setFlags] = useState<Flag[]>(initialFlags)
  const [visibleFlags, setVisibleFlags] = useState<Flag[]>(initialFlags)

  const updateFlag = (updated: Flag) => {
    setFlags((prev) => prev.map((f) => (f.id === updated.id ? updated : f)))
    setCurrentRow((prev) => (prev?.id === updated.id ? updated : prev))
  }

  return (
    <FlagsContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        flags,
        updateFlag,
        visibleFlags,
        setVisibleFlags,
      }}
    >
      {children}
    </FlagsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFlags = () => {
  const flagsContext = React.useContext(FlagsContext)

  if (!flagsContext) {
    throw new Error('useFlags has to be used within <FlagsContext>')
  }

  return flagsContext
}
