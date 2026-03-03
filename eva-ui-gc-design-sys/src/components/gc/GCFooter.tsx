import { useTranslation } from "@/hooks/useTranslation"

export function GCFooter() {
  const { t, locale } = useTranslation()
  
  const dateModified = new Date().toLocaleDateString(
    locale === "en" ? "en-CA" : "fr-CA",
    { year: "numeric", month: "long", day: "numeric" }
  )

  const topicLinks = [
    { labelKey: "footer.topics.jobs", href: "#" },
    { labelKey: "footer.topics.immigration", href: "#" },
    { labelKey: "footer.topics.travel", href: "#" },
    { labelKey: "footer.topics.business", href: "#" },
    { labelKey: "footer.topics.benefits", href: "#" },
    { labelKey: "footer.topics.health", href: "#" },
    { labelKey: "footer.topics.taxes", href: "#" },
    { labelKey: "footer.topics.environment", href: "#" },
  ]

  const corporateLinks = [
    { labelKey: "footer.corporate.social", href: "#" },
    { labelKey: "footer.corporate.mobile", href: "#" },
    { labelKey: "footer.corporate.about", href: "#" },
    { labelKey: "footer.corporate.terms", href: "#" },
    { labelKey: "footer.corporate.privacy", href: "#" },
  ]

  return (
    <footer className="border-t bg-muted mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <nav aria-label={t('footer.topics.title')}>
            <h2 className="text-lg font-bold text-foreground mb-4">
              {t('footer.brand')}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {topicLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border py-6">
          <nav aria-label={locale === "en" ? "Footer links" : "Liens du pied de page"}>
            <ul className="flex flex-wrap gap-6 text-sm">
              {corporateLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="6" height="32" fill="currentColor"/>
                <rect x="6" width="20" height="32" fill="currentColor" opacity="0.3"/>
                <path d="M16 8L17 12L21 11L18 14L21 17L17 16L16 20L15 16L11 17L14 14L11 11L15 12L16 8Z" fill="currentColor"/>
                <rect x="26" width="6" height="32" fill="currentColor"/>
              </svg>
              <span className="font-semibold">
                {t('footer.brand')}
              </span>
            </div>
            <p>
              {t('footer.modified')}: <time dateTime={new Date().toISOString().split('T')[0]}>{dateModified}</time>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
