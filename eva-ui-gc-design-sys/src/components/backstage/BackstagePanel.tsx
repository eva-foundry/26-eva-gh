import { useState, useEffect, useRef } from "react"
import { X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/useTranslation"
import { BackstageNav } from "./BackstageNav"
import { HomePanel } from "./panels/HomePanel"
import { ThemePanel } from "./panels/ThemePanel"
import { TextPanel } from "./panels/TextPanel"
import { I18nPanel } from "./panels/I18nPanel"
import { FeaturesPanel } from "./panels/FeaturesPanel"
import { DeployPanel } from "./panels/DeployPanel"
import { ImportExportPanel } from "./panels/ImportExportPanel"
import { LivePreview } from "./LivePreview"

export type BackstageSection = 
  | "home" 
  | "theme" 
  | "text" 
  | "i18n" 
  | "features" 
  | "deploy" 
  | "import-export"

interface BackstagePanelProps {
  isOpen: boolean
  onClose: () => void
}

export function BackstagePanel({ isOpen, onClose }: BackstagePanelProps) {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState<BackstageSection>("home")
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => closeButtonRef.current?.focus(), 100)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const renderPanel = () => {
    switch (activeSection) {
      case "home":
        return <HomePanel />
      case "theme":
        return <ThemePanel />
      case "text":
        return <TextPanel />
      case "i18n":
        return <I18nPanel />
      case "features":
        return <FeaturesPanel />
      case "deploy":
        return <DeployPanel />
      case "import-export":
        return <ImportExportPanel />
      default:
        return <HomePanel />
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-250"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-y-0 right-0 w-full lg:w-[90%] xl:w-[85%] bg-background z-50 shadow-2xl flex flex-col lg:flex-row animate-in slide-in-from-right duration-250"
        role="dialog"
        aria-modal="true"
        aria-labelledby="backstage-title"
      >
        <div className="w-full lg:w-[40%] xl:w-[35%] border-r border-border flex flex-col bg-muted/30">
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <h2 id="backstage-title" className="text-xl font-bold text-foreground">
              {t('backstage.title')}
            </h2>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label={t('backstage.close')}
            >
              <X size={24} weight="bold" />
            </Button>
          </div>

          <BackstageNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6 lg:p-8">
              {renderPanel()}
            </div>
          </div>

          <div className="hidden lg:block border-t border-border bg-card/50">
            <LivePreview />
          </div>
        </div>
      </div>
    </>
  )
}
