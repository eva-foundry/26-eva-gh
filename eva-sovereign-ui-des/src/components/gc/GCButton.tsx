import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export type GCButtonVariant = "primary" | "secondary" | "supertask" | "danger" | "link"
export type GCButtonSize = "small" | "default" | "large"

interface GCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GCButtonVariant
  size?: GCButtonSize
  fullWidth?: boolean
}

const variantStyles = {
  primary: "bg-[oklch(0.45_0.12_250)] text-white hover:bg-[oklch(0.35_0.12_250)] focus:ring-[oklch(0.45_0.12_250)]",
  secondary: "bg-white text-[oklch(0.45_0.12_250)] border-2 border-[oklch(0.45_0.12_250)] hover:bg-[oklch(0.95_0.02_250)] focus:ring-[oklch(0.45_0.12_250)]",
  supertask: "bg-[oklch(0.50_0.20_25)] text-white hover:bg-[oklch(0.40_0.20_25)] focus:ring-[oklch(0.50_0.20_25)]",
  danger: "bg-[oklch(0.55_0.22_25)] text-white hover:bg-[oklch(0.45_0.22_25)] focus:ring-[oklch(0.55_0.22_25)]",
  link: "bg-transparent text-[oklch(0.45_0.12_250)] underline hover:text-[oklch(0.35_0.12_250)] focus:ring-[oklch(0.45_0.12_250)] p-0"
}

const sizeStyles = {
  small: "px-3 py-1.5 text-sm",
  default: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg"
}

export const GCButton = forwardRef<HTMLButtonElement, GCButtonProps>(
  ({ variant = "primary", size = "default", fullWidth = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

GCButton.displayName = "GCButton"
