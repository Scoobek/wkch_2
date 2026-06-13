import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import styles from './HeroSplit.module.css';

interface Props {
    src?: string;
    alt?: string;
}

export default async function HeroSplit({ src, alt }: Props) {
  const t = await getTranslations('hero');
  const locale = await getLocale();

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.text}>
        <p className={styles.eyebrow}>{t('eyebrow')}</p>
        <h1 id="hero-heading" className={styles.heading}>
          {t('heading')}
          <br />
          <span className={styles.headingAccent}>
            {t('headingAccent')}
          </span>
        </h1>
        <p className={styles.description}>
          {t('description')}
        </p>
        <a href={`/${locale}/#about`} className={styles.cta}>
          {t('cta')}
        </a>
      </div>

      <div className={styles.imageWrap} aria-hidden="true">
        {src ? (
          <Image
            src={src}
            alt={alt ?? ''}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
            className={styles.heroImg}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>
    </section>
  );
}
