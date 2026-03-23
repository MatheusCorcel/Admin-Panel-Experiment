import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { List, Bold } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

type CoachCuesEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

/**
 * Minimal rich text editor for coach cues.
 * Supports bullet lists and bold. Stores/returns HTML strings.
 * Plain-text strings are loaded as a paragraph and can be reformatted.
 */
export function CoachCuesEditor({
  value,
  onChange,
  placeholder = 'Enter coaching cues...',
  className,
  minHeight = 'min-h-[80px]',
}: CoachCuesEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: valueToContent(value),
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm max-w-none focus:outline-none',
          '[&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-5',
          '[&_li]:my-0.5',
          '[&_p]:my-0',
          minHeight,
          'px-3 py-2'
        ),
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML()
      // Treat empty editor as empty string
      onChange(html === '<p></p>' ? '' : html)
    },
  })

  // Sync external value changes (e.g. auto-fill from exercise library)
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const next = valueToContent(value)
    // Avoid cursor-reset loops when the user is typing
    if (current !== next && (value ?? '') !== '') {
      editor.commands.setContent(next, false)
    } else if ((value ?? '') === '' && current !== '<p></p>') {
      editor.commands.clearContent()
    }
  }, [value, editor])

  if (!editor) return null

  const isBulletActive = editor.isActive('bulletList')
  const isBoldActive = editor.isActive('bold')

  return (
    <div
      className={cn(
        'rounded-md border border-input bg-background text-sm shadow-sm transition-colors',
        'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
        className
      )}
    >
      {/* Toolbar */}
      <div className='flex items-center gap-0.5 border-b px-1.5 py-1'>
        <ToolbarButton
          active={isBoldActive}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title='Bold'
        >
          <Bold size={13} />
        </ToolbarButton>
        <ToolbarButton
          active={isBulletActive}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title='Bullet list'
        >
          <List size={13} />
        </ToolbarButton>
      </div>

      {/* Editor area — show placeholder when empty */}
      <div className='relative'>
        {editor.isEmpty && (
          <p className='pointer-events-none absolute px-3 py-2 text-sm text-muted-foreground'>
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

function ToolbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean
  onClick: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <Button
      type='button'
      variant='ghost'
      size='sm'
      title={title}
      onClick={onClick}
      className={cn(
        'h-6 w-6 p-0',
        active && 'bg-muted text-foreground'
      )}
    >
      {children}
    </Button>
  )
}

/**
 * If the value already looks like HTML, use it directly.
 * Otherwise wrap it in a <p> so Tiptap can display it cleanly.
 */
function valueToContent(value: string | undefined): string {
  if (!value) return '<p></p>'
  const trimmed = value.trim()
  if (trimmed.startsWith('<')) return trimmed
  return `<p>${trimmed}</p>`
}
