import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Checklists } from '@/features/checklists'

const checklistsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  type: z
    .array(z.union([z.literal('pre_class'), z.literal('post_class')]))
    .optional()
    .catch([]),
  location: z
    .array(z.string())
    .optional()
    .catch([]),
  status: z
    .array(z.union([z.literal('draft'), z.literal('published')]))
    .optional()
    .catch([]),
  name: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/checklists/')({
  validateSearch: checklistsSearchSchema,
  component: Checklists,
})
