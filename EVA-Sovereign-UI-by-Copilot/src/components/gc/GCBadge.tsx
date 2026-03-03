import { cn } from "@/lib/utils"

export type GCBadgeVariant = "default" | "info" | "success" | "warning" | "danger"

interface GCBadgeProps {
  variant?: GCBadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  default: "bg-gray-100 text-gray-800 border-gray-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
  success: "bg-green-100 text-green-800 border-green-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  danger: "bg-red-100 text-red-800 border-red-300"
}

export function GCBadge({ variant = "default", children, className }: GCBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
