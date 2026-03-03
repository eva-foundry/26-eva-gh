import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "@phosphor-icons/react"
import { useTranslation } from "@/hooks/useTranslation"

export function I18nPanel() {
  const { t, locale } = useTranslation()

  const supportedLocales = [
    { code: "en-CA", name: "English (Canada)", coverage: 100, status: "complete" },
    { code: "fr-CA", name: "Français (Canada)", coverage: 100, status: "complete" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t('backstage.i18n.title')}
        </h3>
        <p className="text-muted-foreground">
          {t('backstage.i18n.description')}
        </p>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.i18n.supportedLanguages')}
        </h4>
        <div className="space-y-3">
          {supportedLocales.map((loc) => (
            <div 
              key={loc.code}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle size={24} weight="fill" className="text-green-600" />
                <div>
                  <div className="font-semibold text-foreground">{loc.name}</div>
                  <div className="text-xs text-muted-foreground">{loc.code}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {loc.coverage}%
                </span>
                <Badge variant="default" className="bg-green-600">
                  {loc.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.i18n.currentLanguage')}
        </h4>
        <div className="flex items-center gap-3 p-4 bg-primary/10 border-2 border-primary rounded-lg">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">
              {locale === "en" ? "EN" : "FR"}
            </span>
          </div>
          <div>
            <div className="font-semibold text-foreground">
              {locale === "en" ? "English (Canada)" : "Français (Canada)"}
            </div>
            <div className="text-sm text-muted-foreground">
              {t('backstage.i18n.activeLanguage')}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          📌 {t('backstage.i18n.note')}
        </h4>
        <p className="text-sm text-muted-foreground">
          {t('backstage.i18n.noteDescription')}
        </p>
      </Card>
    </div>
  )
}
