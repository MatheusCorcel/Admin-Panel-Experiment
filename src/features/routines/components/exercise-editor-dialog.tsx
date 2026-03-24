import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown } from 'lucide-react'
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { CoachCuesEditor } from '@/components/ui/coach-cues-editor'
import { type Exercise } from '../data/schema'
import { ExerciseNameCombobox } from './exercise-name-combobox'

const subExerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required.'),
  sets: z.coerce.number().min(1, 'At least 1 set is required.'),
  reps: z.string().min(1, 'Reps is required.'),
  recommendedRest: z.string().min(1, 'Recommended rest is required.'),
  category: z.enum(['compound', 'isolation']).optional(),
  coachCues: z.string().optional(),
})

const formSchema = z.object({
  entryType: z.enum(['single', 'superset']),
  single: subExerciseSchema.optional(),
  superset: z
    .object({
      exerciseA: subExerciseSchema,
      exerciseB: subExerciseSchema,
    })
    .optional(),
})
type ExerciseForm = z.infer<typeof formSchema>

type ExerciseEditorDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise?: Exercise | null
  onSave: (exercise: Exercise) => void
}

const defaultSingle = {
  name: '',
  sets: 3,
  reps: '',
  recommendedRest: '',
  category: undefined as 'compound' | 'isolation' | undefined,
  coachCues: '',
}

const defaultSuperset = {
  exerciseA: { ...defaultSingle },
  exerciseB: { ...defaultSingle },
}

export function ExerciseEditorDialog({
  open,
  onOpenChange,
  exercise,
  onSave,
}: ExerciseEditorDialogProps) {
  const isEdit = !!exercise

  const form = useForm<ExerciseForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entryType: 'single',
      single: defaultSingle,
      superset: defaultSuperset,
    },
  })

  const entryType = form.watch('entryType')

  useEffect(() => {
    if (open) {
      if (exercise) {
        if (exercise.entryType === 'single') {
          form.reset({
            entryType: 'single',
            single: {
              name: exercise.name,
              sets: exercise.sets,
              reps: exercise.reps,
              recommendedRest: exercise.recommendedRest,
              category: exercise.category,
              coachCues: exercise.coachCues,
            },
            superset: defaultSuperset,
          })
        } else {
          form.reset({
            entryType: 'superset',
            single: defaultSingle,
            superset: {
              exerciseA: exercise.exerciseA,
              exerciseB: exercise.exerciseB,
            },
          })
        }
      } else {
        form.reset({
          entryType: 'single',
          single: defaultSingle,
          superset: defaultSuperset,
        })
      }
    }
  }, [open, exercise, form])

  const onSubmit = (values: ExerciseForm) => {
    const id = exercise?.id ?? `ex-${crypto.randomUUID().slice(0, 8)}`
    const order = exercise?.order ?? 0

    if (values.entryType === 'single' && values.single) {
      onSave({
        id,
        order,
        entryType: 'single',
        name: values.single.name,
        sets: values.single.sets,
        reps: values.single.reps,
        recommendedRest: values.single.recommendedRest,
        category: values.single.category,
        coachCues: values.single.coachCues ?? '',
      })
    } else if (values.entryType === 'superset' && values.superset) {
      onSave({
        id,
        order,
        entryType: 'superset',
        exerciseA: values.superset.exerciseA,
        exerciseB: values.superset.exerciseB,
      })
    }
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
      <DialogContent className='max-h-[90vh] sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Exercise' : 'Add Exercise'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the exercise details below.'
              : 'Choose single exercise or superset, then fill in the details.'}
          </DialogDescription>
        </DialogHeader>
        <div className='-mx-4 max-h-[50vh] overflow-y-auto px-4 no-scrollbar'>
          <Form {...form}>
            <form
              id='exercise-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='entryType'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-center'>
                    <FormControl>
                      <ToggleGroup
                        type='single'
                        value={field.value}
                        onValueChange={(v) => v && field.onChange(v)}
                        className='rounded-lg bg-muted p-1'
                      >
                        <ToggleGroupItem
                          value='single'
                          aria-label='Single exercise'
                          className='w-28 rounded-md hover:bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm'
                        >
                          Single
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value='superset'
                          aria-label='Superset'
                          className='w-28 rounded-md hover:bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm'
                        >
                          Superset
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {entryType === 'single' && (
              <>
                <FormField
                  control={form.control}
                  name='single.name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise Name</FormLabel>
                      <FormControl>
                        <ExerciseNameCombobox
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          onSelectExercise={(cues) =>
                            form.setValue('single.coachCues', cues)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='single.sets'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sets</FormLabel>
                        <FormControl>
                          <Input type='number' min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='single.reps'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reps</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g., 8-10' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='single.recommendedRest'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recommended Rest</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., 60-90 sec'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='single.coachCues'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coach Cues</FormLabel>
                      <FormControl>
                        <CoachCuesEditor
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          placeholder='Optional coaching notes...'
                          minHeight='min-h-[80px]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {entryType === 'superset' && (
              <>
                <Collapsible defaultOpen className='rounded-lg border'>
                  <CollapsibleTrigger className='flex w-full items-center justify-between p-4 text-left text-sm font-medium hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180'>
                    Exercise A
                    <ChevronDown className='size-4 shrink-0 transition-transform duration-200' />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className='space-y-4 border-t px-4 pb-4 pt-2'>
                  <FormField
                    control={form.control}
                    name='superset.exerciseA.name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <ExerciseNameCombobox
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            onSelectExercise={(cues) =>
                              form.setValue('superset.exerciseA.coachCues', cues)
                            }
                            placeholder='e.g., Cable Flyes'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='superset.exerciseA.sets'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sets</FormLabel>
                          <FormControl>
                            <Input type='number' min={1} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='superset.exerciseA.reps'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reps</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., 12-15' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='superset.exerciseA.recommendedRest'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recommended Rest</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g., 45-60 sec' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='superset.exerciseA.coachCues'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coach Cues</FormLabel>
                        <FormControl>
                          <CoachCuesEditor
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            placeholder='Optional...'
                            minHeight='min-h-[64px]'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible defaultOpen className='rounded-lg border'>
                  <CollapsibleTrigger className='flex w-full items-center justify-between p-4 text-left text-sm font-medium hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180'>
                    Exercise B
                    <ChevronDown className='size-4 shrink-0 transition-transform duration-200' />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className='space-y-4 border-t px-4 pb-4 pt-2'>
                  <FormField
                    control={form.control}
                    name='superset.exerciseB.name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <ExerciseNameCombobox
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            onSelectExercise={(cues) =>
                              form.setValue('superset.exerciseB.coachCues', cues)
                            }
                            placeholder='e.g., Lateral Raises'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='superset.exerciseB.sets'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sets</FormLabel>
                          <FormControl>
                            <Input type='number' min={1} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='superset.exerciseB.reps'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reps</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., 12-15' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='superset.exerciseB.recommendedRest'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recommended Rest</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g., 45-60 sec' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='superset.exerciseB.coachCues'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coach Cues</FormLabel>
                        <FormControl>
                          <CoachCuesEditor
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            placeholder='Optional...'
                            minHeight='min-h-[64px]'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  </CollapsibleContent>
                </Collapsible>
              </>
            )}
          </form>
        </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' form='exercise-form'>
            {isEdit ? 'Update Exercise' : 'Add Exercise'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
