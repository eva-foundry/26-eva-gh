import { useTranslation } from "@/hooks/useTranslation"

export function LivePreview() {
  const { t } = useTranslation()

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t('backstage.preview.title')}
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">{t('backstage.preview.live')}</span>
        </div>
      </div>
      
      <div className="bg-muted rounded-lg p-4 border border-border min-h-[200px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">
          {t('backstage.preview.description')}
        </p>
      </div>
    </div>
  )
}
