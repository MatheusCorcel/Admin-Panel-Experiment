import { z } from 'zod'

const checklistStatusSchema = z.union([
  z.literal('draft'),
  z.literal('published'),
])
export type ChecklistStatus = z.infer<typeof checklistStatusSchema>

const checklistTypeSchema = z.union([
  z.literal('pre_class'),
  z.literal('post_class'),
])
export type ChecklistType = z.infer<typeof checklistTypeSchema>

const checklistItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  order: z.number(),
})
export type ChecklistItem = z.infer<typeof checklistItemSchema>

const checklistBundleSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: checklistTypeSchema,
  location: z.string(),
  status: checklistStatusSchema,
  itemCount: z.number(),
  items: z.array(checklistItemSchema),
  createdBy: z.string(),
  lastUpdated: z.coerce.date(),
  createdAt: z.coerce.date(),
})
export type ChecklistBundle = z.infer<typeof checklistBundleSchema>

export const checklistBundleListSchema = z.array(checklistBundleSchema)
