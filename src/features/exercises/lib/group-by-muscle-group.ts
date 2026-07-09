import {
  muscleGroupLabels,
  muscleGroups,
  type ExerciseTemplate,
  type MuscleGroup,
} from '../data/schema'

export type ExerciseGroup = {
  group: MuscleGroup
  label: string
  items: ExerciseTemplate[]
}

/**
 * Groups exercises by muscle group, preserving the canonical order defined
 * in `muscleGroups` and dropping groups with no matching exercises.
 */
export function groupByMuscleGroup(
  exercises: ExerciseTemplate[]
): ExerciseGroup[] {
  return muscleGroups
    .map((group) => ({
      group,
      label: muscleGroupLabels[group],
      items: exercises.filter((ex) => ex.muscleGroup === group),
    }))
    .filter((g) => g.items.length > 0)
}
