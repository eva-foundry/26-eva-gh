import { cn } from "@/lib/utils"

interface GCTableColumn {
  key: string
  header: string
  render?: (value: any, row: any) => React.ReactNode
}

interface GCTableProps {
  columns: GCTableColumn[]
  data: any[]
  caption?: string
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  className?: string
}

export function GCTable({ 
  columns, 
  data, 
  caption, 
  striped = false, 
  bordered = true,
  hoverable = true,
  className 
}: GCTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table 
        className={cn(
          "w-full border-collapse",
          bordered && "border border-gray-300",
          className
        )}
      >
        {caption && (
          <caption className="sr-only">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left text-sm font-semibold text-gray-900",
                  bordered && "border-b-2 border-gray-300"
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length}
                className="px-4 py-8 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  striped && rowIndex % 2 === 0 && "bg-gray-50",
                  hoverable && "hover:bg-gray-100 transition-colors"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-sm text-gray-900",
                      bordered && "border-t border-gray-300"
                    )}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
