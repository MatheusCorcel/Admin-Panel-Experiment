import React, { useState } from 'react'
import { type ChecklistBundle } from '../data/schema'

type DialogType = 'add' | 'edit' | 'delete'

type ChecklistsContextType = {
  open: DialogType | null
  setOpen: (type: DialogType | null) => void
  currentRow: ChecklistBundle | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ChecklistBundle | null>>
}

const ChecklistsContext = React.createContext<ChecklistsContextType | null>(null)

export function ChecklistsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<DialogType | null>(null)
  const [currentRow, setCurrentRow] = useState<ChecklistBundle | null>(null)

  return (
    <ChecklistsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ChecklistsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChecklists() {
  const ctx = React.useContext(ChecklistsContext)
  if (!ctx) {
    throw new Error('useChecklists must be used within <ChecklistsProvider>')
  }
  return ctx
}
