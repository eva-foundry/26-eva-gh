import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload, ArrowCounterClockwise } from "@phosphor-icons/react"
import { useTranslation } from "@/hooks/useTranslation"
import { useKV } from "@github/spark/hooks"

export function HomePanel() {
  const { t } = useTranslation()
  const [selectedSpace] = useKV<string>("selected-knowledge-space", "general")
  const [messages] = useKV<any[]>("chat-messages", [])

  const configSummary = {
    theme: "Government of Canada (Default)",
    languages: "EN-CA, FR-CA",
    featuresEnabled: 3,
    knowledgeSpace: selectedSpace,
    messageCount: messages?.length || 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t('backstage.home.welcome')}
        </h3>
        <p className="text-muted-foreground">
          {t('backstage.home.description')}
        </p>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.home.currentConfig')}
        </h4>
        <dl className="space-y-3">
          <div className="flex justify-between items-center">
            <dt className="text-sm font-medium text-muted-foreground">
              {t('backstage.home.theme')}
            </dt>
            <dd className="text-sm text-foreground font-semibold">
              {configSummary.theme}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-sm font-medium text-muted-foreground">
              {t('backstage.home.languages')}
            </dt>
            <dd className="text-sm text-foreground font-semibold">
              {configSummary.languages}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-sm font-medium text-muted-foreground">
              {t('backstage.home.features')}
            </dt>
            <dd className="text-sm text-foreground font-semibold">
              {configSummary.featuresEnabled} {t('backstage.home.enabled')}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-sm font-medium text-muted-foreground">
              {t('backstage.home.knowledgeSpace')}
            </dt>
            <dd className="text-sm text-foreground font-semibold">
              {configSummary.knowledgeSpace}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-sm font-medium text-muted-foreground">
              {t('backstage.home.messages')}
            </dt>
            <dd className="text-sm text-foreground font-semibold">
              {configSummary.messageCount}
            </dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.home.quickActions')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Download size={20} weight="bold" />
            {t('backstage.home.exportConfig')}
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Upload size={20} weight="bold" />
            {t('backstage.home.importConfig')}
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 sm:col-span-2">
            <ArrowCounterClockwise size={20} weight="bold" />
            {t('backstage.home.resetDefaults')}
          </Button>
        </div>
      </Card>
    </div>
  )
}
