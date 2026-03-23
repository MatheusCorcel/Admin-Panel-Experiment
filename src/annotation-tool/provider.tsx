import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useAnnotationStore } from './store'
import { AnnotationOverlay } from './overlay'
import { AnnotationContextMenu } from './context-menu'

interface AnnotationProviderProps {
  children: ReactNode
}

export function AnnotationProvider({ children }: AnnotationProviderProps) {
  const isActive = useAnnotationStore((s) => s.isActive)
  const toggleActive = useAnnotationStore((s) => s.toggleActive)
  const setCurrentPage = useAnnotationStore((s) => s.setCurrentPage)
  const setAnnotations = useAnnotationStore((s) => s.setAnnotations)

  // Load all annotations from Supabase on mount
  useEffect(() => {
    import('./supabase')
      .then(({ fetchAnnotations }) => fetchAnnotations())
      .then((data) => { if (data.length > 0) setAnnotations(data) })
      .catch(() => undefined)
  }, [setAnnotations])

  // Toggle comment mode with ⌘⇧C
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = e.metaKey && e.shiftKey && e.key.toLowerCase() === 'c'
      const isPC = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c'
      if (isMac || isPC) {
        e.preventDefault()
        toggleActive()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleActive])

  // Track SPA route changes so the overlay shows the correct page's pins.
  // We patch history.pushState/replaceState because SPA navigation doesn't
  // fire 'popstate' on its own.
  useEffect(() => {
    const syncPage = () => setCurrentPage(window.location.pathname)

    const originalPushState = history.pushState.bind(history)
    const originalReplaceState = history.replaceState.bind(history)

    history.pushState = (...args: Parameters<typeof history.pushState>) => {
      originalPushState(...args)
      syncPage()
    }
    history.replaceState = (...args: Parameters<typeof history.replaceState>) => {
      originalReplaceState(...args)
      syncPage()
    }

    window.addEventListener('popstate', syncPage)

    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
      window.removeEventListener('popstate', syncPage)
    }
  }, [setCurrentPage])

  return (
    <>
      {children}
      {createPortal(<AnnotationContextMenu />, document.body)}
      {isActive && createPortal(<AnnotationOverlay />, document.body)}
    </>
  )
}
