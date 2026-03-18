import { useState, type JSX } from 'react'
import { useLocation, useNavigate, Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { Button, buttonVariants } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SidebarNavProps = React.HTMLAttributes<HTMLElement> & {
  items: {
    href: string
    title: string
    icon: JSX.Element
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const [val, setVal] = useState(pathname ?? '/settings')
  const [signOutOpen, setSignOutOpen] = useState(false)

  const handleSelect = (e: string) => {
    setVal(e)
    navigate({ to: e })
  }

  const handleSignOut = () => {
    auth.reset()
    navigate({ to: '/sign-in', replace: true })
  }

  return (
    <>
      <div className='p-1 md:hidden'>
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className='h-12 sm:w-48'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className='flex gap-x-4 px-2 py-1'>
                  <span className='scale-125'>{item.icon}</span>
                  <span className='text-md'>{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        orientation='horizontal'
        type='always'
        className='hidden w-full min-w-40 bg-background px-1 py-2 md:block'
      >
        <nav
          className={cn(
            'flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0',
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href
                  ? 'bg-muted hover:bg-accent'
                  : 'hover:bg-accent hover:underline',
                'justify-start'
              )}
            >
              <span className='me-2'>{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className='mt-4 border-t pt-4 lg:px-0'>
          <Button
            variant='outline'
            className='w-full justify-start text-destructive hover:text-destructive'
            onClick={() => setSignOutOpen(true)}
          >
            <LogOut size={18} className='me-2' />
            Sign Out
          </Button>
        </div>
      </ScrollArea>

      <ConfirmDialog
        open={signOutOpen}
        onOpenChange={setSignOutOpen}
        title='Sign out'
        desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
        confirmText='Sign out'
        destructive
        handleConfirm={handleSignOut}
        className='sm:max-w-sm'
      />
    </>
  )
}
