import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Feedback } from '../data/schema'

type FeedbackDialogType = 'detail' | 'review'

type FeedbackContextType = {
  open: FeedbackDialogType | null
  setOpen: (str: FeedbackDialogType | null) => void
  currentRow: Feedback | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Feedback | null>>
}

const FeedbackContext = React.createContext<FeedbackContextType | null>(null)

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<FeedbackDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Feedback | null>(null)

  return (
    <FeedbackContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </FeedbackContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFeedback = () => {
  const feedbackContext = React.useContext(FeedbackContext)

  if (!feedbackContext) {
    throw new Error('useFeedback has to be used within <FeedbackContext>')
  }

  return feedbackContext
}
