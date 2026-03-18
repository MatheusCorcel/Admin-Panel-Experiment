import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { categories, faqStatuses } from '../data/data'
import { type Faq } from '../data/schema'

const formSchema = z.object({
  question: z.string().min(1, 'Question is required.'),
  answer: z.string().min(1, 'Answer is required.'),
  category: z.string().min(1, 'Category is required.'),
  status: z.string().min(1, 'Status is required.'),
})
type FaqForm = z.infer<typeof formSchema>

type FaqEditorDialogProps = {
  currentRow?: Faq
  open: boolean
  onOpenChange: (open: boolean) => void
  onArchive?: () => void
}

export function FaqEditorDialog({
  currentRow,
  open,
  onOpenChange,
  onArchive,
}: FaqEditorDialogProps) {
  const isEdit = !!currentRow
  const form = useForm<FaqForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          question: currentRow.question,
          answer: currentRow.answer,
          category: currentRow.category,
          status: currentRow.status,
        }
      : {
          question: '',
          answer: '',
          category: '',
          status: 'draft',
        },
  })

  const onSubmit = (values: FaqForm) => {
    form.reset()
    toast.success(
      isEdit ? 'FAQ updated successfully.' : 'FAQ created successfully.',
      { description: values.question }
    )
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
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the FAQ entry below.'
              : 'Create a new frequently asked question.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='faq-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='question'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., How do I reset my password?'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='answer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Write the answer here...'
                      className='min-h-32'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select a category'
                    items={categories.map(({ label, value }) => ({
                      label,
                      value,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select status'
                    items={faqStatuses.map(({ label, value }) => ({
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
        <DialogFooter className='flex-row justify-between gap-2 sm:justify-between'>
          {isEdit && onArchive ? (
            <Button
              type='button'
              variant='outline'
              className='text-red-500 border-red-200 hover:bg-red-50'
              onClick={onArchive}
            >
              Archive
            </Button>
          ) : (
            <div />
          )}
          <div className='flex gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' form='faq-form'>
              Save FAQ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
