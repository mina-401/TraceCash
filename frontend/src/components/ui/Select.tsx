import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = '', id, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-black/95">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={[
            'w-full px-3 py-2 text-sm rounded border bg-white',
            'text-black/90 cursor-pointer',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-notion-blue-focus focus:border-transparent',
            error ? 'border-red-400' : 'border-[rgba(0,0,0,0.1)]',
            className,
          ].join(' ')}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)
Select.displayName = 'Select'
