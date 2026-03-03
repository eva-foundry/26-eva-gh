import { Button } from "@/components/ui/button"
import { useKV } from "@github/spark/hooks"
import { useTranslation } from "@/hooks/useTranslation"
import { i18nService, type Locale } from "@/services/i18n"
import { Gear } from "@phosphor-icons/react"
import { useState, useEffect } from "react"

interface GCHeaderProps {
  onLanguageChange?: (lang: Locale) => void
  onCustomizeClick?: () => void
}

export function GCHeader({ onLanguageChange, onCustomizeClick }: GCHeaderProps) {
  const { t, locale } = useTranslation()
  const [, setStoredLang] = useKV<Locale>("gc-language", "en")
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const user = await window.spark.user()
        setIsOwner(user?.isOwner || false)
      } catch (error) {
        console.error("Failed to check user ownership:", error)
      }
    }
    checkOwnership()
  }, [])

  const handleLanguageToggle = (lang: Locale) => {
    i18nService.setLocale(lang)
    setStoredLang(lang)
    onLanguageChange?.(lang)
  }

  const skipToMain = () => {
    const mainContent = document.getElementById("main-content")
    mainContent?.focus()
    mainContent?.scrollIntoView()
  }

  return (
    <>
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault()
          skipToMain()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-4 focus:ring-ring"
      >
        {t('header.skip')}
      </a>
      
      <header className="border-b-4 border-primary bg-white" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="6" height="32" fill="#FF0000"/>
                  <rect x="6" width="20" height="32" fill="white"/>
                  <path d="M16 8L17 12L21 11L18 14L21 17L17 16L16 20L15 16L11 17L14 14L11 11L15 12L16 8Z" fill="#FF0000"/>
                  <rect x="26" width="6" height="32" fill="#FF0000"/>
                </svg>
                <div className="text-xl font-bold text-foreground">
                  {t('header.brand')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLanguageToggle("en")}
                  className={locale === "en" ? "font-bold" : ""}
                  aria-pressed={locale === "en"}
                  aria-label={locale === "en" ? "English (current language)" : "Switch to English"}
                >
                  {t('header.language.english')}
                </Button>
                <span className="text-muted-foreground" aria-hidden="true">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLanguageToggle("fr")}
                  className={locale === "fr" ? "font-bold" : ""}
                  aria-pressed={locale === "fr"}
                  aria-label={locale === "fr" ? "Français (langue actuelle)" : "Passer au français"}
                >
                  {t('header.language.french')}
                </Button>
              </div>
              
              {isOwner && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCustomizeClick}
                  className="gap-2"
                  aria-label={t('header.customize')}
                >
                  <Gear size={20} weight="bold" />
                  <span className="hidden sm:inline">{t('header.customize')}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
