import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { roles } from '../data/data'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(1, 'Role is required.'),
})

type InviteForm = z.infer<typeof formSchema>

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersInviteDialog({ open, onOpenChange }: Props) {
  const form = useForm<InviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', role: 'coach' },
  })

  const onSubmit = (values: InviteForm) => {
    form.reset()
    toast.success(`Invitation sent to ${values.email}`)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-start'>
          <DialogTitle className='flex items-center gap-2'>
            <UserPlus size={18} /> Invite User
          </DialogTitle>
          <DialogDescription>
            Send an email invitation to join BAM Labs. The user will receive
            instructions to set up their account via OTP verification.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='user-invite-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='coach@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select a role'
                    items={roles.map(({ label, value }) => ({
                      label,
                      value,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='rounded-md border bg-muted/50 p-4'>
          <p className='mb-2 text-sm font-medium'>Email will include:</p>
          <ul className='list-inside list-disc space-y-1 text-sm text-muted-foreground'>
            <li>Explanation of the invitation</li>
            <li>Link to sign up (web for admins, mobile app for coaches)</li>
            <li>Instructions on how to get started</li>
            <li>Contact support line</li>
          </ul>
        </div>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' form='user-invite-form'>
            Send Invite <Send size={16} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
