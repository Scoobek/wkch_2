import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import { BREEDS, getBreedBySlug, breedName } from '@/lib/breeds';
import { getAllNews } from '@/lib/news';
import { type Locale } from '@/i18n';
import { breedParams } from '@/lib/static-params';
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

const ACCORDION_KEYS = [
  'history', 'temperament', 'appearance', 'care',
  'standard', 'gallery', 'champions', 'breeders',
] as const;

const STAT_KEYS = ['height', 'weight', 'fciGroup', 'origin'] as const;

const RAIL_FILTER_KEYS = ['all', 'coursing', 'shows', 'racing'] as const;

export default async function BreedPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('breedPage');
  const news = getAllNews().slice(0, 5);
  const loc = locale as Locale;
  const dateLocale = loc === 'pl' ? 'pl-PL' : 'en-GB';
  const altName = loc === 'pl' ? breed.en : breed.pl;

  return (
    <>
      <SiteHeader />
      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <Link href={`/${locale}/#breeds`} className={styles.backLink}>{t('backLink')}</Link>
          <p className={styles.sidebarHeading}>{t('sidebarHeading', { count: BREEDS.length })}</p>
          <nav aria-label="Breeds list">
            {BREEDS.map(breed => (
              <Link
                key={breed.slug}
                href={`/${locale}/breeds/${breed.slug}`}
                className={`${styles.sidebarItem} ${breed.slug === slug ? styles.sidebarItemActive : ''}`}
              >
                <span>{breedName(breed, loc)}</span>
                <span className={styles.sidebarOrigin}>{breed.origin}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className={styles.main}>
          <p className={styles.breadcrumb}>{t('breadcrumb', { breed: breedName(breed, loc) })}</p>
          <h1 className={styles.breedTitle}>{breedName(breed, loc)}</h1>
          <p className={styles.breedSubtitle}>
            {altName} · FCI #{breed.fci}
          </p>

          {/* Photo gallery */}
          <div className={styles.gallery}>
            <div className={`${styles.galleryImg} ${styles.galleryImgMain}`} aria-hidden="true" />
            <div className={styles.gallerySecondary}>
              <div className={styles.galleryImg} aria-hidden="true" />
              <div className={styles.galleryImg} aria-hidden="true" />
            </div>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {STAT_KEYS.map(key => (
              <div key={key} className={styles.statCard}>
                <p className={styles.statLabel}>{t(`stats.${key}`)}</p>
                <div className={styles.statValue} aria-label="data coming soon" />
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className={styles.accordion}>
            {ACCORDION_KEYS.map((key, i) => {
              const title = t(`accordion.${key}`);
              return (
                <details key={key} className={styles.accordionItem} open={i === 0}>
                  <summary className={styles.accordionSummary}>
                    <span className={styles.accordionIndex}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{title}</span>
                    <span className={styles.accordionIcon} aria-hidden="true" />
                  </summary>
                  <div className={styles.accordionContent}>
                    <p className={styles.placeholder}>
                      {t('placeholder', { title })}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        </main>

        {/* Right rail */}
        <aside className={styles.rail}>
          <p className={styles.railHeading}>{t('feed')}</p>

          {news.length > 0 && (
            <div className={styles.featuredEvent}>
              <p className={styles.featuredLabel}>{t('upcoming')}</p>
              <p className={styles.featuredTitle}>{news[0].title}</p>
              {news[0].location && (
                <p className={styles.featuredMeta}>📍 {news[0].location}</p>
              )}
              <a href={`/${locale}/#news`} className={styles.featuredCta}>
                {t('moreNews')}
              </a>
            </div>
          )}

          <div className={styles.railFilters}>
            {RAIL_FILTER_KEYS.map(key => (
              <span key={key} className={styles.railChip}>{t(`railFilters.${key}`)}</span>
            ))}
          </div>

          <div className={styles.railFeed}>
            {news.slice(1).map(article => (
              <div key={article.slug} className={styles.feedItem}>
                <div className={styles.feedDate}>
                  {article.date && (
                    <>
                      <span className={styles.feedDay}>
                        {new Date(article.date).getDate()}
                      </span>
                      <span className={styles.feedMonth}>
                        {new Date(article.date).toLocaleDateString(dateLocale, { month: 'short' })}
                      </span>
                    </>
                  )}
                </div>
                <div>
                  {article.tag && (
                    <span className={styles.feedTag}>{article.tag}</span>
                  )}
                  <p className={styles.feedTitle}>{article.title}</p>
                  {article.location && (
                    <p className={styles.feedLoc}>📍 {article.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a href={`/${locale}/#news`} className={styles.railCta}>
            {t('allCalendar')}
          </a>
        </aside>
      </div>
    </>
  );
}
