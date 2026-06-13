import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { breedName } from '@/lib/breeds';
import type { Breed } from '@/lib/breeds';
import type { Locale } from '@/i18n';
import styles from './BreedSidebar.module.css';

interface Props {
  breeds: Breed[];
  currentSlug: string;
}

export default async function BreedSidebar({ breeds, currentSlug }: Props) {
  const locale = await getLocale() as Locale;
  const t = await getTranslations('breedPage');

  return (
    <aside className={styles.sidebar}>
      <Link href={`/${locale}/#breeds`} className={styles.backLink}>{t('backLink')}</Link>
      <p className={styles.sidebarHeading}>{t('sidebarHeading', { count: breeds.length })}</p>
      <nav aria-label="Breeds list">
        {breeds.map(breed => (
          <Link
            key={breed.slug}
            href={`/${locale}/breeds/${breed.slug}`}
            className={`${styles.sidebarItem} ${breed.slug === currentSlug ? styles.sidebarItemActive : ''}`}
          >
            <span>{breedName(breed, locale)}</span>
            <span className={styles.sidebarOrigin}>{breed.origin}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
