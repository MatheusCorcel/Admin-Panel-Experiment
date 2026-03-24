import type { ContactMessage } from './schema'

export const contactMessages: ContactMessage[] = [
  {
    id: '1',
    senderName: 'Ana Torres',
    senderEmail: 'ana.torres@email.com',
    senderType: 'client',
    senderId: 'client-1',
    location: 'BAM New York',
    date: new Date('2026-03-22T09:15:00'),
    message:
      "Hi, I've been having trouble accessing my workout history in the app. The page loads but shows no data even though I've completed several sessions. Could you please help? I'm on iOS 17 and the latest version of the app.",
    status: 'new',
  },
  {
    id: '2',
    senderName: 'Sarah Chen',
    senderEmail: 'sarah.chen@bamlabs.com',
    senderType: 'coach',
    senderId: '2',
    location: 'BAM New York',
    date: new Date('2026-03-21T14:30:00'),
    message:
      "I wanted to flag an issue with the routine swap feature. When I try to swap a routine less than 13 hours before a class, the app lets me proceed but the change doesn't seem to save on the backend. The old routine shows up for the class. Has this been reported before?",
    status: 'new',
  },
  {
    id: '3',
    senderName: 'Carlos Méndez',
    senderEmail: 'carlos.mendez@gmail.com',
    senderType: 'client',
    senderId: 'client-2',
    location: 'BAM Mexico',
    date: new Date('2026-03-20T18:45:00'),
    message:
      "I signed up for the 6am class on Thursday but didn't receive any reminder notification. I ended up missing it. I checked my notification settings in the app and they're turned on. Please look into this as I rely on these reminders.",
    status: 'read',
  },
  {
    id: '4',
    senderName: 'James Rodriguez',
    senderEmail: 'james.rodriguez@bamlabs.com',
    senderType: 'coach',
    senderId: '3',
    location: 'BAM Mexico',
    date: new Date('2026-03-19T11:00:00'),
    message:
      "Quick question about the checklist system. Is there a way to add a temporary checklist item for a specific class without editing the published bundle? We occasionally need one-off items and I don't want to affect the template for all future classes.",
    status: 'read',
  },
  {
    id: '5',
    senderName: 'Lucia Fontaine',
    senderEmail: 'lucia.fontaine@hotmail.com',
    senderType: 'client',
    senderId: 'client-3',
    location: 'BAM Madrid',
    date: new Date('2026-03-18T16:20:00'),
    message:
      'My membership was renewed last week but the app still shows my account as expired. The charge went through on my credit card. Can you update this manually while you investigate the issue? Thank you.',
    status: 'new',
  },
  {
    id: '6',
    senderName: 'Elena Vasquez',
    senderEmail: 'elena.vasquez@gmail.com',
    senderType: 'client',
    senderId: 'client-4',
    location: 'BAM New York',
    date: new Date('2026-03-17T08:05:00'),
    message:
      "The coach in last Tuesday's 7pm class was amazing. I didn't catch their name but they did the evening Push session. Is there a way to find out who it was so I can leave them a review or specifically book their classes?",
    status: 'read',
  },
  {
    id: '7',
    senderName: 'Sarah Chen',
    senderEmail: 'sarah.chen@bamlabs.com',
    senderType: 'coach',
    senderId: '2',
    location: 'BAM New York',
    date: new Date('2026-03-15T13:10:00'),
    message:
      "I'd like to request a new exercise template be added to the library: 'Banded Pull-Apart'. It's useful for shoulder warm-ups and I find myself adding it manually every time. Muscle group would be Shoulders. Happy to provide coach cues if needed.",
    status: 'read',
  },
  {
    id: '8',
    senderName: 'Marco Delgado',
    senderEmail: 'marco.delgado@icloud.com',
    senderType: 'client',
    senderId: 'client-5',
    location: 'BAM Madrid',
    date: new Date('2026-03-13T10:50:00'),
    message:
      "I've noticed the station map in the pre-class screen sometimes shows incorrect names. A client named Patricia was listed as Pedro in last Friday's session. Minor issue but wanted to report it in case it's a sync problem from your system.",
    status: 'new',
  },
]
