export interface Annotation {
  id: string
  x: number // percentage of viewport width (0–100)
  y: number // percentage of viewport height (0–100)
  text: string
  page: string // window.location.pathname
  createdAt: number
}
