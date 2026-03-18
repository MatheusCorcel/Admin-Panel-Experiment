import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { muscleGroupLabels, muscleGroups, type ExerciseTemplate } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(1, 'Exercise name is required.'),
  muscleGroup: z.enum(muscleGroups, {
    required_error: 'Please select a muscle group.',
  }),
  coachCues: z.string().optional(),
})

type ExerciseTemplateForm = z.infer<typeof formSchema>

type ExerciseTemplateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise?: ExerciseTemplate | null
  onSave: (exercise: ExerciseTemplate) => void
}

export function ExerciseTemplateDialog({
  open,
  onOpenChange,
  exercise,
  onSave,
}: ExerciseTemplateDialogProps) {
  const isEdit = !!exercise

  const form = useForm<ExerciseTemplateForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      muscleGroup: 'chest',
      coachCues: '',
    },
  })

  useEffect(() => {
    if (open) {
      if (exercise) {
        form.reset({
          name: exercise.name,
          muscleGroup: exercise.muscleGroup,
          coachCues: exercise.coachCues,
        })
      } else {
        form.reset({
          name: '',
          muscleGroup: 'chest',
          coachCues: '',
        })
      }
    }
  }, [open, exercise, form])

  const onSubmit = (values: ExerciseTemplateForm) => {
    onSave({
      id: exercise?.id ?? `et-${crypto.randomUUID().slice(0, 8)}`,
      name: values.name,
      muscleGroup: values.muscleGroup,
      coachCues: values.coachCues ?? '',
    })
    form.reset()
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
          <DialogTitle>
            {isEdit ? 'Edit Exercise' : 'Add Exercise'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the exercise details in the library.'
              : 'Add a new exercise to the library with predefined coach cues.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id='exercise-template-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Barbell Bench Press'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='muscleGroup'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muscle Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a muscle group' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {muscleGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {muscleGroupLabels[group]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='coachCues'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coach Cues</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter coaching instructions for this exercise...'
                      className='min-h-28'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' form='exercise-template-form'>
            {isEdit ? 'Save Changes' : 'Add Exercise'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
