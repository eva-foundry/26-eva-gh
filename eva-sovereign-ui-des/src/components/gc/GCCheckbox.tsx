import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { Check } from "@phosphor-icons/react"

interface GCCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  helperText?: string
  error?: string
}

export const GCCheckbox = forwardRef<HTMLInputElement, GCCheckboxProps>(
  ({ label, helperText, error, className, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const helperId = helperText ? `${checkboxId}-helper` : undefined
    const errorId = error ? `${checkboxId}-error` : undefined

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              aria-describedby={[helperId, errorId].filter(Boolean).join(' ') || undefined}
              aria-invalid={error ? true : undefined}
              className={cn(
                "peer appearance-none w-5 h-5 border-2 rounded cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[oklch(0.45_0.12_250)]",
                error 
                  ? "border-red-500" 
                  : "border-gray-400",
                "checked:bg-[oklch(0.45_0.12_250)] checked:border-[oklch(0.45_0.12_250)]",
                className
              )}
              {...props}
            />
            <Check 
              className="absolute left-0 top-0 w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
              weight="bold"
            />
          </div>
          {label && (
            <label 
              htmlFor={checkboxId}
              className="text-sm text-gray-900 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p id={helperId} className="text-sm text-gray-600 ml-7">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-red-600 ml-7" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

GCCheckbox.displayName = "GCCheckbox"
