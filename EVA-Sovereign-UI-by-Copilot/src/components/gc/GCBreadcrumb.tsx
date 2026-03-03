import { CaretRight, House } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export interface GCBreadcrumbItem {
  label: string
  href?: string
}

interface GCBreadcrumbProps {
  items: GCBreadcrumbItem[]
  showHome?: boolean
  homeLabel?: string
  className?: string
}

export function GCBreadcrumb({ items, showHome = true, homeLabel = "Home", className }: GCBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex items-center flex-wrap gap-2">
        {showHome && (
          <>
            <li>
              <a 
                href="/"
                className="text-[oklch(0.45_0.12_250)] hover:underline focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.12_250)] rounded inline-flex items-center gap-1"
              >
                <House size={16} />
                <span>{homeLabel}</span>
              </a>
            </li>
            {items.length > 0 && (
              <li aria-hidden="true">
                <CaretRight size={16} className="text-gray-500" />
              </li>
            )}
          </>
        )}
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <a 
                href={item.href}
                className="text-[oklch(0.45_0.12_250)] hover:underline focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.12_250)] rounded"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-700 font-semibold" aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <CaretRight size={16} className="text-gray-500" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
