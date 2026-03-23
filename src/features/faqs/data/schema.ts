import { z } from 'zod'

const faqStatusSchema = z.union([
  z.literal('draft'),
  z.literal('published'),
])
export type FaqStatus = z.infer<typeof faqStatusSchema>

const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  category: z.string(),
  status: faqStatusSchema,
  order: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Faq = z.infer<typeof faqSchema>

export const faqListSchema = z.array(faqSchema)
