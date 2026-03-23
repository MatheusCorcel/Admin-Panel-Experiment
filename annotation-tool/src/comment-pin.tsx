import { useEffect, useRef, useState } from 'react'
import { Trash2, X } from 'lucide-react'
import type { Annotation } from './types'

interface CommentPinProps {
  annotation: Annotation
  index: number
  onDelete: (id: string) => void
}

export function CommentPin({ annotation, index, onDelete }: CommentPinProps) {
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close popup when clicking outside
  useEffect(() => {
    if (!expanded) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [expanded])

  return (
    <div
      ref={containerRef}
      className='fixed z-[10001] -translate-x-1/2 -translate-y-1/2'
      style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
      onClick={(e) => e.stopPropagation()}
    >
      {expanded && (
        <div
          className='absolute left-1/2 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl'
          style={
            annotation.y < 35
              ? { top: 'calc(100% + 12px)' }   // pin near top → open downward
              : { bottom: 'calc(100% + 12px)' } // default → open upward
          }
        >
          {/* Header */}
          <div className='flex items-center justify-between border-b border-gray-100 px-4 py-3'>
            <span className='text-sm font-semibold text-gray-900'>
              Comment {index + 1}
            </span>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => {
                  onDelete(annotation.id)
                  setExpanded(false)
                }}
                className='flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500'
                aria-label='Delete comment'
              >
                <Trash2 size={14} />
              </button>
              <button
                onClick={() => setExpanded(false)}
                className='flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700'
                aria-label='Close'
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className='px-4 py-3'>
            <p className='text-sm leading-relaxed text-gray-800'>
              {annotation.text}
            </p>
            <p className='mt-3 text-[11px] text-gray-400'>
              {new Date(annotation.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Pin circle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className='flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-md transition-transform hover:scale-110'
        style={{ backgroundColor: '#2563eb', color: 'white', outline: '2px solid white', outlineOffset: '1px' }}
        aria-label={`Comment ${index + 1}`}
      >
        {index + 1}
      </button>
    </div>
  )
}
