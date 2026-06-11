import { getTranslations } from 'next-intl/server';
import { breedName } from '@/lib/breeds';
import type { Breed } from '@/lib/breeds';
import type { Locale } from '@/i18n';
import styles from './BreedMain.module.css';

const ACCORDION_KEYS = [
  'history', 'temperament', 'appearance', 'care',
  'standard', 'gallery', 'champions', 'breeders',
] as const;

const STAT_KEYS = ['height', 'weight', 'fciGroup', 'origin'] as const;

interface Props {
  breed: Breed;
  locale: Locale;
}

export default async function BreedMain({ breed, locale }: Props) {
  const t = await getTranslations('breedPage');
  const altName = locale === 'pl' ? breed.en : breed.pl;

  return (
    <main className={styles.main}>
      <p className={styles.breadcrumb}>{t('breadcrumb', { breed: breedName(breed, locale) })}</p>
      <h1 className={styles.breedTitle}>{breedName(breed, locale)}</h1>
      <p className={styles.breedSubtitle}>
        {altName} · FCI #{breed.fci}
      </p>

      <div className={styles.gallery}>
        <div className={`${styles.galleryImg} ${styles.galleryImgMain}`} aria-hidden="true" />
        <div className={styles.gallerySecondary}>
          <div className={styles.galleryImg} aria-hidden="true" />
          <div className={styles.galleryImg} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.stats}>
        {STAT_KEYS.map(key => (
          <div key={key} className={styles.statCard}>
            <p className={styles.statLabel}>{t(`stats.${key}`)}</p>
            <div className={styles.statValue} aria-label="data coming soon" />
          </div>
        ))}
      </div>

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
  );
}
