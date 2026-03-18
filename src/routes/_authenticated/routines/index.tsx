import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Routines } from '@/features/routines'

const routinesSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  type: z
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
  status: z
    .array(z.union([z.literal('draft'), z.literal('published')]))
    .optional()
    .catch([]),
  name: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/routines/')({
  validateSearch: routinesSearchSchema,
  component: Routines,
})
