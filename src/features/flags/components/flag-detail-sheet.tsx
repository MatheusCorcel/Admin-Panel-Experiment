import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarClock, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  CURRENT_ACTOR_NAME,
  auditEventVerbLabels,
  categoryDotColor,
  classTypeLabels,
  classesToApproximateDate,
  flagCategories,
  flagNameLabels,
  getDisplayStatus,
  getStatusPillLabel,
  isResolvable,
  reschedulePresets,
  resolvesToPermanent,
  statusStyles,
} from '../data/data'
import {
  type Flag,
  type FlagAuditEvent,
  type FlagAuditEventType,
} from '../data/schema'

type FlagDetailSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Flag
  onUpdate: (updated: Flag) => void
}

export function FlagDetailSheet({
  open,
  onOpenChange,
  currentRow: flag,
  onUpdate,
}: FlagDetailSheetProps) {
  const [rescheduleOpen, setRescheduleOpen] = useState(false)

  const categoryLabel =
    flagCategories.find(({ value }) => value === flag.category)?.label ??
    flag.category
  const isClosed = flag.status === 'resolved' || flag.status === 'permanent'
  const canAct = isResolvable(flag)

  function nextAuditEvent(
    type: FlagAuditEventType,
    detail?: string
  ): FlagAuditEvent {
    return {
      id: `${flag.id}-a${flag.auditTrail.length + 1}`,
      type,
      actorName: CURRENT_ACTOR_NAME,
      actorRole: 'coach',
      at: new Date(),
      detail,
    }
  }

  function handleResolve() {
    const now = new Date()
    const toPermanent = resolvesToPermanent(flag)
    onUpdate({
      ...flag,
      status: toPermanent ? 'permanent' : 'resolved',
      resolvedByName: CURRENT_ACTOR_NAME,
      resolvedAt: now,
      convertedAt: toPermanent ? now : flag.convertedAt,
      auditTrail: [
        ...flag.auditTrail,
        nextAuditEvent(
          toPermanent ? 'converted_to_permanent' : 'resolved',
          toPermanent
            ? 'Resolved — converted to a permanent reminder'
            : 'Marked resolved by admin'
        ),
      ],
    })
    toast.success(
      toPermanent
        ? 'Resolved — converted to a permanent reminder.'
        : 'Flag resolved.'
    )
  }

  function handleReopen() {
    const now = new Date()
    const newDueAt =
      flag.dueInClasses !== null
        ? classesToApproximateDate(flag.dueInClasses, now)
        : null
    onUpdate({
      ...flag,
      status: 'active',
      resolvedByName: null,
      resolvedAt: null,
      convertedAt: null,
      dueAt: newDueAt,
      auditTrail: [
        ...flag.auditTrail,
        nextAuditEvent(
          'snoozed',
          'Reopened — treated the same as a reschedule in the history log (Gate 1, Q3 working assumption, pending Miguel)'
        ),
      ],
    })
    toast.success('Flag reopened.')
  }

  function applyReschedule(
    nextDueAt: Date,
    dueInClasses: number | null,
    detail: string
  ) {
    onUpdate({
      ...flag,
      status: 'active',
      dueAt: nextDueAt,
      dueInClasses,
      auditTrail: [...flag.auditTrail, nextAuditEvent('snoozed', detail)],
    })
    setRescheduleOpen(false)
    toast.success('Due date updated.')
  }

  function handleMakePermanent() {
    const now = new Date()
    onUpdate({
      ...flag,
      status: 'permanent',
      dueAt: null,
      dueInClasses: null,
      resolvedByName: CURRENT_ACTOR_NAME,
      resolvedAt: now,
      convertedAt: now,
      auditTrail: [
        ...flag.auditTrail,
        nextAuditEvent(
          'converted_to_permanent',
          'Converted to a permanent condition reminder'
        ),
      ],
    })
    setRescheduleOpen(false)
    toast.success('Converted to a permanent condition reminder.')
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='overflow-y-auto sm:max-w-md'>
        <SheetHeader>
          <SheetTitle asChild>
            <div className='flex items-center gap-2'>
              <span
                className={cn(
                  'size-2.5 shrink-0 rounded-sm',
                  categoryDotColor.get(flag.category)
                )}
              />
              <span className='text-xl'>{flagNameLabels[flag.flagName]}</span>
            </div>
          </SheetTitle>
          <SheetDescription>
            {flag.client.name} · {categoryLabel} Flag
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-4 px-4'>
          <div className='grid grid-cols-[auto_1fr] gap-y-2.5 text-sm'>
            <span className='text-muted-foreground'>Current Owner</span>
            <span className='text-right font-medium'>
              {flag.currentOwnerName ?? (
                <span className='text-muted-foreground'>
                  {flag.category === 'condition'
                    ? '— (condition flags have no owner)'
                    : '—'}
                </span>
              )}
            </span>

            <span className='text-muted-foreground'>Created by</span>
            <span className='text-right font-medium'>
              {flag.createdByName}
              {flag.category === 'condition' &&
                flag.createdByRole === 'coach' &&
                ' (courtesy entry)'}
            </span>

            <span className='text-muted-foreground'>Class</span>
            <span
              className={cn(
                'text-right font-medium',
                !flag.classType && 'font-normal text-muted-foreground'
              )}
            >
              {flag.classType ? classTypeLabels[flag.classType] : '—'}
            </span>

            <span className='text-muted-foreground'>Location</span>
            <span
              className={cn(
                'text-right font-medium',
                !flag.location && 'font-normal text-muted-foreground'
              )}
            >
              {flag.location ?? '—'}
            </span>

            <span className='text-muted-foreground'>Exercise</span>
            <span
              className={cn(
                'text-right font-medium',
                !flag.exerciseName && 'font-normal text-muted-foreground'
              )}
            >
              {flag.exerciseName ?? '—'}
            </span>

            <span className='text-muted-foreground'>Status</span>
            <span className='text-right'>
              <Badge
                variant='outline'
                className={statusStyles.get(getDisplayStatus(flag))}
              >
                {getStatusPillLabel(flag)}
              </Badge>
            </span>
          </div>

          {flag.legacyFlagName && (
            <p className='text-xs text-muted-foreground'>
              Also recorded under the retired name &quot;Alternate Needed&quot;
              (Gate 1, Q6).
            </p>
          )}

          {flag.note && (
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-muted-foreground'>Note</span>
              <p className='text-sm leading-relaxed'>{flag.note}</p>
            </div>
          )}

          <Separator />

          <div>
            <h4 className='mb-3 text-sm font-semibold'>History</h4>
            <div className='flex flex-col gap-3.5'>
              {flag.auditTrail.map((event) => (
                <div key={event.id} className='flex gap-2.5'>
                  <span className='mt-1.5 size-1.5 shrink-0 rounded-sm bg-slate-300 dark:bg-slate-600' />
                  <div className='flex flex-col'>
                    <span className='text-sm'>
                      {auditEventVerbLabels[event.type]} by {event.actorName}
                      {event.detail ? ` — ${event.detail}` : ''}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      {format(event.at, 'MMM d, yyyy · h:mm a')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {canAct && (
            <>
              <Separator />
              <div className='flex gap-2 pb-2'>
                {!isClosed && (
                  <Button onClick={handleResolve} className='flex-1'>
                    <CheckCircle size={16} />
                    Resolve
                  </Button>
                )}
                {isClosed ? (
                  <Button
                    variant='outline'
                    onClick={handleReopen}
                    className='flex-1'
                  >
                    <Clock size={16} />
                    Reopen
                  </Button>
                ) : (
                  <Popover
                    open={rescheduleOpen}
                    onOpenChange={setRescheduleOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant='outline' className='flex-1'>
                        <CalendarClock size={16} />
                        Reschedule
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='flex w-56 flex-col gap-1 p-2'
                      align='end'
                    >
                      {reschedulePresets.map((preset) => (
                        <Button
                          key={preset.classes}
                          variant='ghost'
                          className='justify-start'
                          onClick={() =>
                            applyReschedule(
                              classesToApproximateDate(preset.classes),
                              preset.classes,
                              preset.label
                            )
                          }
                        >
                          {preset.label}
                        </Button>
                      ))}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant='ghost' className='justify-start'>
                            Custom date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            onSelect={(date) =>
                              date && applyReschedule(date, null, 'Custom date')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Separator className='my-1' />
                      <Button
                        variant='ghost'
                        className='justify-start text-muted-foreground'
                        onClick={handleMakePermanent}
                      >
                        Make Permanent Condition
                      </Button>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <p className='pb-4 text-xs text-muted-foreground'>
                Available to admin and coach (confirmed). Every action here adds
                a new entry to the history above.
              </p>
            </>
          )}

          {!canAct && flag.category === 'condition' && (
            <>
              <Separator />
              <p className='pb-4 text-xs text-muted-foreground'>
                &quot;Created by&quot; always names who actually entered this
                flag — coach or client — independent of &quot;Current
                Owner,&quot; which only tracks who is responsible for resolving
                it. Condition flags never populate &quot;Current Owner,&quot;
                and this flag type has no resolve action.
              </p>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
