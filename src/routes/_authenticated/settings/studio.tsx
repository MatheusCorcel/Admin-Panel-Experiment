import { createFileRoute } from '@tanstack/react-router'
import { SettingsStudio } from '@/features/settings/studio'

export const Route = createFileRoute('/_authenticated/settings/studio')({
  component: SettingsStudio,
})
