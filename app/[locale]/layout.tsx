import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
});

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'metadata' });
  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={playfair.variable}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
