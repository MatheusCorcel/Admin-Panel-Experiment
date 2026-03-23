import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
import { ContentSection } from '../components/content-section'

const studioSchema = z.object({
  studioName: z.string().min(1, 'Studio name is required.'),
  location: z.string().min(1, 'Location is required.'),
  timezone: z.string().min(1, 'Please select a timezone.'),
})

type StudioValues = z.infer<typeof studioSchema>

const timezoneOptions = [
  { value: 'ET', label: 'Eastern Time (ET)' },
  { value: 'CT', label: 'Central Time (CT)' },
  { value: 'MT', label: 'Mountain Time (MT)' },
  { value: 'PT', label: 'Pacific Time (PT)' },
]

export function SettingsStudio() {
  const form = useForm<StudioValues>({
    resolver: zodResolver(studioSchema),
    defaultValues: {
      studioName: 'BAM New York',
      location: '123 Fitness Ave, New York, NY',
      timezone: 'ET',
    },
  })

  function onSubmit(_data: StudioValues) {
    toast.success('Studio settings saved.')
  }

  return (
    <ContentSection
      title='Studio Settings'
      desc='Manage your studio information.'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='studioName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Studio Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='timezone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a timezone' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timezoneOptions.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Save</Button>
        </form>
      </Form>
    </ContentSection>
  )
}
