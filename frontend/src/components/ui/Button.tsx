import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-notion-blue text-white hover:bg-notion-blue-active active:scale-95',
  secondary:
    'bg-black/5 text-black/95 hover:bg-black/10 active:scale-95',
  ghost:
    'bg-transparent text-black/95 hover:underline',
  danger:
    'bg-transparent text-notion-orange hover:bg-orange-50 active:scale-95',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-2.5 py-1.5 text-xs font-semibold',
  md: 'px-4 py-2 text-sm font-semibold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'secondary', size = 'md', loading = false, disabled, children, className = '', ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center gap-1.5 rounded transition-all duration-150',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(' ')}
        {...props}
      >
        {loading && (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
