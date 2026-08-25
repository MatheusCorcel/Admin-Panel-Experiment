import {
  Users,
  Dumbbell,
  HelpCircle,
  MessageSquare,
  Mail,
  ClipboardCheck,
  Flag,
  Settings,
  Dumbbell as DumbbellIcon,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Miguel Berlanga',
    email: 'miguel.berlanga@bamlabs.com',
    avatar: '',
  },
  teams: [
    {
      name: 'BAM Labs',
      logo: DumbbellIcon,
      plan: 'Admin Panel',
    },
  ],
  navGroups: [
    {
      title: '',
      items: [
        {
          title: 'Users',
          url: '/',
          icon: Users,
        },
        {
          title: 'Routines',
          url: '/routines',
          icon: Dumbbell,
        },
        {
          title: 'FAQs',
          url: '/faqs',
          icon: HelpCircle,
        },
        {
          title: 'Feedback',
          url: '/feedback',
          icon: MessageSquare,
        },
        {
          title: 'Messages',
          url: '/messages',
          icon: Mail,
        },
        {
          title: 'Checklists',
          url: '/checklists',
          icon: ClipboardCheck,
        },
        {
          title: 'Flags',
          url: '/flags',
          icon: Flag,
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}
