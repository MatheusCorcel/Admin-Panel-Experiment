import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { MessagesPage } from '@/features/messages'

const messagesSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.union([z.literal('new'), z.literal('read')]))
    .optional()
    .catch([]),
  senderType: z
    .array(z.union([z.literal('client'), z.literal('coach')]))
    .optional()
    .catch([]),
  location: z.array(z.string()).optional().catch([]),
  keyword: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/messages/')({
  validateSearch: messagesSearchSchema,
  component: MessagesPage,
})
