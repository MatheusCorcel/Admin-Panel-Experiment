import { z } from 'zod'

const routineTypeSchema = z.union([
  z.literal('push'),
  z.literal('pull'),
  z.literal('legs'),
  z.literal('full_body'),
])
export type RoutineType = z.infer<typeof routineTypeSchema>

const routineStatusSchema = z.union([
  z.literal('draft'),
  z.literal('published'),
])
export type RoutineStatus = z.infer<typeof routineStatusSchema>

// Entry type: single exercise or superset (two exercises grouped)
const exerciseEntryTypeSchema = z.union([
  z.literal('single'),
  z.literal('superset'),
])
export type ExerciseEntryType = z.infer<typeof exerciseEntryTypeSchema>

// Sub-exercise details (used in superset)
const subExerciseSchema = z.object({
  name: z.string(),
  sets: z.number(),
  reps: z.string(),
  recommendedWeight: z.string(),
  coachCues: z.string(),
})
export type SubExercise = z.infer<typeof subExerciseSchema>

const routineSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: routineTypeSchema,
  status: routineStatusSchema,
  exerciseCount: z.number(),
  createdBy: z.string(),
  lastUpdated: z.coerce.date(),
  createdAt: z.coerce.date(),
})
export type Routine = z.infer<typeof routineSchema>

export const routineListSchema = z.array(routineSchema)

// Exercise: either a single exercise or a superset (two exercises grouped)
const exerciseSchema = z.discriminatedUnion('entryType', [
  z.object({
    id: z.string(),
    order: z.number(),
    entryType: z.literal('single'),
    name: z.string(),
    sets: z.number(),
    reps: z.string(),
    recommendedWeight: z.string(),
    coachCues: z.string(),
  }),
  z.object({
    id: z.string(),
    order: z.number(),
    entryType: z.literal('superset'),
    exerciseA: subExerciseSchema,
    exerciseB: subExerciseSchema,
  }),
])
export type Exercise = z.infer<typeof exerciseSchema>

export const exerciseListSchema = z.array(exerciseSchema)
