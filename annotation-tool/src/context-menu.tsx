import { useEffect, useRef, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { useAnnotationStore } from './store'

interface Position {
  x: number
  y: number
}

export function AnnotationContextMenu() {
  const [position, setPosition] = useState<Position | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isActive = useAnnotationStore((s) => s.isActive)
  const toggleActive = useAnnotationStore((s) => s.toggleActive)

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Don't intercept right-click when comment mode overlay is already active
      if (useAnnotationStore.getState().isActive) return

      e.preventDefault()

      // Flip menu position if too close to right or bottom edge
      const menuW = 200
      const menuH = 48
      const x = e.clientX + menuW > window.innerWidth ? e.clientX - menuW : e.clientX
      const y = e.clientY + menuH > window.innerHeight ? e.clientY - menuH : e.clientY

      setPosition({ x, y })
    }

    const dismiss = () => setPosition(null)

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('click', dismiss)
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') dismiss() })

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('click', dismiss)
    }
  }, [])

  if (!position) return null

  const handleSelect = () => {
    setPosition(null)
    toggleActive()
  }

  return (
    <div
      ref={menuRef}
      className='fixed z-[10005] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-xl'
      style={{ left: position.x, top: position.y, minWidth: 180 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleSelect}
        className='flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50'
      >
        <MessageSquare size={14} style={{ color: '#2563eb' }} />
        <span>{isActive ? 'Exit Comment Mode' : 'Comment Mode'}</span>
      </button>
    </div>
  )
}
