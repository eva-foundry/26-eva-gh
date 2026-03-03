import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Globe, 
  Flag, 
  Scales, 
  Book, 
  ChartBar,
  Calendar,
  CurrencyDollar,
  Translate,
  Users,
  ArrowRight,
  Shield
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface ComplianceGuideProps {
  onNavigateToDemo?: () => void;
}

type CountryId = 'us' | 'uk' | 'canada' | 'australia' | 'nz';

interface CountryInfo {
  id: CountryId;
  name: string;
  flag: string;
  wcag: {
    law: string;
    level: string;
    notes: string;
  };
  languages: {
    primary: string[];
    additional?: string[];
    notes: string;
  };
  formats: {
    date: string;
    currency: string;
    measurement: string;
  };
  cultural: {
    highlights: string[];
  };
}

const countriesData: CountryInfo[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    wcag: {
      law: 'Americans with Disabilities Act (ADA), Section 508',
      level: 'WCAG 2.2 Level AA',
      notes: 'Applies broadly to public and private services; lawsuits drive compliance',
    },
    languages: {
      primary: ['English'],
      additional: ['Spanish'],
      notes: 'English only, but Spanish is widely expected',
    },
    formats: {
      date: 'MM/DD/YYYY',
      currency: 'USD',
      measurement: 'Imperial',
    },
    cultural: {
      highlights: [
        'ADA litigation is a significant compliance driver',
        'Section 508 mandatory for federal websites',
        'Spanish language support increasingly expected',
      ],
    },
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    wcag: {
      law: 'Equality Act 2010, Public Sector Bodies Accessibility Regulations (PSBAR)',
      level: 'WCAG 2.2 Level AA',
      notes: 'Strong enforcement for government sites; private sector covered by anti-discrimination law',
    },
    languages: {
      primary: ['English'],
      additional: ['Welsh', 'Scottish Gaelic'],
      notes: 'English, with Welsh and Gaelic in some regions',
    },
    formats: {
      date: 'DD/MM/YYYY',
      currency: 'GBP',
      measurement: 'Metric',
    },
    cultural: {
      highlights: [
        'Welsh language required for public services in Wales',
        'Government Digital Service (GDS) provides strong guidance',
        'Accessibility statements mandatory for public sector',
      ],
    },
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    wcag: {
      law: 'Accessible Canada Act (ACA), provincial laws (e.g., AODA in Ontario)',
      level: 'WCAG 2.2 Level AA',
      notes: 'Federal sites must comply; provinces add stricter rules',
    },
    languages: {
      primary: ['English', 'French'],
      notes: 'English and French (mandatory bilingual support federally)',
    },
    formats: {
      date: 'DD/MM/YYYY or YYYY-MM-DD',
      currency: 'CAD',
      measurement: 'Metric',
    },
    cultural: {
      highlights: [
        'Bilingual support (English/French) is mandatory at federal level',
        'French must have equal prominence to English',
        'Provincial laws (AODA, etc.) may be stricter than federal',
        'Indigenous language considerations in some contexts',
      ],
    },
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    wcag: {
      law: 'Disability Discrimination Act (DDA)',
      level: 'WCAG 2.2 Level AA',
      notes: 'One of the strictest regimes; applies beyond government to commercial sites',
    },
    languages: {
      primary: ['English'],
      additional: ['Mandarin', 'Arabic', 'Vietnamese', 'Cantonese'],
      notes: 'English, plus strong multicultural demand',
    },
    formats: {
      date: 'DD/MM/YYYY',
      currency: 'AUD',
      measurement: 'Metric',
    },
    cultural: {
      highlights: [
        'Accessibility requirements apply to commercial websites',
        'Highly multicultural society with diverse language needs',
        'Strong government enforcement through Australian Human Rights Commission',
      ],
    },
  },
  {
    id: 'nz',
    name: 'New Zealand',
    flag: '🇳🇿',
    wcag: {
      law: 'NZ Government Web Standards',
      level: 'WCAG 2.2 Level AA',
      notes: 'Required for government; private sector encouraged but not legally mandated',
    },
    languages: {
      primary: ['English', 'Māori'],
      notes: 'English and Māori (official recognition)',
    },
    formats: {
      date: 'DD/MM/YYYY',
      currency: 'NZD',
      measurement: 'Metric',
    },
    cultural: {
      highlights: [
        'Māori language and cultural respect emphasized',
        'Te Reo Māori is an official language',
        'Public sector accessibility is strongly enforced',
        'Cultural protocols important in government contexts',
      ],
    },
  },
];

export function FiveEyesComplianceGuide({ onNavigateToDemo }: ComplianceGuideProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryId>('us');
  const currentCountry = countriesData.find(c => c.id === selectedCountry) || countriesData[0];

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>

      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield size={48} weight="duotone" className="text-primary" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary">
                  Five Eyes Compliance Guide
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  WCAG 2.2 & Internationalization Reference
                </p>
              </div>
            </div>
            {onNavigateToDemo && (
              <Button onClick={onNavigateToDemo} size="lg" className="gap-2">
                <Globe size={20} weight="duotone" />
                View Demo
                <ArrowRight size={16} weight="bold" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <main id="main-content" className="container mx-auto px-6 py-12 space-y-12">
        <Alert className="border-primary/50 bg-primary/5">
          <CheckCircle size={20} weight="duotone" className="text-primary" />
          <AlertTitle className="text-lg font-bold">Quick Answer</AlertTitle>
          <AlertDescription className="mt-2 text-base leading-relaxed">
            The 5 Eyes countries (US, UK, Canada, Australia, New Zealand) all align with{' '}
            <strong>WCAG 2.2 Level AA</strong> for accessibility, but each enforces it through different
            legal frameworks. For internationalization (i18n), the differences mainly involve language
            requirements, regional formats, and cultural conventions. To build your app, you'll need to meet{' '}
            <strong>WCAG 2.2 Level AA consistently</strong>, while tailoring i18n support to each country's
            linguistic and legal context.
          </AlertDescription>
        </Alert>

        <section aria-labelledby="wcag-overview">
          <div className="flex items-center gap-3 mb-6">
            <Scales size={32} weight="duotone" className="text-primary" />
            <h2 id="wcag-overview" className="text-3xl font-bold">
              WCAG 2.2 Accessibility Requirements
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-4 text-left font-semibold border-b">Country</th>
                  <th className="p-4 text-left font-semibold border-b">Accessibility Law/Policy</th>
                  <th className="p-4 text-left font-semibold border-b">WCAG 2.2 Adoption</th>
                  <th className="p-4 text-left font-semibold border-b">Notes</th>
                </tr>
              </thead>
              <tbody>
                {countriesData.map((country, idx) => (
                  <tr
                    key={country.id}
                    className={`border-b transition-colors hover:bg-muted/30 ${
                      idx === countriesData.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                        <span className="font-semibold">{country.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{country.wcag.law}</td>
                    <td className="p-4">
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle size={14} weight="fill" />
                        {country.wcag.level}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{country.wcag.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Alert className="mt-6">
            <Book size={20} weight="duotone" />
            <AlertTitle>Key Takeaway</AlertTitle>
            <AlertDescription>
              WCAG 2.2 Level AA is the common denominator, but enforcement scope differs. Australia and the
              US apply it broadly, while Canada, UK, and NZ focus more on government/public services.
            </AlertDescription>
          </Alert>
        </section>

        <Separator className="my-12" />

        <section aria-labelledby="i18n-overview">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={32} weight="duotone" className="text-primary" />
            <h2 id="i18n-overview" className="text-3xl font-bold">
              Internationalization (i18n) Considerations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Translate size={24} weight="duotone" className="text-primary" />
                  <CardTitle>Language Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-1">🇺🇸 US:</p>
                  <p className="text-muted-foreground">English only, but Spanish widely expected</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🇬🇧 UK:</p>
                  <p className="text-muted-foreground">English, with Welsh and Gaelic in regions</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🇨🇦 Canada:</p>
                  <p className="text-muted-foreground">
                    English & French (mandatory bilingual federally)
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🇦🇺 Australia:</p>
                  <p className="text-muted-foreground">
                    English, plus multicultural demand (Mandarin, Arabic, etc.)
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🇳🇿 New Zealand:</p>
                  <p className="text-muted-foreground">English & Māori (official recognition)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={24} weight="duotone" className="text-primary" />
                  <CardTitle>Regional Formats</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-1">Date Formats:</p>
                  <p className="text-muted-foreground">US uses MM/DD/YYYY</p>
                  <p className="text-muted-foreground">Others use DD/MM/YYYY</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Currency:</p>
                  <p className="text-muted-foreground">USD, GBP, CAD, AUD, NZD</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Measurement:</p>
                  <p className="text-muted-foreground">US uses imperial</p>
                  <p className="text-muted-foreground">Others use metric</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={24} weight="duotone" className="text-primary" />
                  <CardTitle>Cultural Conventions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">
                    Canada emphasizes bilingual inclusivity
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    NZ emphasizes Māori cultural respect
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Australia enforces accessibility across commercial sites
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Legal compliance differs: ADA lawsuits (US), government audits (UK/NZ), provincial enforcement (Canada)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        <section aria-labelledby="country-details">
          <div className="flex items-center gap-3 mb-6">
            <Flag size={32} weight="duotone" className="text-primary" />
            <h2 id="country-details" className="text-3xl font-bold">
              Country-by-Country Details
            </h2>
          </div>

          <Tabs value={selectedCountry} onValueChange={(val) => setSelectedCountry(val as CountryId)}>
            <TabsList className="grid grid-cols-5 w-full">
              {countriesData.map((country) => (
                <TabsTrigger key={country.id} value={country.id} className="gap-2">
                  <span aria-hidden="true">{country.flag}</span>
                  <span className="hidden sm:inline">{country.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {countriesData.map((country) => (
              <TabsContent key={country.id} value={country.id} className="mt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Scales size={20} weight="duotone" />
                        Accessibility Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          Legal Framework
                        </p>
                        <p className="text-base">{country.wcag.law}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          WCAG Level Required
                        </p>
                        <Badge variant="default" className="gap-1">
                          <CheckCircle size={14} weight="fill" />
                          {country.wcag.level}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          Implementation Notes
                        </p>
                        <p className="text-sm leading-relaxed">{country.wcag.notes}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Translate size={20} weight="duotone" />
                        Language Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Primary Languages
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {country.languages.primary.map((lang) => (
                            <Badge key={lang} variant="secondary">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {country.languages.additional && (
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-2">
                            Additional Languages
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {country.languages.additional.map((lang) => (
                              <Badge key={lang} variant="outline">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm leading-relaxed">{country.languages.notes}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChartBar size={20} weight="duotone" />
                      Regional Format Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Date Format
                        </p>
                        <p className="font-mono text-lg">{country.formats.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Currency
                        </p>
                        <p className="font-mono text-lg">{country.formats.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Measurement System
                        </p>
                        <p className="font-mono text-lg">{country.formats.measurement}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users size={20} weight="duotone" />
                      Cultural & Legal Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {country.cultural.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle
                            size={20}
                            weight="fill"
                            className="text-primary flex-shrink-0 mt-0.5"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <Separator className="my-12" />

        <section aria-labelledby="recommendations">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle size={32} weight="duotone" className="text-primary" />
            <h2 id="recommendations" className="text-3xl font-bold">
              Implementation Recommendations
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle>Core Requirements</CardTitle>
                <CardDescription>Essential implementation guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>Implement WCAG 2.2 Level AA globally</strong> to ensure compliance across
                      all 5 Eyes countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>Design for bilingual/multilingual support</strong> (English + French in
                      Canada, Māori in NZ, optional Spanish in US)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>Use locale-aware libraries</strong> for dates, currencies, and measurements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>Plan for cultural inclusivity</strong> (e.g., Māori language toggle in NZ,
                      French-English parity in Canada)
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle>Technical Best Practices</CardTitle>
                <CardDescription>Development and testing guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span>Test with screen readers (NVDA, JAWS, VoiceOver)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span>Ensure keyboard navigation for all interactive elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span>Validate color contrast ratios (4.5:1 minimum for normal text)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span>Use semantic HTML and ARIA labels appropriately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span>Implement proper focus management and skip links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span>Support reduced motion preferences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {onNavigateToDemo && (
          <div className="flex justify-center pt-6">
            <Button onClick={onNavigateToDemo} size="lg" className="gap-2">
              <Globe size={24} weight="duotone" />
              See Live Demo Implementation
              <ArrowRight size={20} weight="bold" />
            </Button>
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 mt-24">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Five Eyes Alliance Compliance Guide • WCAG 2.2 & i18n Reference
          </p>
        </div>
      </footer>
    </div>
  );
}
