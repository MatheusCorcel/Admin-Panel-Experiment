import type { Faq } from './schema'

export const faqs: Faq[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer:
      'To reset your password, go to the login screen and tap "Forgot Password." Enter the email address associated with your account and you will receive a verification code. Follow the instructions to create a new password.',
    category: 'Account',
    status: 'published',
    order: 1,
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2026-02-15'),
  },
  {
    id: '2',
    question: 'What equipment do I need for classes?',
    answer:
      'Most classes require minimal equipment. For Push and Pull days you will need access to dumbbells and a pull-up bar. Legs day uses kettlebells and resistance bands. Full Body sessions combine all of the above. Your coach will list exact requirements before each class.',
    category: 'Classes',
    status: 'published',
    order: 2,
    createdAt: new Date('2025-10-05'),
    updatedAt: new Date('2026-01-20'),
  },
  {
    id: '3',
    question: 'How do I cancel my membership?',
    answer:
      'You can cancel your membership at any time from the Account Settings page. Navigate to Settings > Subscription > Cancel Membership. Please note that cancellations take effect at the end of your current billing cycle and no partial refunds are issued.',
    category: 'Billing',
    status: 'published',
    order: 3,
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2026-03-01'),
  },
  {
    id: '4',
    question: 'Can I switch between class types mid-cycle?',
    answer:
      'Yes! You can switch between Push, Pull, Legs, and Full Body class types at any time. Simply open the Schedule tab, browse available classes, and book a different type. There is no limit to how many times you can switch during a billing cycle.',
    category: 'Classes',
    status: 'published',
    order: 4,
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2026-02-28'),
  },
  {
    id: '5',
    question: 'Where can I find the class schedule?',
    answer:
      'The weekly class schedule is available in the app under the Schedule tab. You can filter by class type, coach, and time of day. Schedules are published every Sunday for the upcoming week.',
    category: 'General',
    status: 'draft',
    order: 5,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-03-10'),
  },
  {
    id: '6',
    question: 'What is the late cancellation policy?',
    answer:
      'Classes cancelled less than 2 hours before the scheduled start time are marked as a missed class. Accumulating 3 or more missed classes in a billing cycle may result in a temporary booking restriction. We encourage members to cancel early so other members can take the spot.',
    category: 'General',
    status: 'draft',
    order: 6,
    createdAt: new Date('2026-02-20'),
    updatedAt: new Date('2026-03-12'),
  },
]
