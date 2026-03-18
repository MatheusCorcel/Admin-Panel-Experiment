import { createFileRoute } from '@tanstack/react-router'
import { RoutineEditor } from '@/features/routines/routine-editor'

export const Route = createFileRoute(
  '/_authenticated/routines/$routineId/edit'
)({
  component: RoutineEditor,
})
