import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { CoachCuesEditor } from '@/components/ui/coach-cues-editor'
import {
  contributionMuscles,
  muscleGroupLabels,
  muscleGroups,
  exerciseTypes,
  type ExerciseTemplate,
} from '../data/schema'
import { ExerciseSelectCombobox } from './exercise-select-combobox'
import { MuscleCombobox } from './muscle-combobox'

const muscleContributionFormSchema = z.object({
  muscle: z.enum(contributionMuscles, {
    required_error: 'Select a muscle.',
  }),
  contribution: z.coerce
    .number({ message: 'Enter a contribution amount.' })
    .min(0.25, 'Must be at least 0.25 sets.'),
})

const formSchema = z
  .object({
    name: z.string().min(1, 'Exercise name is required.'),
    muscleGroup: z.enum(muscleGroups, {
      required_error: 'Please select a muscle group.',
    }),
    exerciseType: z.enum(exerciseTypes, {
      required_error: 'Please select an exercise type.',
    }),
    coachCues: z.string().optional(),
    primaryMuscle: z.enum(contributionMuscles, {
      required_error: 'Select the primary muscle.',
    }),
    primaryContribution: z.coerce
      .number({ message: 'Enter a contribution amount.' })
      .min(0.25, 'Must be at least 0.25 sets.'),
    secondaryMuscles: z.array(muscleContributionFormSchema).max(2),
    alternatePrimaryId: z.string().optional(),
    alternateSecondaryId: z.string().optional(),
  })
  .refine(
    (data) => {
      const muscles = [
        data.primaryMuscle,
        ...data.secondaryMuscles.map((m) => m.muscle),
      ]
      return new Set(muscles).size === muscles.length
    },
    {
      message: 'Each muscle can only be selected once.',
      path: ['secondaryMuscles'],
    }
  )
  .refine(
    (data) =>
      !data.alternatePrimaryId ||
      !data.alternateSecondaryId ||
      data.alternatePrimaryId !== data.alternateSecondaryId,
    {
      message: 'Primary and secondary alternates must be different.',
      path: ['alternateSecondaryId'],
    }
  )

type ExerciseTemplateForm = z.infer<typeof formSchema>

const defaultFormValues: ExerciseTemplateForm = {
  name: '',
  muscleGroup: 'chest',
  exerciseType: 'compound',
  coachCues: '',
  primaryMuscle: 'chest',
  primaryContribution: 1,
  secondaryMuscles: [],
  alternatePrimaryId: undefined,
  alternateSecondaryId: undefined,
}

type ExerciseTemplateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise?: ExerciseTemplate | null
  exercises: ExerciseTemplate[]
  onSave: (exercise: ExerciseTemplate) => void
}

export function ExerciseTemplateDialog({
  open,
  onOpenChange,
  exercise,
  exercises,
  onSave,
}: ExerciseTemplateDialogProps) {
  const isEdit = !!exercise

  const form = useForm<ExerciseTemplateForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  })

  const secondaryMusclesArray = useFieldArray({
    control: form.control,
    name: 'secondaryMuscles',
  })

  useEffect(() => {
    if (open) {
      if (exercise) {
        form.reset({
          name: exercise.name,
          muscleGroup: exercise.muscleGroup,
          exerciseType: exercise.exerciseType,
          coachCues: exercise.coachCues,
          primaryMuscle: exercise.primaryMuscle?.muscle ?? 'chest',
          primaryContribution: exercise.primaryMuscle?.contribution ?? 1,
          secondaryMuscles: exercise.secondaryMuscles ?? [],
          alternatePrimaryId: exercise.alternatePrimaryId,
          alternateSecondaryId: exercise.alternateSecondaryId,
        })
      } else {
        form.reset(defaultFormValues)
      }
    }
  }, [open, exercise, form])

  const primaryMuscle = form.watch('primaryMuscle')
  const secondaryMuscles = form.watch('secondaryMuscles')
  const alternatePrimaryId = form.watch('alternatePrimaryId')
  const alternateSecondaryId = form.watch('alternateSecondaryId')

  const addSecondaryMuscle = () => {
    const usedMuscles = [
      primaryMuscle,
      ...secondaryMuscles.map((m) => m.muscle),
    ]
    const nextMuscle = contributionMuscles.find(
      (m) => !usedMuscles.includes(m)
    )
    secondaryMusclesArray.append({
      muscle: nextMuscle ?? contributionMuscles[0],
      contribution: secondaryMusclesArray.fields.length === 0 ? 0.5 : 0.25,
    })
  }

  const otherExercises = exercise
    ? exercises.filter((ex) => ex.id !== exercise.id)
    : exercises

  const onSubmit = (values: ExerciseTemplateForm) => {
    onSave({
      id: exercise?.id ?? `et-${crypto.randomUUID().slice(0, 8)}`,
      name: values.name,
      muscleGroup: values.muscleGroup,
      exerciseType: values.exerciseType,
      coachCues: values.coachCues ?? '',
      primaryMuscle: {
        muscle: values.primaryMuscle,
        contribution: values.primaryContribution,
      },
      secondaryMuscles: values.secondaryMuscles,
      alternatePrimaryId: values.alternatePrimaryId,
      alternateSecondaryId: values.alternateSecondaryId,
    })
    form.reset(defaultFormValues)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset(defaultFormValues)
        onOpenChange(state)
      }}
    >
      <DialogContent className='flex max-h-[85vh] flex-col sm:max-w-xl'>
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
            className='-mx-6 flex-1 space-y-6 overflow-y-auto px-6'
          >
            <FormField
              control={form.control}
              name='exerciseType'
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
                        value='compound'
                        aria-label='Compound exercise'
                        className='w-28 rounded-md hover:bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm'
                      >
                        Compound
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value='isolation'
                        aria-label='Isolation exercise'
                        className='w-28 rounded-md hover:bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm'
                      >
                        Isolation
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <CoachCuesEditor
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder='Enter coaching instructions for this exercise...'
                      minHeight='min-h-[112px]'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-3 border-t pt-4'>
              <div>
                <h4 className='text-sm font-medium'>Muscle Contribution</h4>
                <p className='text-sm text-muted-foreground'>
                  Set the primary muscle and, optionally, up to two secondary
                  muscles worked by this exercise.
                </p>
              </div>

              <div className='flex items-start gap-2'>
                <FormField
                  control={form.control}
                  name='primaryMuscle'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-xs text-muted-foreground'>
                        Primary muscle
                      </FormLabel>
                      <FormControl>
                        <MuscleCombobox
                          value={field.value}
                          onChange={field.onChange}
                          excludeMuscles={secondaryMuscles.map(
                            (m) => m.muscle
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='primaryContribution'
                  render={({ field }) => (
                    <FormItem className='w-32'>
                      <FormLabel className='text-xs text-muted-foreground'>
                        Contribution
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type='number'
                            step={0.25}
                            min={0.25}
                            {...field}
                          />
                          <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground'>
                            sets
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {secondaryMusclesArray.fields.map((field, index) => (
                <div key={field.id} className='flex items-start gap-2'>
                  <FormField
                    control={form.control}
                    name={`secondaryMuscles.${index}.muscle`}
                    render={({ field: muscleField }) => (
                      <FormItem className='flex-1'>
                        <FormLabel className='text-xs text-muted-foreground'>
                          {index === 0 ? 'Secondary muscle' : 'Third muscle'}
                        </FormLabel>
                        <FormControl>
                          <MuscleCombobox
                            value={muscleField.value}
                            onChange={muscleField.onChange}
                            excludeMuscles={[
                              primaryMuscle,
                              ...secondaryMuscles
                                .filter((_, i) => i !== index)
                                .map((m) => m.muscle),
                            ]}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`secondaryMuscles.${index}.contribution`}
                    render={({ field: contributionField }) => (
                      <FormItem className='w-32'>
                        <FormLabel className='text-xs text-muted-foreground'>
                          Contribution
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type='number'
                              step={0.25}
                              min={0.25}
                              {...contributionField}
                            />
                            <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground'>
                              sets
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='mt-6 h-9 w-9 text-muted-foreground hover:text-destructive'
                    onClick={() => secondaryMusclesArray.remove(index)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}

              {secondaryMusclesArray.fields.length < 2 && (
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={addSecondaryMuscle}
                >
                  <Plus size={14} className='mr-1' />
                  Add secondary muscle
                </Button>
              )}
            </div>

            <div className='space-y-3 border-t pt-4'>
              <div>
                <h4 className='text-sm font-medium'>Alternate Exercises</h4>
                <p className='text-sm text-muted-foreground'>
                  Optional. If a client can&apos;t perform this exercise, the
                  primary alternate is suggested first, then the secondary.
                </p>
              </div>

              <FormField
                control={form.control}
                name='alternatePrimaryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs text-muted-foreground'>
                      Primary alternate
                    </FormLabel>
                    <FormControl>
                      <ExerciseSelectCombobox
                        value={field.value}
                        onChange={field.onChange}
                        exercises={otherExercises}
                        excludeIds={
                          alternateSecondaryId ? [alternateSecondaryId] : []
                        }
                        placeholder='Select a primary alternate'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='alternateSecondaryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs text-muted-foreground'>
                      Secondary alternate
                    </FormLabel>
                    <FormControl>
                      <ExerciseSelectCombobox
                        value={field.value}
                        onChange={field.onChange}
                        exercises={otherExercises}
                        excludeIds={
                          alternatePrimaryId ? [alternatePrimaryId] : []
                        }
                        placeholder='Select a secondary alternate'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
