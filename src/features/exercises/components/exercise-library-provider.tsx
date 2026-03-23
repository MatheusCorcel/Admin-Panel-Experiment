import React, { useState } from 'react'
import { type ExerciseTemplate } from '../data/schema'

type DialogType = 'add' | 'edit' | 'delete'

type ExerciseLibraryContextType = {
  open: DialogType | null
  setOpen: (type: DialogType | null) => void
  currentRow: ExerciseTemplate | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ExerciseTemplate | null>>
}

const ExerciseLibraryContext =
  React.createContext<ExerciseLibraryContextType | null>(null)

export function ExerciseLibraryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<DialogType | null>(null)
  const [currentRow, setCurrentRow] = useState<ExerciseTemplate | null>(null)

  return (
    <ExerciseLibraryContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </ExerciseLibraryContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useExerciseLibrary() {
  const ctx = React.useContext(ExerciseLibraryContext)
  if (!ctx) {
    throw new Error(
      'useExerciseLibrary must be used within <ExerciseLibraryProvider>'
    )
  }
  return ctx
}
