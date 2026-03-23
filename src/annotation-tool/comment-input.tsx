import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { MessageSquarePlus } from 'lucide-react'

interface CommentInputProps {
  /** Pixel X position of the click (from clientX) */
  x: number
  /** Pixel Y position of the click (from clientY) */
  y: number
  onSubmit: (text: string) => void
  onCancel: () => void
}

export function CommentInput({ x, y, onSubmit, onCancel }: CommentInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Flip direction when near the right or bottom edges
  const flipX = x > window.innerWidth * 0.65
  const flipY = y > window.innerHeight * 0.65

  const style: CSSProperties = {
    position: 'fixed',
    left: flipX ? undefined : x + 12,
    right: flipX ? window.innerWidth - x + 12 : undefined,
    top: flipY ? undefined : y + 12,
    bottom: flipY ? window.innerHeight - y + 12 : undefined,
    zIndex: 10002,
    width: 280,
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const trimmed = text.trim()
      if (trimmed) onSubmit(trimmed)
    }
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <div
      style={style}
      className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2'>
        <MessageSquarePlus size={14} className='text-yellow-500' />
        <span className='text-xs font-medium text-gray-500'>Add comment</span>
        <span className='ml-auto text-xs text-gray-400'>↵ save · Esc cancel</span>
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        placeholder='Type your comment…'
        className='w-full resize-none bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none'
      />

      <div className='flex justify-end gap-2 border-t border-gray-100 bg-gray-50 px-3 py-2'>
        <button
          onClick={onCancel}
          className='rounded px-2 py-1 text-xs text-gray-500 hover:text-gray-700'
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className='rounded bg-yellow-400 px-3 py-1 text-xs font-medium text-yellow-900 transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Save
        </button>
      </div>
    </div>
  )
}
