import { create } from 'zustand'
import type { Annotation } from './types'

interface AnnotationState {
  annotations: Annotation[]
  isActive: boolean
  currentPage: string
  setAnnotations: (annotations: Annotation[]) => void
  addAnnotation: (data: Pick<Annotation, 'x' | 'y' | 'text' | 'page'>) => void
  removeAnnotation: (id: string) => void
  toggleActive: () => void
  setActive: (active: boolean) => void
  setCurrentPage: (page: string) => void
}

export const useAnnotationStore = create<AnnotationState>()((set) => ({
  annotations: [],
  isActive: false,
  currentPage: typeof window !== 'undefined' ? window.location.pathname : '/',

  setAnnotations: (annotations) => set({ annotations }),

  addAnnotation: (data) => {
    const annotation: Annotation = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    set((state) => ({ annotations: [...state.annotations, annotation] }))

    import('./supabase')
      .then(({ insertAnnotation }) => insertAnnotation(annotation))
      .catch(() => undefined)
  },

  removeAnnotation: (id) => {
    set((state) => ({ annotations: state.annotations.filter((a) => a.id !== id) }))

    import('./supabase')
      .then(({ deleteAnnotation }) => deleteAnnotation(id))
      .catch(() => undefined)
  },

  toggleActive: () => set((state) => ({ isActive: !state.isActive })),
  setActive: (active) => set({ isActive: active }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))
