import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { MessagesDialogs } from './components/messages-dialogs'
import { MessagesProvider } from './components/messages-provider'
import { MessagesTable } from './components/messages-table'
import { contactMessages } from './data/messages'

const route = getRouteApi('/_authenticated/messages/')

export function MessagesPage() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <MessagesProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Contact Messages
            </h2>
            <p className='text-muted-foreground'>
              Review messages sent by coaches and clients via the app.
            </p>
          </div>
        </div>
        <MessagesTable
          data={contactMessages}
          search={search}
          navigate={navigate}
        />
      </Main>

      <MessagesDialogs />
    </MessagesProvider>
  )
}
