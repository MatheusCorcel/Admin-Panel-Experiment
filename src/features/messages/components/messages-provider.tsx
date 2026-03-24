import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type ContactMessage } from '../data/schema'

type MessagesDialogType = 'detail'

type MessagesContextType = {
  open: MessagesDialogType | null
  setOpen: (str: MessagesDialogType | null) => void
  currentRow: ContactMessage | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ContactMessage | null>>
}

const MessagesContext = React.createContext<MessagesContextType | null>(null)

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<MessagesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<ContactMessage | null>(null)

  return (
    <MessagesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </MessagesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMessages = () => {
  const messagesContext = React.useContext(MessagesContext)

  if (!messagesContext) {
    throw new Error('useMessages has to be used within <MessagesContext>')
  }

  return messagesContext
}
