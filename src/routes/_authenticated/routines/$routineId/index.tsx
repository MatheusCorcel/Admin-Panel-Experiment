import { createFileRoute } from '@tanstack/react-router'
import { RoutineDetail } from '@/features/routines/routine-detail'

export const Route = createFileRoute('/_authenticated/routines/$routineId/')({
  component: RoutineDetail,
})
