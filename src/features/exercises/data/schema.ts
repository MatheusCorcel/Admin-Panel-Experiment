import { z } from 'zod'

export const muscleGroups = [
  'chest',
  'back',
  'shoulders',
  'arms',
  'legs',
  'core',
  'full_body',
] as const

export type MuscleGroup = (typeof muscleGroups)[number]

export const muscleGroupLabels: Record<MuscleGroup, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  arms: 'Arms',
  legs: 'Legs',
  core: 'Core',
  full_body: 'Full Body',
}

export const exerciseTypes = ['compound', 'isolation'] as const
export type ExerciseType = (typeof exerciseTypes)[number]

export const exerciseTypeLabels: Record<ExerciseType, string> = {
  compound: 'Compound',
  isolation: 'Isolation',
}

export const exerciseTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Exercise name is required.'),
  muscleGroup: z.enum(muscleGroups),
  exerciseType: z.enum(exerciseTypes),
  coachCues: z.string(),
})

export type ExerciseTemplate = z.infer<typeof exerciseTemplateSchema>

export const exerciseTemplateListSchema = z.array(exerciseTemplateSchema)
