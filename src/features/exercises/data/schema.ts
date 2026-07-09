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

// Granular muscle taxonomy used for Muscle Contribution. Kept separate from
// `muscleGroup` above (which drives the library table badge/filter) because
// this list must match the muscles surfaced in the Insights feature.
export const contributionMuscles = [
  'chest',
  'triceps',
  'shoulders_front',
  'shoulders_side',
  'biceps',
  'forearms',
  'lats',
  'upper_back',
  'lower_back',
  'glutes',
  'quads',
  'adductors',
  'hamstrings',
  'calves',
  'core',
] as const

export type ContributionMuscle = (typeof contributionMuscles)[number]

export const contributionMuscleLabels: Record<ContributionMuscle, string> = {
  chest: 'Chest',
  triceps: 'Triceps',
  shoulders_front: 'Shoulders - front',
  shoulders_side: 'Shoulders - side',
  biceps: 'Biceps',
  forearms: 'Forearms',
  lats: 'Lats',
  upper_back: 'Upper back',
  lower_back: 'Lower back',
  glutes: 'Glutes',
  quads: 'Quads (+ abductors)',
  adductors: 'Adductors',
  hamstrings: 'Hamstrings',
  calves: 'Calves',
  core: 'Core (abs+obliques)',
}

export const muscleContributionSchema = z.object({
  muscle: z.enum(contributionMuscles),
  contribution: z
    .number({ message: 'Enter a contribution amount.' })
    .min(0.25, 'Contribution must be at least 0.25 sets.'),
})

export type MuscleContribution = z.infer<typeof muscleContributionSchema>

export const exerciseTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Exercise name is required.'),
  muscleGroup: z.enum(muscleGroups),
  exerciseType: z.enum(exerciseTypes),
  coachCues: z.string(),
  primaryMuscle: muscleContributionSchema.optional(),
  secondaryMuscles: z.array(muscleContributionSchema).max(2).optional(),
  alternatePrimaryId: z.string().optional(),
  alternateSecondaryId: z.string().optional(),
})

export type ExerciseTemplate = z.infer<typeof exerciseTemplateSchema>

export const exerciseTemplateListSchema = z.array(exerciseTemplateSchema)
