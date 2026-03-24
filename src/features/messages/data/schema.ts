import { z } from 'zod'

export const messageStatusSchema = z.enum(['new', 'read'])
export type MessageStatus = z.infer<typeof messageStatusSchema>

export const senderTypeSchema = z.enum(['client', 'coach'])
export type SenderType = z.infer<typeof senderTypeSchema>

export const contactMessageSchema = z.object({
  id: z.string(),
  senderName: z.string(),
  senderEmail: z.string(),
  senderType: senderTypeSchema,
  senderId: z.string(),
  location: z.string(),
  date: z.coerce.date(),
  message: z.string(),
  status: messageStatusSchema,
})

export type ContactMessage = z.infer<typeof contactMessageSchema>
