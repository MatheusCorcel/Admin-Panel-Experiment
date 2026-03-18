import { createFileRoute } from '@tanstack/react-router'
import { ExerciseLibrary } from '@/features/exercises'

export const Route = createFileRoute(
  '/_authenticated/routines/exercises/'
)({
  component: ExerciseLibrary,
})
