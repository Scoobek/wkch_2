import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import { BREEDS, getBreedBySlug } from '@/lib/breeds';
import { getAllNews } from '@/lib/news';
import styles from './page.module.css';

export function generateStaticParams() {
  return BREEDS.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) return {};
  return {
    title: `${breed.pl} – Wybieralny Klub Charta`,
    description: `Informacje o rasie ${breed.pl} (${breed.en}) – FCI nr ${breed.fci}.`,
  };
}

const ACCORDION_SECTIONS = [
  'Historia i pochodzenie',
  'Temperament',
  'Wygląd i rozmiar',
  'Pielęgnacja i ruch',
  'Standard FCI',
  'Galeria zdjęć',
  'Słynne psy i championy',
  'Hodowcy (katalog)',
];

export default async function BreedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  const news = getAllNews().slice(0, 5);

  return (
    <>
      <SiteHeader />
      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <Link href="/#breeds" className={styles.backLink}>← wszystkie rasy</Link>
          <p className={styles.sidebarHeading}>Rasy · {BREEDS.length}</p>
          <nav aria-label="Breeds list">
            {BREEDS.map(b => (
              <Link
                key={b.slug}
                href={`/breeds/${b.slug}`}
                className={`${styles.sidebarItem} ${b.slug === slug ? styles.sidebarItemActive : ''}`}
              >
                <span>{b.pl}</span>
                <span className={styles.sidebarOrigin}>{b.origin}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className={styles.main}>
          <p className={styles.breadcrumb}>Rasy / {breed.pl}</p>
          <h1 className={styles.breedTitle}>{breed.pl}</h1>
          <p className={styles.breedSubtitle}>
            {breed.en} · FCI #{breed.fci}
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
            {['wzrost', 'waga', 'grupa FCI', 'pochodzenie'].map(stat => (
              <div key={stat} className={styles.statCard}>
                <p className={styles.statLabel}>{stat}</p>
                <div className={styles.statValue} aria-label="data coming soon" />
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className={styles.accordion}>
            {ACCORDION_SECTIONS.map((title, i) => (
              <details key={title} className={styles.accordionItem} open={i === 0}>
                <summary className={styles.accordionSummary}>
                  <span className={styles.accordionIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{title}</span>
                  <span className={styles.accordionIcon} aria-hidden="true" />
                </summary>
                <div className={styles.accordionContent}>
                  <p className={styles.placeholder}>
                    Treść sekcji „{title}" będzie dostępna wkrótce.
                  </p>
                </div>
              </details>
            ))}
          </div>
        </main>

        {/* Right rail */}
        <aside className={styles.rail}>
          <p className={styles.railHeading}>Feed</p>

          {news.length > 0 && (
            <div className={styles.featuredEvent}>
              <p className={styles.featuredLabel}>NAJBLIŻSZE</p>
              <p className={styles.featuredTitle}>{news[0].title}</p>
              {news[0].location && (
                <p className={styles.featuredMeta}>📍 {news[0].location}</p>
              )}
              <a href="/#news" className={styles.featuredCta}>
                więcej →
              </a>
            </div>
          )}

          <div className={styles.railFilters}>
            {['wszystko', 'coursing', 'wystawy', 'wyścigi'].map(f => (
              <span key={f} className={styles.railChip}>{f}</span>
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
                        {new Date(article.date).toLocaleDateString('pl-PL', { month: 'short' })}
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

          <a href="/#news" className={styles.railCta}>
            Cały kalendarz →
          </a>
        </aside>
      </div>
    </>
  );
}
