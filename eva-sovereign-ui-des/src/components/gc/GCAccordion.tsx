import { cn } from "@/lib/utils"
import { CaretDown } from "@phosphor-icons/react"
import { useState } from "react"

interface GCAccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface GCAccordionProps {
  items: GCAccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export function GCAccordion({ items, allowMultiple = false, className }: GCAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    } else {
      setOpenItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      )
    }
  }

  return (
    <div className={cn("w-full border border-gray-300 divide-y divide-gray-300", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        
        return (
          <div key={item.id}>
            <h3>
              <button
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`accordion-${item.id}`}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[oklch(0.45_0.12_250)] transition-colors"
              >
                <span>{item.title}</span>
                <CaretDown
                  size={20}
                  className={cn(
                    "transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={`panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-${item.id}`}
              hidden={!isOpen}
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "block" : "hidden"
              )}
            >
              <div className="px-4 py-3 bg-gray-50">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
