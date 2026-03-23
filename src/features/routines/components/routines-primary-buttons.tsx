import { Link } from '@tanstack/react-router'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RoutinesPrimaryButtons() {
  return (
    <div className='flex gap-2'>
      <Button variant='outline' className='space-x-1' asChild>
        <Link to='/routines/exercises'>
          <BookOpen size={16} />
          <span>Exercise Library</span>
        </Link>
      </Button>
      <Button className='space-x-1' asChild>
        <Link to='/routines/new/edit'>
          <Plus size={18} />
          <span>Create Routine</span>
        </Link>
      </Button>
    </div>
  )
}
