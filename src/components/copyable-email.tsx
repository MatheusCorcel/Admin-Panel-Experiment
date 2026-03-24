import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type CopyableEmailProps = {
  email: string
  className?: string
}

export function CopyableEmail({ email, className }: CopyableEmailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(email)
    setCopied(true)
    toast.success('Email copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type='button'
          onClick={handleCopy}
          aria-label='Copy email address'
          tabIndex={-1}
          className={cn(
            'group/email inline-flex cursor-pointer items-center gap-1 rounded-sm transition-colors hover:text-foreground',
            className
          )}
        >
          <span>{email}</span>
          <span className='inline-flex items-center justify-center rounded-sm p-0.5 opacity-0 transition-opacity group-hover/email:opacity-100'>
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side='top'>
        {copied ? 'Copied!' : 'Copy email'}
      </TooltipContent>
    </Tooltip>
  )
}
