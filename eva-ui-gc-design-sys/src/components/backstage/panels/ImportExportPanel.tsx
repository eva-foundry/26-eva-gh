import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Upload, Copy } from "@phosphor-icons/react"
import { useTranslation } from "@/hooks/useTranslation"
import { toast } from "sonner"

export function ImportExportPanel() {
  const { t } = useTranslation()

  const handleExportConfig = () => {
    const config = {
      version: "1.0",
      theme: {
        primary: "oklch(0.42 0.15 251)",
        fonts: ["Lato", "Noto Sans"]
      },
      features: {
        chat: true,
        knowledgeSpaces: true,
        messageHistory: true
      },
      i18n: {
        defaultLocale: "en-CA",
        supportedLocales: ["en-CA", "fr-CA"]
      }
    }

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "eva-config.json"
    a.click()
    URL.revokeObjectURL(url)
    toast.success(t('backstage.importExport.exportSuccess'))
  }

  const handleCopyConfig = () => {
    const config = {
      version: "1.0",
      theme: {
        primary: "oklch(0.42 0.15 251)",
        fonts: ["Lato", "Noto Sans"]
      }
    }
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    toast.success(t('backstage.importExport.copiedToClipboard'))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t('backstage.importExport.title')}
        </h3>
        <p className="text-muted-foreground">
          {t('backstage.importExport.description')}
        </p>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.importExport.exportConfig')}
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          {t('backstage.importExport.exportDescription')}
        </p>
        <div className="flex gap-2">
          <Button onClick={handleExportConfig} className="flex-1 gap-2">
            <Download size={20} weight="bold" />
            {t('backstage.importExport.downloadJson')}
          </Button>
          <Button onClick={handleCopyConfig} variant="outline" className="gap-2">
            <Copy size={20} weight="bold" />
            {t('backstage.importExport.copy')}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.importExport.importConfig')}
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          {t('backstage.importExport.importDescription')}
        </p>
        <Textarea
          placeholder={t('backstage.importExport.pasteJsonHere')}
          rows={8}
          className="font-mono text-sm mb-3"
        />
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2">
            <Upload size={20} weight="bold" />
            {t('backstage.importExport.uploadFile')}
          </Button>
          <Button variant="default" className="flex-1">
            {t('backstage.importExport.applyConfig')}
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          ⚠️ {t('backstage.importExport.warning')}
        </h4>
        <p className="text-sm text-muted-foreground">
          {t('backstage.importExport.warningDescription')}
        </p>
      </Card>
    </div>
  )
}
