import { useState, useEffect, useCallback } from 'react';
import { i18nService } from './i18n-service';
import enCA from './locales/en-CA.json';
import frCA from './locales/fr-CA.json';
import esES from './locales/es-ES.json';
import itIT from './locales/it-IT.json';
import deDE from './locales/de-DE.json';
import enUS from './locales/en-US.json';
import esUS from './locales/es-US.json';
import enGB from './locales/en-GB.json';
import enAU from './locales/en-AU.json';
import enNZ from './locales/en-NZ.json';

i18nService.setTranslations('en-CA', enCA);
i18nService.setTranslations('fr-CA', frCA);
i18nService.setTranslations('es-ES', esES);
i18nService.setTranslations('it-IT', itIT);
i18nService.setTranslations('de-DE', deDE);
i18nService.setTranslations('en-US', enUS);
i18nService.setTranslations('es-US', esUS);
i18nService.setTranslations('en-GB', enGB);
i18nService.setTranslations('en-AU', enAU);
i18nService.setTranslations('en-NZ', enNZ);

export function useI18n() {
  const [locale, setLocaleState] = useState(i18nService.getLocale());

  useEffect(() => {
    return i18nService.subscribe((newLocale) => {
      setLocaleState(newLocale);
    });
  }, []);

  const setLocale = useCallback((newLocale: string) => {
    i18nService.setLocale(newLocale);
  }, []);

  const t = useCallback((key: string, params?: Record<string, any>) => {
    return i18nService.t(key, params);
  }, [locale]);

  const formatDate = useCallback((date: Date, format?: 'short' | 'medium' | 'long') => {
    return i18nService.formatDate(date, format);
  }, [locale]);

  const formatNumber = useCallback((num: number, options?: Intl.NumberFormatOptions) => {
    return i18nService.formatNumber(num, options);
  }, [locale]);

  const formatCurrency = useCallback((amount: number, currency?: string) => {
    return i18nService.formatCurrency(amount, currency);
  }, [locale]);

  return {
    locale,
    setLocale,
    t,
    formatDate,
    formatNumber,
    formatCurrency,
  };
}
