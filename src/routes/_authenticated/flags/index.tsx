import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Flags } from '@/features/flags'

const flagsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  q: z.string().optional().catch(undefined),
  client: z.array(z.string()).optional().catch([]),
  coach: z.array(z.string()).optional().catch([]),
  type: z
    .array(
      z.union([z.literal('coach'), z.literal('system'), z.literal('condition')])
    )
    .optional()
    .catch([]),
  classType: z
    .array(
      z.union([
        z.literal('push'),
        z.literal('pull'),
        z.literal('legs'),
        z.literal('full_body'),
      ])
    )
    .optional()
    .catch([]),
  location: z.array(z.string()).optional().catch([]),
  exercise: z.array(z.string()).optional().catch([]),
  dateFrom: z.string().optional().catch(undefined),
  dateTo: z.string().optional().catch(undefined),
  status: z
    .array(
      z.union([
        z.literal('active'),
        z.literal('overdue'),
        z.literal('resolved'),
        z.literal('permanent'),
      ])
    )
    .optional()
    .catch([]),
})

export const Route = createFileRoute('/_authenticated/flags/')({
  validateSearch: flagsSearchSchema,
  component: Flags,
})
