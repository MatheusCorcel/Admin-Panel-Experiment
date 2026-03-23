import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { FeedbackDialogs } from './components/feedback-dialogs'
import { FeedbackProvider } from './components/feedback-provider'
import { FeedbackTable } from './components/feedback-table'
import { feedbackEntries } from './data/feedback'

const route = getRouteApi('/_authenticated/feedback/')

export function FeedbackPage() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <FeedbackProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Feedback</h2>
            <p className='text-muted-foreground'>
              Review post-class feedback from coaches.
            </p>
          </div>
        </div>
        <FeedbackTable
          data={feedbackEntries}
          search={search}
          navigate={navigate}
        />
      </Main>

      <FeedbackDialogs />
    </FeedbackProvider>
  )
}
