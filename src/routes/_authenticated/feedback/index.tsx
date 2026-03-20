import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { FeedbackPage } from '@/features/feedback'

const feedbackSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.union([z.literal('new'), z.literal('reviewed')]))
    .optional()
    .catch([]),
  classType: z
    .array(
      z.union([
        z.literal('Push'),
        z.literal('Pull'),
        z.literal('Legs'),
        z.literal('Full Body'),
      ])
    )
    .optional()
    .catch([]),
  coachName: z.array(z.string()).optional().catch([]),
  location: z.array(z.string()).optional().catch([]),
  keyword: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/feedback/')({
  validateSearch: feedbackSearchSchema,
  component: FeedbackPage,
})
