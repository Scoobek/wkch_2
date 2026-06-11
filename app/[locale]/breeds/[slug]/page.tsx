import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader/SiteHeader';
import { BREEDS, getBreedBySlug, breedName } from '@/lib/breeds';
import { getAllNews } from '@/lib/news';
import { type Locale } from '@/i18n';
import { breedParams } from '@/lib/static-params';
import BreedSidebar from './BreedSidebar/BreedSidebar';
import BreedMain from './BreedMain/BreedMain';
import BreedRail from './BreedRail/BreedRail';
import styles from './page.module.css';

export const generateStaticParams = breedParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) return {};
  const t = await getTranslations({ locale: locale as Locale, namespace: 'metadata' });
  const name = breedName(breed, locale as Locale);
  return {
    title: t('breedTitle', { breed: name }),
    description: t('breedDescription', { breed: name, breedEn: breed.en, fci: breed.fci }),
  };
}

export default async function BreedPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  setRequestLocale(locale);
  const news = getAllNews().slice(0, 5);
  const loc = locale as Locale;

  return (
    <>
      <SiteHeader />
      <div className={styles.layout}>
        <BreedSidebar breeds={BREEDS} currentSlug={slug} locale={loc} />
        <BreedMain breed={breed} locale={loc} />
        <BreedRail articles={news} locale={loc} />
      </div>
    </>
  );
}