import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFaqs } from './faqs-provider'

export function FaqsPrimaryButtons() {
  const { setOpen } = useFaqs()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <Plus size={18} />
        <span>Add FAQ</span>
      </Button>
    </div>
  )
}
