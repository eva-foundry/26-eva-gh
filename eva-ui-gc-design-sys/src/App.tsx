import { useEffect, useState } from "react"
import { GCHeader } from "@/components/gc/GCHeader"
import { GCFooter } from "@/components/gc/GCFooter"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { BackstagePanel } from "@/components/backstage/BackstagePanel"
import { Toaster } from "@/components/ui/sonner"
import { initializeI18n, i18nService, type Locale } from "@/services/i18n"
import { useKV } from "@github/spark/hooks"

function App() {
  const [storedLang] = useKV<Locale>("gc-language", "en")
  const [isBackstageOpen, setIsBackstageOpen] = useState(false)

  useEffect(() => {
    const init = async () => {
      await initializeI18n(storedLang || "en")
    }
    init()
  }, [storedLang])

  const handleLanguageChange = (lang: Locale) => {
    i18nService.setLocale(lang)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GCHeader 
        onLanguageChange={handleLanguageChange}
        onCustomizeClick={() => setIsBackstageOpen(true)}
      />
      
      <main 
        id="main-content" 
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12"
        tabIndex={-1}
      >
        <ChatPanel />
      </main>

      <GCFooter />
      <BackstagePanel 
        isOpen={isBackstageOpen}
        onClose={() => setIsBackstageOpen(false)}
      />
      <Toaster />
    </div>
  )
}

export default App