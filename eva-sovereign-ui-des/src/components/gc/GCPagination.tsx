import { cn } from "@/lib/utils"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

interface GCPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisible?: number
  className?: string
}

export function GCPagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxVisible = 5,
  className 
}: GCPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const leftSide = Math.floor(maxVisible / 2)
      const rightSide = maxVisible - leftSide - 1
      
      if (currentPage <= leftSide + 1) {
        for (let i = 1; i <= maxVisible - 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - rightSide) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - maxVisible + 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - leftSide + 1; i <= currentPage + rightSide - 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <nav 
      aria-label="Pagination" 
      className={cn("flex items-center gap-1", className)}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.12_250)] transition-colors"
        aria-label="Previous page"
      >
        <CaretLeft size={16} />
      </button>
      
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              "px-3 py-2 rounded border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.12_250)]",
              page === currentPage
                ? "bg-[oklch(0.45_0.12_250)] text-white border-[oklch(0.45_0.12_250)]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 py-2 text-gray-500">
            {page}
          </span>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.12_250)] transition-colors"
        aria-label="Next page"
      >
        <CaretRight size={16} />
      </button>
    </nav>
  )
}
