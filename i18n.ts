import { getRequestConfig } from 'next-intl/server';

export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(locales as readonly string[]).includes(locale)) {
    locale = defaultLocale;
  }
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
