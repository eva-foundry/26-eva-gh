import { useState, useEffect } from 'react';
import { GCHeader } from '@/components/eva/GCHeader';
import { GCFooter } from '@/components/eva/GCFooter';
import { LanguageSwitcher } from '@/components/eva/LanguageSwitcher';
import { GCComponentsShowcase } from '@/components/gc/templates/GCComponentsShowcase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, CheckCircle } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n/use-i18n';
import { sovereignProfiles } from '@/lib/tokens/sovereign-profiles';

type ProfileId = 'canada_gc' | 'usa_gov' | 'uk_gov' | 'australia_gov' | 'nz_gov' | 'spain_gov' | 'italy_gov' | 'germany_gov';

export function DeveloperKitDemo() {
  const { locale, setLocale, formatDate, formatNumber, formatCurrency } = useI18n();
  const [currentProfile, setCurrentProfile] = useState<ProfileId>('canada_gc');

  const profile = sovereignProfiles[currentProfile];

  useEffect(() => {
    if (!profile.availableLocales.includes(locale)) {
      setLocale(profile.defaultLocale);
    }
  }, [currentProfile]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GCHeader appName="EVA-Sovereign-UI Developer Kit" profile={currentProfile}>
        <LanguageSwitcher
          currentLocale={locale}
          availableLocales={profile.availableLocales}
          onLocaleChange={setLocale}
        />
      </GCHeader>

      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b">
          <div className="container mx-auto px-6 py-12">
            <Badge className="mb-4">v1.0.0</Badge>
            <h1 className="text-5xl font-bold mb-4">EVA-Sovereign-UI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A production-ready, accessible design system for government applications.
              Featuring GC Design System compliance, WCAG 2.2 AAA accessibility, and multilingual support.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 space-y-12">
          
          <section aria-labelledby="profile-heading">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Globe size={24} weight="duotone" className="text-primary" />
                  Country Profile Selector
                </CardTitle>
                <CardDescription>
                  Switch between government themes to see official branding and styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={currentProfile} onValueChange={(value) => setCurrentProfile(value as ProfileId)}>
                  <SelectTrigger className="w-full md:w-80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(sovereignProfiles).map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.flag} {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Current Profile:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{profile.flag}</span>
                    <div>
                      <p className="font-bold">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">{profile.legalText}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-1">Available Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.availableLocales.map((loc) => (
                        <Badge key={loc} variant="secondary">{loc}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="accessibility-heading">
            <Alert className="border-green-600 bg-green-50">
              <CheckCircle size={20} weight="fill" className="text-green-600" />
              <AlertTitle>WCAG 2.2 Level AAA Compliant</AlertTitle>
              <AlertDescription>
                All components meet the highest accessibility standards with 7:1 contrast ratios,
                full keyboard navigation, and comprehensive ARIA support.
              </AlertDescription>
            </Alert>
          </section>

          <section aria-labelledby="i18n-heading">
            <Card>
              <CardHeader>
                <CardTitle>Internationalization</CardTitle>
                <CardDescription>Multi-language support with formatters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Current Locale: <Badge variant="secondary">{locale}</Badge></h4>
                </div>

                <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold">Format Examples</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date (Long):</p>
                      <p className="font-mono">{formatDate(new Date(), 'long')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date (Short):</p>
                      <p className="font-mono">{formatDate(new Date(), 'short')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Number:</p>
                      <p className="font-mono">{formatNumber(1234567.89)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Currency:</p>
                      <p className="font-mono">{formatCurrency(1250.50, 'CAD')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="components-heading">
            <GCComponentsShowcase />
          </section>

        </div>
      </main>

      <GCFooter profile={currentProfile} />
    </div>
  );
}
