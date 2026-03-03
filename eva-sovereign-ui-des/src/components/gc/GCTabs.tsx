import { cn } from "@/lib/utils"

interface GCTabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface GCTabsProps {
  tabs: GCTabItem[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  className?: string
}

export function GCTabs({ tabs, activeTab, onTabChange, className }: GCTabsProps) {
  const currentTab = activeTab || tabs[0]?.id

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div 
        role="tablist" 
        className="flex border-b-2 border-gray-300"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={currentTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "px-6 py-3 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[oklch(0.45_0.12_250)] -mb-0.5",
              currentTab === tab.id
                ? "border-b-4 border-[oklch(0.45_0.12_250)] text-[oklch(0.45_0.12_250)]"
                : "text-gray-600 hover:text-gray-900 hover:border-b-4 hover:border-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={currentTab !== tab.id}
          className="py-4"
        >
          {currentTab === tab.id && tab.content}
        </div>
      ))}
    </div>
  )
}
