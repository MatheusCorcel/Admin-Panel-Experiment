import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GripVertical, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import {
  Dialog,
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
import { ConfirmDialog } from '@/components/confirm-dialog'
import { checklistLocations } from '../data/data'
import { type ChecklistBundle, type ChecklistStatus } from '../data/schema'

const itemSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Item text is required.'),
})

const formSchema = z.object({
  name: z.string().min(1, 'Checklist name is required.'),
  type: z.enum(['pre_class', 'post_class'], {
    required_error: 'Please select a checklist type.',
  }),
  location: z.string().min(1, 'Please select a location.'),
  items: z.array(itemSchema).min(1, 'Add at least one checklist item.'),
})

type BundleForm = z.infer<typeof formSchema>

type SortableItemProps = {
  id: string
  index: number
  isOnly: boolean
  onRemove: () => void
  fieldName: `items.${number}.label`
  form: ReturnType<typeof useForm<BundleForm>>
}

function SortableItem({
  id,
  index,
  isOnly,
  onRemove,
  fieldName,
  form,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center gap-2'
    >
      <button
        type='button'
        {...attributes}
        {...listeners}
        tabIndex={-1}
        className='cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing'
        aria-label='Drag to reorder'
      >
        <GripVertical size={16} />
      </button>
      <span className='w-5 text-center text-xs text-muted-foreground'>
        {index + 1}
      </span>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field: itemField }) => (
          <FormItem className='flex-1'>
            <FormControl>
              <Input placeholder='Checklist item...' {...itemField} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive'
        disabled={isOnly}
        onClick={onRemove}
      >
        <X size={16} />
      </Button>
    </div>
  )
}

type ChecklistBundleDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  bundle?: ChecklistBundle | null
  onSave: (bundle: ChecklistBundle) => void
}

export function ChecklistBundleDialog({
  open,
  onOpenChange,
  bundle,
  onSave,
}: ChecklistBundleDialogProps) {
  const isEdit = !!bundle
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  const form = useForm<BundleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'pre_class',
      location: '',
      items: [{ id: crypto.randomUUID().slice(0, 8), label: '' }],
    },
  })

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  useEffect(() => {
    if (open) {
      if (bundle) {
        form.reset({
          name: bundle.name,
          type: bundle.type,
          location: bundle.location,
          items: bundle.items.map((item) => ({
            id: item.id,
            label: item.label,
          })),
        })
      } else {
        form.reset({
          name: '',
          type: 'pre_class',
          location: '',
          items: [{ id: crypto.randomUUID().slice(0, 8), label: '' }],
        })
      }
    }
  }, [open, bundle, form])

  const buildBundle = (
    values: BundleForm,
    status: ChecklistStatus
  ): ChecklistBundle => ({
    id: bundle?.id ?? `cb-${crypto.randomUUID().slice(0, 8)}`,
    name: values.name,
    type: values.type,
    location: values.location,
    status,
    itemCount: values.items.length,
    items: values.items.map((item, i) => ({
      id: item.id,
      label: item.label,
      order: i + 1,
    })),
    createdBy: bundle?.createdBy ?? 'Miguel Berlanga',
    lastUpdated: new Date(),
    createdAt: bundle?.createdAt ?? new Date(),
  })

  const handleSaveDraft = () => {
    form.handleSubmit((values) => {
      onSave(buildBundle(values, 'draft'))
      form.reset()
      onOpenChange(false)
      toast.success('Checklist saved as draft.', { description: values.name })
    })()
  }

  const handlePublishClick = () => {
    form.handleSubmit(() => {
      setPublishDialogOpen(true)
    })()
  }

  const confirmPublish = () => {
    const values = form.getValues()
    onSave(buildBundle(values, 'published'))
    form.reset()
    setPublishDialogOpen(false)
    onOpenChange(false)
    toast.success('Checklist published successfully.', {
      description: values.name,
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = fields.findIndex((f) => f.id === active.id)
    const newIndex = fields.findIndex((f) => f.id === over.id)
    if (oldIndex !== -1 && newIndex !== -1) {
      replace(arrayMove(fields, oldIndex, newIndex))
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(state) => {
          form.reset()
          onOpenChange(state)
        }}
      >
        <DialogContent className='flex max-h-[90vh] flex-col sm:max-w-lg'>
          <DialogHeader className='text-start'>
            <DialogTitle>
              {isEdit ? 'Edit Checklist' : 'Add Checklist'}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? 'Update the checklist bundle details and items.'
                : 'Create a new checklist bundle with items for coaches.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className='-mx-4 flex-1 overflow-y-auto px-4 no-scrollbar'>
              <div className='space-y-4 pb-2'>
                {/* Type toggle — no label, matches Exercise Editor style */}
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormControl>
                        <ToggleGroup
                          type='single'
                          value={field.value}
                          onValueChange={(val) => {
                            if (val) field.onChange(val)
                          }}
                          className='rounded-lg bg-muted p-1'
                        >
                          <ToggleGroupItem
                            value='pre_class'
                            className='w-32 rounded-md hover:bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm'
                          >
                            Pre-Class
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value='post_class'
                            className='w-32 rounded-md hover:bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm'
                          >
                            Post-Class
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
                      <FormLabel>Checklist Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Post-Class Coach Debrief'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a location' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {checklistLocations.map((loc) => (
                            <SelectItem key={loc.value} value={loc.value}>
                              {loc.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='space-y-2'>
                  <FormLabel>Checklist Items</FormLabel>
                  {form.formState.errors.items?.root && (
                    <p className='text-sm text-destructive'>
                      {form.formState.errors.items.root.message}
                    </p>
                  )}
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={fields.map((f) => f.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className='space-y-2'>
                        {fields.map((field, index) => (
                          <SortableItem
                            key={field.id}
                            id={field.id}
                            index={index}
                            isOnly={fields.length <= 1}
                            onRemove={() => remove(index)}
                            fieldName={`items.${index}.label`}
                            form={form}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className='mt-2 w-full'
                    onClick={() =>
                      append({
                        id: crypto.randomUUID().slice(0, 8),
                        label: '',
                      })
                    }
                  >
                    <Plus size={16} className='mr-1' />
                    Add Item
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          <DialogFooter className='gap-2'>
            <Button type='button' variant='outline' onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button type='button' onClick={handlePublishClick}>
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        title='Publish Checklist'
        desc={`Are you sure you want to publish "${form.getValues('name')}"? All changes will be pushed to the mobile app.`}
        confirmText='Publish'
        handleConfirm={confirmPublish}
      />
    </>
  )
}
