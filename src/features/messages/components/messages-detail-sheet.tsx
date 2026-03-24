import { format } from 'date-fns'
import { ArrowRight, CheckCircle, UserCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CopyableEmail } from '@/components/copyable-email'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { statusStyles, senderTypeStyles } from '../data/data'
import { type ContactMessage } from '../data/schema'

type MessageDetailSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: ContactMessage
}

export function MessageDetailSheet({
  open,
  onOpenChange,
  currentRow,
}: MessageDetailSheetProps) {
  const statusBadgeColor = statusStyles.get(currentRow.status)
  const senderTypeBadgeColor = senderTypeStyles.get(currentRow.senderType)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-md overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Message Detail</SheetTitle>
          <SheetDescription asChild>
            <div className='flex items-center gap-2'>
              <span>{format(currentRow.date, 'MMM d, yyyy · h:mm a')}</span>
              <Badge
                variant='outline'
                className={cn('capitalize', statusBadgeColor)}
              >
                {currentRow.status}
              </Badge>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-4 px-4'>
          <p className='text-sm leading-relaxed'>{currentRow.message}</p>

          <Separator />

          <div>
            <h4 className='mb-3 text-sm font-semibold'>Sender Info</h4>
            <div className='flex items-start gap-3'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted'>
                <UserCircle size={24} className='text-muted-foreground' />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2'>
                  <p className='font-medium'>{currentRow.senderName}</p>
                  <Badge
                    variant='outline'
                    className={cn('capitalize text-xs', senderTypeBadgeColor)}
                  >
                    {currentRow.senderType}
                  </Badge>
                </div>
                <CopyableEmail
                  email={currentRow.senderEmail}
                  className='text-sm text-muted-foreground'
                />
                <p className='text-sm text-muted-foreground'>
                  {currentRow.location}
                </p>
                {currentRow.senderType === 'coach' && (
                  <Link
                    to='/users/$userId'
                    params={{ userId: currentRow.senderId }}
                    className='flex items-center gap-1 text-sm text-primary hover:underline'
                  >
                    View Coach Profile <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className='flex gap-2 pb-4'>
            <Button
              onClick={() => {
                toast.success('Message marked as read.')
                onOpenChange(false)
              }}
            >
              <CheckCircle size={16} />
              Mark as Read
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
