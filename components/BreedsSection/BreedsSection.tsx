import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import type { Breed } from '@/lib/breeds';
import { breedName } from '@/lib/breeds';
import type { Locale } from '@/i18n';
import styles from './BreedsSection.module.css';

interface Props {
  breeds: Breed[];
}

export default async function BreedsSection({ breeds }: Props) {
  const t = await getTranslations('breeds');
  const locale = await getLocale() as Locale;

  return (
    <section id="breeds" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <span className={styles.subtitle}>{t('subtitle', { count: breeds.length })}</span>
      </div>

      <div className={styles.grid}>
        {breeds.map(breed => {
          const name = breedName(breed, locale);
          const altName = locale === 'pl' ? breed.en : breed.pl;
          return (
            <Link key={breed.slug} href={`/${locale}/breeds/${breed.slug}`} className={styles.card}>
              <div className={styles.cardImage} aria-hidden="true" />
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{name}</h3>
                <p className={styles.cardSub}>
                  {altName} · <span className={styles.cardOrigin}>{breed.origin}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
