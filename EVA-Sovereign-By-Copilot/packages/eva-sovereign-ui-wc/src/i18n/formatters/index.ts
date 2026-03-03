/**
 * Date formatter utility
 */

export function formatDate(date: Date, locale: string, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  };

  return new Intl.DateTimeFormat(locale, formatOptions[format]).format(date);
}

/**
 * Number formatter utility
 */

export function formatNumber(num: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Currency formatter utility
 */

export function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Relative time formatter utility
 */

export function formatRelativeTime(date: Date, locale: string): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffDays > 0) {
    return rtf.format(-diffDays, 'day');
  } else if (diffHours > 0) {
    return rtf.format(-diffHours, 'hour');
  } else if (diffMinutes > 0) {
    return rtf.format(-diffMinutes, 'minute');
  } else {
    return rtf.format(-diffSeconds, 'second');
  }
}
