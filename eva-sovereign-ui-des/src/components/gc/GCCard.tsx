import { cn } from "@/lib/utils"

interface GCCardProps {
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  variant?: "default" | "bordered" | "elevated"
}

const variantStyles = {
  default: "bg-white border border-gray-200",
  bordered: "bg-white border-2 border-[oklch(0.45_0.12_250)]",
  elevated: "bg-white shadow-lg"
}

export function GCCard({ title, children, footer, className, variant = "default" }: GCCardProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden", variantStyles[variant], className)}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  )
}
