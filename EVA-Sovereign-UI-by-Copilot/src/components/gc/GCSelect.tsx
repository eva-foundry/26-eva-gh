import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { CaretDown } from "@phosphor-icons/react"

interface GCSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface GCSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  options: GCSelectOption[]
  placeholder?: string
}

export const GCSelect = forwardRef<HTMLSelectElement, GCSelectProps>(
  ({ label, helperText, error, fullWidth = false, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const helperId = helperText ? `${selectId}-helper` : undefined
    const errorId = error ? `${selectId}-error` : undefined

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && (
          <label 
            htmlFor={selectId}
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
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-describedby={[helperId, errorId].filter(Boolean).join(' ') || undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              "px-3 py-2 pr-10 border rounded appearance-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.12_250)] focus:border-[oklch(0.45_0.12_250)] transition-colors bg-white cursor-pointer",
              error 
                ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300",
              fullWidth && "w-full",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <CaretDown 
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" 
            size={16}
          />
        </div>
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

GCSelect.displayName = "GCSelect"
