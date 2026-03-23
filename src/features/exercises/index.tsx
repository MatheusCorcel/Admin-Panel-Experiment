import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { type ExerciseTemplate } from './data/schema'
import { exerciseTemplates as initialExercises } from './data/exercises'
import { ExerciseLibraryDialogs } from './components/exercise-library-dialogs'
import { ExerciseLibraryPrimaryButtons } from './components/exercise-library-primary-buttons'
import { ExerciseLibraryProvider } from './components/exercise-library-provider'
import { ExerciseLibraryTable } from './components/exercise-library-table'

export function ExerciseLibrary() {
  const [exercises, setExercises] =
    useState<ExerciseTemplate[]>(initialExercises)

  const handleAdd = (exercise: ExerciseTemplate) => {
    setExercises((prev) => [...prev, exercise])
  }

  const handleEdit = (updated: ExerciseTemplate) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === updated.id ? updated : ex))
    )
  }

  const handleDelete = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id))
  }

  return (
    <ExerciseLibraryProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <Link
              to='/routines'
              className='mb-1 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground'
            >
              <ChevronLeft size={16} />
              Back to Routines
            </Link>
            <h2 className='text-2xl font-bold tracking-tight'>
              Exercise Library
            </h2>
            <p className='text-muted-foreground'>
              Manage exercises and their predefined coach cues.
            </p>
          </div>
          <ExerciseLibraryPrimaryButtons />
        </div>

        <ExerciseLibraryTable data={exercises} />
      </Main>

      <ExerciseLibraryDialogs
        exercises={exercises}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </ExerciseLibraryProvider>
  )
}
