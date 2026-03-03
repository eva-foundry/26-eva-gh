import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/useTranslation"

export function ThemePanel() {
  const { t } = useTranslation()

  const colorTokens = [
    { 
      name: "Primary", 
      value: "oklch(0.42 0.15 251)", 
      contrast: "8.2:1", 
      wcag: "AAA" 
    },
    { 
      name: "Secondary", 
      value: "oklch(0.96 0.005 251)", 
      contrast: "1.2:1", 
      wcag: "N/A" 
    },
    { 
      name: "Foreground", 
      value: "oklch(0.24 0.01 251)", 
      contrast: "14.1:1", 
      wcag: "AAA" 
    },
    { 
      name: "Destructive", 
      value: "oklch(0.48 0.21 27)", 
      contrast: "7.3:1", 
      wcag: "AAA" 
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t('backstage.theme.title')}
        </h3>
        <p className="text-muted-foreground">
          {t('backstage.theme.description')}
        </p>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.theme.colors')}
        </h4>
        <div className="space-y-4">
          {colorTokens.map((token) => (
            <div key={token.name} className="space-y-2">
              <Label htmlFor={`color-${token.name.toLowerCase()}`} className="text-sm font-medium">
                {token.name}
              </Label>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded border-2 border-border flex-shrink-0"
                  style={{ backgroundColor: token.value }}
                  aria-label={`${token.name} color swatch`}
                />
                <div className="flex-1">
                  <Input 
                    id={`color-${token.name.toLowerCase()}`}
                    value={token.value}
                    readOnly
                    className="font-mono text-sm"
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground">
                    {token.contrast}
                  </span>
                  <Badge variant={token.wcag === "AAA" ? "default" : "secondary"} className="text-xs">
                    WCAG {token.wcag}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.theme.typography')}
        </h4>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">
              {t('backstage.theme.primaryFont')}
            </Label>
            <Input value="Lato" readOnly />
            <p className="text-xs text-muted-foreground mt-1">
              {t('backstage.theme.primaryFontDesc')}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">
              {t('backstage.theme.secondaryFont')}
            </Label>
            <Input value="Noto Sans" readOnly />
            <p className="text-xs text-muted-foreground mt-1">
              {t('backstage.theme.secondaryFontDesc')}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          {t('backstage.theme.spacing')}
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Border Radius</span>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded">0.5rem</code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Base Spacing Unit</span>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded">4px</code>
          </div>
        </div>
      </Card>
    </div>
  )
}
