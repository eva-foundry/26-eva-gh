import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface GCInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
}

export const GCInput = forwardRef<HTMLInputElement, GCInputProps>(
  ({ label, helperText, error, fullWidth = false, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-semibold text-gray-900"
          >
            {label}
            {props.required && <span className="text-red-600 ml-1" aria-label="required">*</span>}
          </label>
        )}
        {helperText && (
          <p id={helperId} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={[helperId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            "px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.12_250)] focus:border-[oklch(0.45_0.12_250)] transition-colors",
            error 
              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
              : "border-gray-300",
            fullWidth && "w-full",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

GCInput.displayName = "GCInput"
