import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface GCRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const GCRadio = forwardRef<HTMLInputElement, GCRadioProps>(
  ({ label, className, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={cn(
            "w-5 h-5 border-2 border-gray-400 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[oklch(0.45_0.12_250)]",
            "checked:border-[oklch(0.45_0.12_250)] checked:bg-[oklch(0.45_0.12_250)]",
            className
          )}
          {...props}
        />
        {label && (
          <label 
            htmlFor={radioId}
            className="text-sm text-gray-900 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

GCRadio.displayName = "GCRadio"

interface GCRadioGroupProps {
  label?: string
  error?: string
  helperText?: string
  children: React.ReactNode
  className?: string
}

export function GCRadioGroup({ label, error, helperText, children, className }: GCRadioGroupProps) {
  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`
  const helperId = helperText ? `${groupId}-helper` : undefined
  const errorId = error ? `${groupId}-error` : undefined

  return (
    <fieldset 
      className={cn("flex flex-col gap-2", className)}
      aria-describedby={[helperId, errorId].filter(Boolean).join(' ') || undefined}
    >
      {label && (
        <legend className="text-sm font-semibold text-gray-900 mb-1">
          {label}
        </legend>
      )}
      {helperText && (
        <p id={helperId} className="text-sm text-gray-600 -mt-1 mb-1">
          {helperText}
        </p>
      )}
      <div className="flex flex-col gap-2">
        {children}
      </div>
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}
