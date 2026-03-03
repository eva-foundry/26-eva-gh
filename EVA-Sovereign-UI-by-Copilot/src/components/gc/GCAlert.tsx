import { Info, Warning, CheckCircle, XCircle, X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type GCAlertVariant = "info" | "success" | "warning" | "danger"

interface GCAlertProps {
  variant?: GCAlertVariant
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const variantStyles = {
  info: {
    container: "bg-blue-50 border-blue-400 text-blue-900",
    icon: "text-blue-600",
    IconComponent: Info
  },
  success: {
    container: "bg-green-50 border-green-400 text-green-900",
    icon: "text-green-600",
    IconComponent: CheckCircle
  },
  warning: {
    container: "bg-yellow-50 border-yellow-400 text-yellow-900",
    icon: "text-yellow-600",
    IconComponent: Warning
  },
  danger: {
    container: "bg-red-50 border-red-400 text-red-900",
    icon: "text-red-600",
    IconComponent: XCircle
  }
}

export function GCAlert({ 
  variant = "info", 
  title, 
  children, 
  dismissible = false,
  onDismiss,
  className 
}: GCAlertProps) {
  const styles = variantStyles[variant]
  const Icon = styles.IconComponent

  return (
    <div 
      className={cn(
        "border-l-4 p-4 rounded-sm flex gap-3 relative",
        styles.container,
        className
      )}
      role="alert"
    >
      <Icon className={cn("flex-shrink-0", styles.icon)} size={24} weight="fill" />
      <div className="flex-1">
        {title && (
          <div className="font-bold mb-1">{title}</div>
        )}
        <div>{children}</div>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
