import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/hooks/useTranslation"

export function TextPanel() {
  const { t } = useTranslation()

  const textOverrides = [
    { id: "app-title", labelKey: "backstage.text.appTitle", value: "EVA - Enterprise Virtual Assistant" },
    { id: "app-subtitle", labelKey: "backstage.text.appSubtitle", value: "Government of Canada RAG Chat Interface" },
    { id: "welcome-message", labelKey: "backstage.text.welcomeMessage", value: "Welcome to EVA. How can I assist you today?" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t('backstage.text.title')}
        </h3>
        <p className="text-muted-foreground">
          {t('backstage.text.description')}
        </p>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.text.overrides')}
        </h4>
        <div className="space-y-4">
          {textOverrides.slice(0, 2).map((override) => (
            <div key={override.id} className="space-y-2">
              <Label htmlFor={override.id} className="text-sm font-medium">
                {t(override.labelKey)}
              </Label>
              <Input 
                id={override.id}
                defaultValue={override.value}
                placeholder={override.value}
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="welcome-message" className="text-sm font-medium">
              {t('backstage.text.welcomeMessage')}
            </Label>
            <Textarea 
              id="welcome-message"
              defaultValue={textOverrides[2].value}
              placeholder={textOverrides[2].value}
              rows={3}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          💡 {t('backstage.text.tip')}
        </h4>
        <p className="text-sm text-muted-foreground">
          {t('backstage.text.tipDescription')}
        </p>
      </Card>
    </div>
  )
}
