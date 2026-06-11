import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-black/95">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={[
            'w-full px-3 py-2 text-sm rounded border bg-white',
            'text-black/90 placeholder-notion-gray-300',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-notion-blue-focus focus:border-transparent',
            error ? 'border-red-400' : 'border-[rgba(0,0,0,0.1)]',
            className,
          ].join(' ')}
          {...props}
        />
        {hint && !error && <p className="text-xs text-notion-gray-300">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'
