import { format } from 'date-fns'
import { ArrowRight, CheckCircle, UserCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { statusStyles } from '../data/data'
import { type Feedback } from '../data/schema'

type FeedbackDetailSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Feedback
}

export function FeedbackDetailSheet({
  open,
  onOpenChange,
  currentRow,
}: FeedbackDetailSheetProps) {
  const badgeColor = statusStyles.get(currentRow.status)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-md overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Feedback Detail</SheetTitle>
          <SheetDescription asChild>
            <div className='flex items-center gap-2'>
              <span>{format(currentRow.date, 'MMM d, yyyy · h:mm a')}</span>
              <Badge
                variant='outline'
                className={cn('capitalize', badgeColor)}
              >
                {currentRow.status}
              </Badge>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-4 px-4'>
          <p className='text-sm leading-relaxed'>{currentRow.content}</p>

          <Separator />

          <div>
            <h4 className='mb-3 text-sm font-semibold'>Class Info</h4>
            <div className='grid grid-cols-2 gap-3 text-sm'>
              <div>
                <span className='text-muted-foreground'>Class Name</span>
                <p className='font-medium'>{currentRow.className}</p>
              </div>
              <div>
                <span className='text-muted-foreground'>Class Type</span>
                <p className='font-medium'>{currentRow.classType}</p>
              </div>
              <div>
                <span className='text-muted-foreground'>Date &amp; Time</span>
                <p className='font-medium'>
                  {format(currentRow.classDate, 'MMM d, yyyy · h:mm a')}
                </p>
              </div>
              <div>
                <span className='text-muted-foreground'>Routine Used</span>
                <p className='font-medium'>{currentRow.routineUsed}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className='mb-3 text-sm font-semibold'>Coach Info</h4>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                <UserCircle size={24} className='text-muted-foreground' />
              </div>
              <div>
                <p className='font-medium'>{currentRow.coachName}</p>
                <p className='text-sm text-muted-foreground'>
                  {currentRow.location}
                </p>
                <Link
                  to='/users/$userId'
                  params={{ userId: currentRow.coachId }}
                  className='flex items-center gap-1 text-sm text-primary hover:underline'
                >
                  View Coach Profile <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <Separator />

          <div className='flex gap-2 pb-4'>
            <Button
              onClick={() => {
                toast.success('Feedback marked as reviewed.')
                onOpenChange(false)
              }}
            >
              <CheckCircle size={16} />
              Mark as Reviewed
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
