import { useState } from 'react';
import { GCHeader } from '@/components/eva/GCHeader';
import { GCFooter } from '@/components/eva/GCFooter';
import { LanguageSwitcher } from '@/components/eva/LanguageSwitcher';
import { ProgramCard } from '@/components/eva/ProgramCard';
import { EVAChat } from '@/components/eva/EVAChat';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Briefcase, UserCircle, CurrencyDollar, MagnifyingGlass, ListChecks, Layout, Globe } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n/use-i18n';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ProgramDetails = {
  title: string;
  description: string;
  details: string;
  icon: string;
};

interface ESDCDemoProps {
  onNavigateToTemplates?: () => void;
  onNavigateToFiveEyes?: () => void;
}

export function ESDCDemo({ onNavigateToTemplates, onNavigateToFiveEyes }: ESDCDemoProps = {}) {
  const { locale, setLocale, t } = useI18n();
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetails | null>(null);

  const programs = [
    {
      icon: '💼',
      titleKey: 'esdc.programs.ei.title',
      descKey: 'esdc.programs.ei.description',
      detailsKey: 'esdc.programs.ei.details',
    },
    {
      icon: '🧓',
      titleKey: 'esdc.programs.oas.title',
      descKey: 'esdc.programs.oas.description',
      detailsKey: 'esdc.programs.oas.details',
    },
    {
      icon: '💰',
      titleKey: 'esdc.programs.cpp.title',
      descKey: 'esdc.programs.cpp.description',
      detailsKey: 'esdc.programs.cpp.details',
    },
  ];

  const services = [
    {
      icon: MagnifyingGlass,
      titleKey: 'esdc.services.jobSearch.title',
      descKey: 'esdc.services.jobSearch.description',
    },
    {
      icon: ListChecks,
      titleKey: 'esdc.services.benefitsFinder.title',
      descKey: 'esdc.services.benefitsFinder.description',
    },
  ];

  const availableLocales = ['en-CA', 'fr-CA'];

  const handleProgramClick = (program: typeof programs[0]) => {
    setSelectedProgram({
      title: t(program.titleKey),
      description: t(program.descKey),
      details: t(program.detailsKey),
      icon: program.icon,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        {t('navigation.skipToMain')}
      </a>

      <GCHeader appName={t('esdc.title')} profile="canada_gc">
        <div className="flex items-center gap-3">
          {onNavigateToFiveEyes && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToFiveEyes}
              className="flex items-center gap-2"
            >
              <Globe size={18} weight="duotone" />
              <span className="hidden sm:inline">Five Eyes</span>
            </Button>
          )}
          {onNavigateToTemplates && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToTemplates}
              className="flex items-center gap-2"
            >
              <Layout size={18} weight="duotone" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
          )}
          <LanguageSwitcher
            currentLocale={locale}
            availableLocales={availableLocales}
            onLocaleChange={setLocale}
          />
        </div>
      </GCHeader>

      <main id="main-content" className="flex-1">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
          <div className="container mx-auto px-6 py-16 max-line-length">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              {t('esdc.hero.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('esdc.hero.description')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 space-y-12">
          <section aria-labelledby="programs-heading">
            <h2 id="programs-heading" className="text-3xl font-bold mb-8">
              {t('esdc.programs.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard
                  key={program.titleKey}
                  icon={program.icon}
                  title={t(program.titleKey)}
                  description={t(program.descKey)}
                  linkText={t('common.learnMore')}
                  onLearnMore={() => handleProgramClick(program)}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="services-heading" className="bg-muted/30 -mx-6 px-6 py-12 rounded-lg">
            <h2 id="services-heading" className="text-3xl font-bold mb-8">
              {t('navigation.services')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.titleKey}
                    className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon size={32} weight="duotone" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{t(service.titleKey)}</h3>
                        <p className="text-muted-foreground text-base">{t(service.descKey)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="chat-heading">
            <h2 id="chat-heading" className="text-3xl font-bold mb-8 text-center">
              {t('chat.title')}
            </h2>
            <EVAChat
              title={t('chat.title')}
              subtitle={t('chat.subtitle')}
              placeholder={t('chat.placeholder')}
            />
          </section>
        </div>
      </main>

      <GCFooter profile="canada_gc" />

      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {selectedProgram && (
                <span className="text-4xl" aria-hidden="true">{selectedProgram.icon}</span>
              )}
              <DialogTitle className="text-2xl">{selectedProgram?.title}</DialogTitle>
            </div>
            <DialogDescription className="text-base pt-4 space-y-4">
              <p className="font-medium text-foreground">{selectedProgram?.description}</p>
              <p className="text-muted-foreground leading-relaxed">{selectedProgram?.details}</p>
              <div className="pt-4">
                <Button variant="default" size="lg" className="w-full md:w-auto">
                  {t('common.apply')}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
