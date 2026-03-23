import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Routine } from '../data/schema'

type RoutinesDialogType = 'create' | 'edit' | 'delete' | 'publish'

type RoutinesContextType = {
  open: RoutinesDialogType | null
  setOpen: (str: RoutinesDialogType | null) => void
  currentRow: Routine | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Routine | null>>
}

const RoutinesContext = React.createContext<RoutinesContextType | null>(null)

export function RoutinesProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<RoutinesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Routine | null>(null)

  return (
    <RoutinesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RoutinesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRoutines = () => {
  const routinesContext = React.useContext(RoutinesContext)

  if (!routinesContext) {
    throw new Error('useRoutines has to be used within <RoutinesContext>')
  }

  return routinesContext
}
