import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChecklists } from './checklists-provider'

export function ChecklistsPrimaryButtons() {
  const { setOpen } = useChecklists()

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <Plus size={18} />
        <span>Add Checklist</span>
      </Button>
    </div>
  )
}
