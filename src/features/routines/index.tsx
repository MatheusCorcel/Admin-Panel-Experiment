import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { RoutinesDialogs } from './components/routines-dialogs'
import { RoutinesPrimaryButtons } from './components/routines-primary-buttons'
import { RoutinesProvider } from './components/routines-provider'
import { RoutinesTable } from './components/routines-table'
import { routines } from './data/routines'

const route = getRouteApi('/_authenticated/routines/')

export function Routines() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <RoutinesProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Routines</h2>
            <p className='text-muted-foreground'>
              Create and manage workout routines.
            </p>
          </div>
          <RoutinesPrimaryButtons />
        </div>
        <RoutinesTable data={routines} search={search} navigate={navigate} />
      </Main>

      <RoutinesDialogs />
    </RoutinesProvider>
  )
}
