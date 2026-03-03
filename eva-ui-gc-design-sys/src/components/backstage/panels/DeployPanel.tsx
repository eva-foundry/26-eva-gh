import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Warning } from "@phosphor-icons/react"
import { useTranslation } from "@/hooks/useTranslation"

export function DeployPanel() {
  const { t } = useTranslation()

  const deploymentChecks = [
    { id: "accessibility", labelKey: "backstage.deploy.checks.accessibility", status: "pass" },
    { id: "i18n", labelKey: "backstage.deploy.checks.i18n", status: "pass" },
    { id: "design-system", labelKey: "backstage.deploy.checks.designSystem", status: "pass" },
    { id: "api-connection", labelKey: "backstage.deploy.checks.apiConnection", status: "warning" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t('backstage.deploy.title')}
        </h3>
        <p className="text-muted-foreground">
          {t('backstage.deploy.description')}
        </p>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.deploy.preDeploymentChecks')}
        </h4>
        <div className="space-y-3">
          {deploymentChecks.map((check) => (
            <div 
              key={check.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {check.status === "pass" ? (
                  <CheckCircle size={24} weight="fill" className="text-green-600" />
                ) : (
                  <Warning size={24} weight="fill" className="text-yellow-600" />
                )}
                <span className="text-sm font-medium text-foreground">
                  {t(check.labelKey)}
                </span>
              </div>
              <Badge variant={check.status === "pass" ? "default" : "secondary"} className={check.status === "pass" ? "bg-green-600" : "bg-yellow-600"}>
                {check.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.deploy.deploymentActions')}
        </h4>
        <div className="space-y-3">
          <Button variant="default" className="w-full" size="lg">
            {t('backstage.deploy.deployProduction')}
          </Button>
          <Button variant="outline" className="w-full">
            {t('backstage.deploy.deployStaging')}
          </Button>
          <Button variant="outline" className="w-full">
            {t('backstage.deploy.runTests')}
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          ℹ️ {t('backstage.deploy.info')}
        </h4>
        <p className="text-sm text-muted-foreground">
          {t('backstage.deploy.infoDescription')}
        </p>
      </Card>
    </div>
  )
}
