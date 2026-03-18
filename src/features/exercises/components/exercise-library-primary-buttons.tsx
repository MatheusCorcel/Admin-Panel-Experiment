import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useExerciseLibrary } from './exercise-library-provider'

export function ExerciseLibraryPrimaryButtons() {
  const { setOpen } = useExerciseLibrary()

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <Plus size={18} />
        <span>Add Exercise</span>
      </Button>
    </div>
  )
}
