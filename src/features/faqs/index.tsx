import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { FaqsDialogs } from './components/faqs-dialogs'
import { FaqsPrimaryButtons } from './components/faqs-primary-buttons'
import { FaqsProvider } from './components/faqs-provider'
import { FaqsTable } from './components/faqs-table'
import { faqs } from './data/faqs'

const route = getRouteApi('/_authenticated/faqs/')

export function Faqs() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <FaqsProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>FAQs</h2>
            <p className='text-muted-foreground'>
              Manage frequently asked questions for the coach app.
            </p>
          </div>
          <FaqsPrimaryButtons />
        </div>
        <FaqsTable data={faqs} search={search} navigate={navigate} />
      </Main>

      <FaqsDialogs />
    </FaqsProvider>
  )
}
