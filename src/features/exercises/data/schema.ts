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

export const exerciseTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Exercise name is required.'),
  muscleGroup: z.enum(muscleGroups),
  coachCues: z.string(),
})

export type ExerciseTemplate = z.infer<typeof exerciseTemplateSchema>

export const exerciseTemplateListSchema = z.array(exerciseTemplateSchema)
