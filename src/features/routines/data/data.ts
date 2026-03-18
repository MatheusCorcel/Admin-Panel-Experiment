import {
  ArrowUp,
  ArrowDown,
  Footprints,
  Dumbbell,
} from 'lucide-react'
import { type Exercise, type RoutineStatus } from './schema'

/** Helper for table display: get label and details for single or superset */
export function getExerciseDisplay(exercise: Exercise) {
  if (!exercise) {
    return { label: '—', name: '—', sets: 0, reps: '—', weight: '—', cues: '—' }
  }
  if (exercise.entryType === 'single') {
    return {
      label: 'Single',
      name: exercise.name ?? '—',
      sets: exercise.sets ?? 0,
      reps: exercise.reps ?? '—',
      weight: exercise.recommendedWeight ?? '—',
      cues: exercise.coachCues ?? '—',
    }
  }
  const a = exercise.exerciseA
  const b = exercise.exerciseB
  if (!a || !b) {
    return { label: 'Superset', name: '—', sets: 0, reps: '—', weight: '—', cues: '—' }
  }
  return {
    label: 'Superset',
    name: `${a.name} / ${b.name}`,
    sets: a.sets === b.sets ? a.sets : `${a.sets} / ${b.sets}`,
    reps: a.reps === b.reps ? a.reps : `${a.reps} / ${b.reps}`,
    weight:
      a.recommendedWeight === b.recommendedWeight
        ? a.recommendedWeight
        : `${a.recommendedWeight} / ${b.recommendedWeight}`,
    cues: `${a.coachCues} — ${b.coachCues}`,
  }
}

export const statusStyles = new Map<RoutineStatus, string>([
  ['published', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['draft', 'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200'],
])

export const routineTypes = [
  {
    label: 'Push',
    value: 'push',
    icon: ArrowUp,
  },
  {
    label: 'Pull',
    value: 'pull',
    icon: ArrowDown,
  },
  {
    label: 'Legs',
    value: 'legs',
    icon: Footprints,
  },
  {
    label: 'Full Body',
    value: 'full_body',
    icon: Dumbbell,
  },
] as const

export const routineStatuses = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
] as const
