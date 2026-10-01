import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export function Button({ variant = 'primary', className, ...rest }: Props) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-xl px-4 py-2 text-sm font-semibold transition',
        variant === 'primary' ? 'bg-accent text-white hover:brightness-110' : 'surface hover:brightness-95',
        className,
      )}
      {...rest}
    />
  )
}
