import { House, Palette, TextAa, Globe, Lightning, Rocket, ArrowsLeftRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/hooks/useTranslation"
import type { BackstageSection } from "./BackstagePanel"

interface BackstageNavProps {
  activeSection: BackstageSection
  onSectionChange: (section: BackstageSection) => void
}

interface NavItem {
  id: BackstageSection
  labelKey: string
  icon: React.ReactNode
}

export function BackstageNav({ activeSection, onSectionChange }: BackstageNavProps) {
  const { t } = useTranslation()

  const navItems: NavItem[] = [
    { id: "home", labelKey: "backstage.nav.home", icon: <House size={20} weight="bold" /> },
    { id: "theme", labelKey: "backstage.nav.theme", icon: <Palette size={20} weight="bold" /> },
    { id: "text", labelKey: "backstage.nav.text", icon: <TextAa size={20} weight="bold" /> },
    { id: "i18n", labelKey: "backstage.nav.i18n", icon: <Globe size={20} weight="bold" /> },
    { id: "features", labelKey: "backstage.nav.features", icon: <Lightning size={20} weight="bold" /> },
    { id: "deploy", labelKey: "backstage.nav.deploy", icon: <Rocket size={20} weight="bold" /> },
    { id: "import-export", labelKey: "backstage.nav.importExport", icon: <ArrowsLeftRight size={20} weight="bold" /> },
  ]

  return (
    <nav className="flex-1 overflow-y-auto p-4" aria-label={t('backstage.navigation')}>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.id}>
            <Button
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                activeSection === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
              onClick={() => onSectionChange(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.icon}
              <span className="font-semibold">{t(item.labelKey)}</span>
            </Button>
          </li>
        ))}
      </ul>

      <Separator className="my-6" />

      <div className="space-y-2">
        <Button variant="default" className="w-full" size="lg">
          {t('backstage.actions.save')}
        </Button>
        <Button variant="outline" className="w-full">
          {t('backstage.actions.reset')}
        </Button>
      </div>
    </nav>
  )
}
