import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { useAnnotationStore } from './store'
import { CommentPin } from './comment-pin'
import { CommentInput } from './comment-input'

interface PendingPosition {
  /** Pixel coordinates for positioning the input dialog */
  pixelX: number
  pixelY: number
  /** Percentage coordinates for storing in the annotation */
  pctX: number
  pctY: number
}

export function AnnotationOverlay() {
  const annotations = useAnnotationStore((s) => s.annotations)
  const currentPage = useAnnotationStore((s) => s.currentPage)
  const addAnnotation = useAnnotationStore((s) => s.addAnnotation)
  const removeAnnotation = useAnnotationStore((s) => s.removeAnnotation)
  const setActive = useAnnotationStore((s) => s.setActive)

  const [pending, setPending] = useState<PendingPosition | null>(null)

  const pageAnnotations = annotations.filter((a) => a.page === currentPage)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (pending) {
          setPending(null)
        } else {
          setActive(false)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [pending, setActive])

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    const pixelX = e.clientX
    const pixelY = e.clientY
    const pctX = (pixelX / window.innerWidth) * 100
    const pctY = (pixelY / window.innerHeight) * 100
    setPending({ pixelX, pixelY, pctX, pctY })
  }

  const handleSubmit = (text: string) => {
    if (!pending) return
    addAnnotation({ x: pending.pctX, y: pending.pctY, text, page: currentPage })
    setPending(null)
  }

  return (
    <div className='fixed inset-0 z-[9999]' style={{ cursor: 'crosshair' }}>
      {/* Semi-transparent tint — captures all click-to-annotate events */}
      <div
        className='absolute inset-0 bg-blue-500/[0.07]'
        onClick={handleOverlayClick}
      />

      {/* Status badge */}
      <div
        className='pointer-events-none fixed left-1/2 top-4 z-[10003] -translate-x-1/2 flex items-center gap-2 rounded-full px-5 py-2 shadow-lg'
        style={{ backgroundColor: '#2563eb' }}
      >
        <span className='h-2 w-2 animate-pulse rounded-full' style={{ backgroundColor: 'white' }} />
        <span className='text-sm font-semibold' style={{ color: 'white' }}>Comment Mode</span>
        <span className='text-xs' style={{ color: '#bfdbfe' }}>
          Click to annotate · ⌘⇧C / Ctrl⇧C or Esc to exit
        </span>
      </div>

      {/* Existing comment pins */}
      {pageAnnotations.map((annotation, index) => (
        <CommentPin
          key={annotation.id}
          annotation={annotation}
          index={index}
          onDelete={removeAnnotation}
        />
      ))}

      {/* Floating input for new comment */}
      {pending && (
        <CommentInput
          x={pending.pixelX}
          y={pending.pixelY}
          onSubmit={handleSubmit}
          onCancel={() => setPending(null)}
        />
      )}
    </div>
  )
}
