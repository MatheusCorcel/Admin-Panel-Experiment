import { getRouteApi } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { FlagsDashboard } from './components/flags-dashboard'
import { FlagsDialogs } from './components/flags-dialogs'
import { FlagsProvider, useFlags } from './components/flags-provider'
import { FlagsTable } from './components/flags-table'
import { downloadCsv, flagsToCsv } from './data/csv'

const route = getRouteApi('/_authenticated/flags/')

export function Flags() {
  return (
    <FlagsProvider>
      <FlagsPageContent />
    </FlagsProvider>
  )
}

function FlagsPageContent() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const { flags, visibleFlags } = useFlags()

  function handleExportCsv() {
    const csv = flagsToCsv(visibleFlags)
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(`flags-export-${stamp}.csv`, csv)
    toast.success(
      `Exported ${visibleFlags.length} flag${visibleFlags.length === 1 ? '' : 's'} to CSV.`
    )
  }

  return (
    <>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Flags</h2>
            <p className='text-muted-foreground'>
              Every coach, system, and condition flag across the app — search,
              filter, and review trends.
            </p>
          </div>
          <Button variant='outline' onClick={handleExportCsv}>
            <Download size={16} />
            <span>Export CSV</span>
          </Button>
        </div>

        <FlagsDashboard data={flags} />

        <FlagsTable data={flags} search={search} navigate={navigate} />
      </Main>

      <FlagsDialogs />
    </>
  )
}
