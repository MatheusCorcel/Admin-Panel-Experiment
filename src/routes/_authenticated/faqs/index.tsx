import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Faqs } from '@/features/faqs'

const faqsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.union([z.literal('draft'), z.literal('published')]))
    .optional()
    .catch([]),
  category: z
    .array(
      z.union([
        z.literal('Account'),
        z.literal('Classes'),
        z.literal('Billing'),
        z.literal('General'),
      ])
    )
    .optional()
    .catch([]),
  question: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/faqs/')({
  validateSearch: faqsSearchSchema,
  component: Faqs,
})
