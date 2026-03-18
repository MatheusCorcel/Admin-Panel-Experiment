import { z } from 'zod'

const feedbackStatusSchema = z.union([
  z.literal('new'),
  z.literal('reviewed'),
])
export type FeedbackStatus = z.infer<typeof feedbackStatusSchema>

const feedbackSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  coachName: z.string(),
  coachId: z.string(),
  classType: z.string(),
  classDate: z.coerce.date(),
  content: z.string(),
  status: feedbackStatusSchema,
  className: z.string(),
  routineUsed: z.string(),
})
export type Feedback = z.infer<typeof feedbackSchema>

export const feedbackListSchema = z.array(feedbackSchema)
