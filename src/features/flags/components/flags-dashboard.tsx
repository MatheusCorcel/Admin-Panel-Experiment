import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { getDisplayStatus, getResolutionClasses } from '../data/data'
import { type Flag } from '../data/schema'

type FlagsDashboardProps = {
  data: Flag[]
}

export function FlagsDashboard({ data }: FlagsDashboardProps) {
  const stats = useMemo(() => {
    const now = new Date()
    let active = 0
    let overdue = 0
    let resolvedThisPeriod = 0
    let totalResolutionClasses = 0
    let resolutionCount = 0

    for (const flag of data) {
      const displayStatus = getDisplayStatus(flag, now)
      if (displayStatus === 'active' || displayStatus === 'overdue') active += 1
      if (displayStatus === 'overdue') overdue += 1
      if (flag.status === 'resolved' || flag.status === 'permanent') {
        resolvedThisPeriod += 1
        const classes = getResolutionClasses(flag)
        if (classes !== null) {
          totalResolutionClasses += classes
          resolutionCount += 1
        }
      }
    }

    return {
      active,
      overdue,
      resolvedThisPeriod,
      // Simulated — see getResolutionClasses() in data.ts and the "For devs"
      // section of the Paper "Open Questions & Dev Flags" artboard.
      avgResolutionClasses:
        resolutionCount > 0 ? totalResolutionClasses / resolutionCount : null,
    }
  }, [data])

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
      <StatCard label='Active Flags' value={String(stats.active)} />
      <StatCard
        label='Resolved (this period)'
        value={String(stats.resolvedThisPeriod)}
      />
      <StatCard label='Overdue' value={String(stats.overdue)} highlight />
      <StatCard
        label='Avg. Time to Resolution'
        value={
          stats.avgResolutionClasses === null
            ? '—'
            : `${stats.avgResolutionClasses.toFixed(1)} classes`
        }
      />
    </div>
  )
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-lg border p-4',
        highlight && 'border-red-300 dark:border-red-800'
      )}
    >
      <span
        className={cn(
          'text-xs text-muted-foreground',
          highlight && 'text-red-600 dark:text-red-400'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-2xl leading-tight font-bold',
          highlight && 'text-red-600 dark:text-red-400'
        )}
      >
        {value}
      </span>
    </div>
  )
}
