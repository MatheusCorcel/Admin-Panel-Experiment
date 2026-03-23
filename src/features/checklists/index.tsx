import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { ChecklistsDialogs } from './components/checklists-dialogs'
import { ChecklistsPrimaryButtons } from './components/checklists-primary-buttons'
import { ChecklistsProvider } from './components/checklists-provider'
import { ChecklistsTable } from './components/checklists-table'
import { checklistBundles } from './data/checklists'

const route = getRouteApi('/_authenticated/checklists/')

export function Checklists() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <ChecklistsProvider>
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
              Class Checklists
            </h2>
            <p className='text-muted-foreground'>
              Create and manage pre-class and post-class checklists.
            </p>
          </div>
          <ChecklistsPrimaryButtons />
        </div>
        <ChecklistsTable
          data={checklistBundles}
          search={search}
          navigate={navigate}
        />
      </Main>

      <ChecklistsDialogs />
    </ChecklistsProvider>
  )
}
