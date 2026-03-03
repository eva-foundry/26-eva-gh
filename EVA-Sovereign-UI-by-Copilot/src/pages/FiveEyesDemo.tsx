import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { GCHeader } from '@/components/eva/GCHeader';
import { GCFooter } from '@/components/eva/GCFooter';
import { LanguageSwitcher } from '@/components/eva/LanguageSwitcher';
import { ProgramCard } from '@/components/eva/ProgramCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Globe, Flag, Calendar, CurrencyDollar, Info, Buildings, Layout } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n/use-i18n';
import { sovereignProfiles, type SovereignProfileId } from '@/lib/sovereign-profiles';

type GCProfile = 'canada_gc' | 'usa_gov' | 'uk_gov' | 'australia_gov' | 'nz_gov';

type CountryConfig = {
  id: SovereignProfileId;
  gcProfile: GCProfile;
  name: string;
  locales: string[];
  currency: string;
  flag: string;
};

const fiveEyesCountries: CountryConfig[] = [
  {
    id: 'canada_gc_intranet',
    gcProfile: 'canada_gc',
    name: 'Canada',
    locales: ['en-CA', 'fr-CA'],
    currency: 'CAD',
    flag: '🇨🇦',
  },
  {
    id: 'us_gov_internal',
    gcProfile: 'usa_gov',
    name: 'United States',
    locales: ['en-US', 'es-US'],
    currency: 'USD',
    flag: '🇺🇸',
  },
  {
    id: 'uk_gov_internal',
    gcProfile: 'uk_gov',
    name: 'United Kingdom',
    locales: ['en-GB'],
    currency: 'GBP',
    flag: '🇬🇧',
  },
  {
    id: 'australia_gov_internal',
    gcProfile: 'australia_gov',
    name: 'Australia',
    locales: ['en-AU'],
    currency: 'AUD',
    flag: '🇦🇺',
  },
  {
    id: 'new_zealand_gov_internal',
    gcProfile: 'nz_gov',
    name: 'New Zealand',
    locales: ['en-NZ'],
    currency: 'NZD',
    flag: '🇳🇿',
  },
];

interface FiveEyesDemoProps {
  onNavigateToESDC?: () => void;
  onNavigateToGuide?: () => void;
}

export function FiveEyesDemo({ onNavigateToESDC, onNavigateToGuide }: FiveEyesDemoProps = {}) {
  const { locale, setLocale, t, formatDate, formatNumber, formatCurrency } = useI18n();
  const [selectedCountry, setSelectedCountry] = useKV<SovereignProfileId>('five-eyes-country', 'canada_gc_intranet');
  const [persistedLocale, setPersistedLocale] = useKV<string>('five-eyes-locale', 'en-CA');

  const currentCountry = fiveEyesCountries.find(c => c.id === selectedCountry) || fiveEyesCountries[0];
  const currentProfile = sovereignProfiles[selectedCountry || 'canada_gc_intranet'];

  useEffect(() => {
    if (persistedLocale && persistedLocale !== locale) {
      setLocale(persistedLocale);
    }
  }, []);

  const handleCountryChange = (countryId: SovereignProfileId) => {
    setSelectedCountry(countryId);
    const country = fiveEyesCountries.find(c => c.id === countryId);
    if (country && country.locales.length > 0) {
      const newLocale = country.locales[0];
      setLocale(newLocale);
      setPersistedLocale(newLocale);
    }
  };

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    setPersistedLocale(newLocale);
  };

  const sampleDate = new Date(2024, 11, 25);
  const sampleNumber = 1234567.89;
  const sampleAmount = 45678.90;

  const programs = [
    {
      icon: '💼',
      titleKey: 'esdc.programs.ei.title',
      descKey: 'esdc.programs.ei.description',
    },
    {
      icon: '🧓',
      titleKey: 'esdc.programs.oas.title',
      descKey: 'esdc.programs.oas.description',
    },
    {
      icon: '💰',
      titleKey: 'esdc.programs.cpp.title',
      descKey: 'esdc.programs.cpp.description',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        {t('navigation.skipToMain')}
      </a>

      <GCHeader appName="Five Eyes Alliance Demo" profile={currentCountry.gcProfile}>
        <div className="flex items-center gap-3">
          {onNavigateToGuide && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToGuide}
              className="flex items-center gap-2"
            >
              <Layout size={18} weight="duotone" />
              <span className="hidden sm:inline">Compliance Guide</span>
            </Button>
          )}
          {onNavigateToESDC && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToESDC}
              className="flex items-center gap-2"
            >
              <Buildings size={18} weight="duotone" />
              <span className="hidden sm:inline">ESDC Demo</span>
            </Button>
          )}
          <LanguageSwitcher
            currentLocale={locale}
            availableLocales={currentCountry.locales}
            onLocaleChange={handleLocaleChange}
          />
        </div>
      </GCHeader>

      <main id="main-content" className="flex-1">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
          <div className="container mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={48} weight="duotone" className="text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                Five Eyes Alliance
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Demonstrating international design system coordination with localized content and regional formatting
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 space-y-12">
          <section aria-labelledby="country-selector">
            <h2 id="country-selector" className="text-3xl font-bold mb-6">
              Select Country
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {fiveEyesCountries.map((country) => (
                <Card
                  key={country.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedCountry === country.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleCountryChange(country.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl" aria-hidden="true">{country.flag}</span>
                      {selectedCountry === country.id && (
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{country.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {country.locales.length} locale{country.locales.length > 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <Alert>
            <Info size={20} weight="duotone" />
            <AlertTitle>Current Configuration</AlertTitle>
            <AlertDescription className="space-y-2 mt-2">
              <div className="flex items-center gap-2">
                <Flag size={16} weight="duotone" />
                <span className="font-medium">Country:</span> {currentCountry.name}
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} weight="duotone" />
                <span className="font-medium">Locale:</span> {locale}
              </div>
              <div className="flex items-center gap-2">
                <CurrencyDollar size={16} weight="duotone" />
                <span className="font-medium">Currency:</span> {currentCountry.currency}
              </div>
            </AlertDescription>
          </Alert>

          <section aria-labelledby="regional-formatting">
            <h2 id="regional-formatting" className="text-3xl font-bold mb-6">
              Regional Formatting Demo
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={24} weight="duotone" className="text-primary" />
                    <CardTitle>Date Format</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Short format:</p>
                    <p className="font-mono text-lg">{formatDate(sampleDate, 'short')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Medium format:</p>
                    <p className="font-mono text-lg">{formatDate(sampleDate, 'medium')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Long format:</p>
                    <p className="font-mono text-lg">{formatDate(sampleDate, 'long')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">🔢</span>
                    <CardTitle>Number Format</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Standard:</p>
                    <p className="font-mono text-lg">{formatNumber(sampleNumber)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Percentage:</p>
                    <p className="font-mono text-lg">
                      {formatNumber(0.1234, { style: 'percent', maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Decimal places:</p>
                    <p className="font-mono text-lg">
                      {formatNumber(sampleNumber, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <CurrencyDollar size={24} weight="duotone" className="text-primary" />
                    <CardTitle>Currency Format</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Local currency:</p>
                    <p className="font-mono text-lg">{formatCurrency(sampleAmount, currentCountry.currency)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Small amount:</p>
                    <p className="font-mono text-lg">{formatCurrency(99.99, currentCountry.currency)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Large amount:</p>
                    <p className="font-mono text-lg">{formatCurrency(9876543.21, currentCountry.currency)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section aria-labelledby="localized-content">
            <h2 id="localized-content" className="text-3xl font-bold mb-6">
              {t('esdc.programs.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              Content automatically adapts to the selected country and language
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard
                  key={program.titleKey}
                  icon={program.icon}
                  title={t(program.titleKey)}
                  description={t(program.descKey)}
                  linkText={t('common.learnMore')}
                  onLearnMore={() => {}}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="design-system">
            <h2 id="design-system" className="text-3xl font-bold mb-6">
              Design System Theme
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>{currentProfile.name}</CardTitle>
                <CardDescription>{currentProfile.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-3">Color Palette:</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="space-y-1">
                        <div
                          className="w-20 h-20 rounded border shadow-sm"
                          style={{ backgroundColor: currentProfile.colors.primary }}
                        />
                        <p className="text-xs text-center text-muted-foreground">Primary</p>
                      </div>
                      <div className="space-y-1">
                        <div
                          className="w-20 h-20 rounded border shadow-sm"
                          style={{ backgroundColor: currentProfile.colors.secondary }}
                        />
                        <p className="text-xs text-center text-muted-foreground">Secondary</p>
                      </div>
                      <div className="space-y-1">
                        <div
                          className="w-20 h-20 rounded border shadow-sm"
                          style={{ backgroundColor: currentProfile.colors.accent }}
                        />
                        <p className="text-xs text-center text-muted-foreground">Accent</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="default">Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                    <Button variant="outline">Tertiary Action</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <GCFooter profile={currentCountry.gcProfile} />
    </div>
  );
}
