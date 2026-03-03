import { cn } from "@/lib/utils"

interface GCProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: "small" | "default" | "large"
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
}

const sizeStyles = {
  small: "h-2",
  default: "h-3",
  large: "h-4"
}

const variantStyles = {
  default: "bg-[oklch(0.45_0.12_250)]",
  success: "bg-green-600",
  warning: "bg-yellow-600",
  danger: "bg-red-600"
}

export function GCProgressBar({ 
  value, 
  max = 100, 
  label, 
  showPercentage = false,
  size = "default",
  variant = "default",
  className 
}: GCProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const progressId = `progress-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-semibold text-gray-900" id={progressId}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div 
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-labelledby={label ? progressId : undefined}
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out rounded-full",
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
