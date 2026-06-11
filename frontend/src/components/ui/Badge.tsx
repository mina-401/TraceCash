import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'pending' | 'paid' | 'skipped' | 'essential' | 'inactive'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-notion-blue-badge text-notion-blue-focus',
  pending: 'bg-amber-50 text-amber-700',
  paid: 'bg-green-50 text-notion-green',
  skipped: 'bg-black/5 text-notion-gray-500',
  essential: 'bg-red-50 text-red-600',
  inactive: 'bg-black/5 text-notion-gray-300',
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide',
        variantStyles[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
