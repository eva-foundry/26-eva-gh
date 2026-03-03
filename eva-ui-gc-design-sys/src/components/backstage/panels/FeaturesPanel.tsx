import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "@/hooks/useTranslation"

export function FeaturesPanel() {
  const { t } = useTranslation()

  const features = [
    { id: "chat", labelKey: "backstage.features.chat", enabled: true, description: "backstage.features.chatDesc" },
    { id: "knowledge-spaces", labelKey: "backstage.features.knowledgeSpaces", enabled: true, description: "backstage.features.knowledgeSpacesDesc" },
    { id: "message-history", labelKey: "backstage.features.messageHistory", enabled: true, description: "backstage.features.messageHistoryDesc" },
    { id: "copy-messages", labelKey: "backstage.features.copyMessages", enabled: true, description: "backstage.features.copyMessagesDesc" },
    { id: "streaming", labelKey: "backstage.features.streaming", enabled: false, description: "backstage.features.streamingDesc" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t('backstage.features.title')}
        </h3>
        <p className="text-muted-foreground">
          {t('backstage.features.description')}
        </p>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.features.available')}
        </h4>
        <div className="space-y-4">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex-1">
                <Label htmlFor={`feature-${feature.id}`} className="text-sm font-semibold cursor-pointer">
                  {t(feature.labelKey)}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {t(feature.description)}
                </p>
              </div>
              <Switch 
                id={`feature-${feature.id}`}
                defaultChecked={feature.enabled}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          ⚠️ {t('backstage.features.warning')}
        </h4>
        <p className="text-sm text-muted-foreground">
          {t('backstage.features.warningDescription')}
        </p>
      </Card>
    </div>
  )
}
