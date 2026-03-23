import { useState } from 'react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { format } from 'date-fns'
import { toast } from 'sonner'
import {
  ArrowLeft,
  MoreHorizontal,
  Trash2,
  UserX,
  UserCheck2,
  MessageSquareText,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { roles, statusStyles } from './data/data'
import { type UserRole } from './data/schema'
import { users } from './data/users'

const roleDescriptions = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full access to manage users, routines, and gym settings.',
  },
  {
    value: 'head_coach',
    label: 'Head Coach',
    description: 'Runs classes and manages coach schedules.',
  },
  {
    value: 'coach',
    label: 'Coach',
    description: 'Runs classes and manages client progress during sessions.',
  },
] as const

export function UserDetail() {
  const { userId } = useParams({
    from: '/_authenticated/users/$userId',
  })
  const navigate = useNavigate()
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return (
      <>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main className='flex flex-1 flex-col items-center justify-center gap-2'>
          <h2 className='text-2xl font-bold'>User not found</h2>
          <p className='text-muted-foreground'>
            The user you are looking for does not exist.
          </p>
          <Button variant='outline' asChild className='mt-4'>
            <Link to='/users'>
              <ArrowLeft size={16} className='mr-2' />
              Back to Users
            </Link>
          </Button>
        </Main>
      </>
    )
  }

  const fullName = `${user.firstName} ${user.lastName}`
  const userRole = roles.find(({ value }) => value === user.role)
  const badgeColor = statusStyles.get(user.status)
  const isCoachRole = user.role === 'coach' || user.role === 'head_coach'

  const [changeRoleOpen, setChangeRoleOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role)
  const [removeUserOpen, setRemoveUserOpen] = useState(false)

  return (
    <>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-6'>
        <div>
          <Button
            variant='link'
            asChild
            className='mb-2 -ml-4 text-muted-foreground'
          >
            <Link to='/users'>
              <ArrowLeft size={16} className='mr-1' />
              Back to Users
            </Link>
          </Button>

          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-bold'>
                {user.firstName.charAt(0)}
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-wrap items-center gap-3'>
                  <h2 className='text-2xl font-bold tracking-tight'>
                    {fullName}
                  </h2>
                  {userRole && (
                    <Badge variant='secondary' className='gap-1'>
                      {userRole.icon && <userRole.icon size={14} />}
                      {userRole.label}
                    </Badge>
                  )}
                  <Badge
                    variant='outline'
                    className={cn('capitalize', badgeColor)}
                  >
                    {user.status}
                  </Badge>
                </div>
                <span className='text-sm text-muted-foreground'>
                  {user.email}
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='icon'>
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-[180px]'>
                  <DropdownMenuItem onClick={() => setChangeRoleOpen(true)}>
                    Change Role
                    <DropdownMenuShortcut>
                      <RefreshCw size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    <DropdownMenuShortcut>
                      {user.status === 'active' ? (
                        <UserX size={16} />
                      ) : (
                        <UserCheck2 size={16} />
                      )}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className='text-red-500!'
                    onClick={() => setRemoveUserOpen(true)}
                  >
                    Remove User
                    <DropdownMenuShortcut>
                      <Trash2 size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* General Details */}
        <Card>
          <CardHeader>
            <CardTitle>General Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2'>
              <DetailItem label='Email' value={user.email} />
              <DetailItem label='Phone' value={user.phone ?? '—'} />
              <DetailItem label='Location' value={user.location} />
              <DetailItem label='Gender' value={user.gender ?? '—'} />
              <DetailItem
                label='Member Since'
                value={format(user.createdAt, 'MMM d, yyyy')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Coach / Head Coach: Activity Summary */}
        {isCoachRole && (
          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                <StatItem
                  label='Classes Completed'
                  value={String(user.classesCompleted)}
                />
                <StatItem
                  label='Classes Missed'
                  value={String(user.classesMissed)}
                />
                <StatItem
                  label='Early Check-Ins'
                  value={String(user.earlyCheckIns)}
                />
                <StatItem
                  label='Late Check-Ins'
                  value={String(user.lateCheckIns)}
                />
                <StatItem
                  label='Sessions This Month'
                  value={String(user.sessionsThisMonth)}
                />
                <StatItem
                  label='Sessions This Year'
                  value={String(user.sessionsThisYear)}
                />
                <StatItem
                  label='Last Check-In'
                  value={
                    user.lastCheckIn
                      ? format(user.lastCheckIn, 'MMM d, yyyy')
                      : '—'
                  }
                />
                <StatItem
                  label='Last Check-Out'
                  value={
                    user.lastCheckOut
                      ? format(user.lastCheckOut, 'MMM d, yyyy')
                      : '—'
                  }
                />
              </div>
              <div>
                <Button
                  variant='outline'
                  onClick={() =>
                    navigate({
                      to: '/feedback',
                      search: { coachName: [fullName] },
                    })
                  }
                >
                  <MessageSquareText size={16} className='mr-2' />
                  View Feedbacks
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin: Last Online */}
        {user.role === 'admin' && (
          <Card>
            <CardHeader>
              <CardTitle>Admin Info</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailItem
                label='Last Online'
                value={
                  user.lastCheckIn
                    ? format(user.lastCheckIn, 'MMM d, yyyy hh:mm a')
                    : '—'
                }
              />
            </CardContent>
          </Card>
        )}
      </Main>

      <Dialog
        open={changeRoleOpen}
        onOpenChange={(open) => {
          setChangeRoleOpen(open)
          if (!open) setSelectedRole(user.role)
        }}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>
              Update the role for {fullName}. This will change their
              permissions and access level.
            </DialogDescription>
          </DialogHeader>
          <RadioGroup
            value={selectedRole}
            onValueChange={(val) => setSelectedRole(val as UserRole)}
            className='gap-0 py-2'
          >
            {roleDescriptions.map(({ value, label, description }) => (
              <Label
                key={value}
                htmlFor={`role-${value}`}
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
                  selectedRole === value
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:bg-muted/50'
                )}
              >
                <RadioGroupItem
                  value={value}
                  id={`role-${value}`}
                  className='mt-0.5'
                />
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-medium'>{label}</span>
                  <span className='text-sm text-muted-foreground font-normal'>
                    {description}
                  </span>
                </div>
              </Label>
            ))}
          </RadioGroup>
          <DialogFooter className='gap-y-2'>
            <Button
              variant='outline'
              onClick={() => {
                setChangeRoleOpen(false)
                setSelectedRole(user.role)
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={selectedRole === user.role}
              onClick={() => {
                const newRole = roles.find((r) => r.value === selectedRole)
                toast.success(
                  `Role updated to ${newRole?.label ?? selectedRole}`,
                  { description: fullName }
                )
                setChangeRoleOpen(false)
              }}
            >
              Change Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={removeUserOpen}
        onOpenChange={setRemoveUserOpen}
        title='Remove User'
        desc={
          <>
            Are you sure you want to remove {fullName}? This action cannot be
            undone.{' '}
            {user.role === 'coach' ? (
              <>They will lose access to the coach profile on the app.</>
            ) : user.role === 'head_coach' ? (
              // TODO: Review later - Head Coach currently assumed to have access to both admin panel and coach profile
              <>
                They will lose access to both the admin panel and the coach
                profile on the app.
              </>
            ) : (
              <>They will lose access to the admin panel.</>
            )}
          </>
        }
        cancelBtnText='Cancel'
        confirmText='Remove'
        destructive
        handleConfirm={() => {
          toast.success('User removed', { description: fullName })
          setRemoveUserOpen(false)
          navigate({ to: '/users' })
        }}
      />
    </>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-sm text-muted-foreground'>{label}</span>
      <span className='text-sm font-medium'>{value}</span>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col gap-1 rounded-lg border p-4'>
      <span className='text-xs text-muted-foreground'>{label}</span>
      <span className='text-2xl font-bold'>{value}</span>
    </div>
  )
}
