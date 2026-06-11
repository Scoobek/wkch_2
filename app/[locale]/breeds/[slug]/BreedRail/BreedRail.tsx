import { getTranslations } from 'next-intl/server';
import type { NewsArticle } from '@/lib/news';
import type { Locale } from '@/i18n';
import styles from './BreedRail.module.css';

const RAIL_FILTER_KEYS = ['all', 'coursing', 'shows', 'racing'] as const;

interface Props {
  articles: NewsArticle[];
  locale: Locale;
}

export default async function BreedRail({ articles, locale }: Props) {
  const t = await getTranslations('breedPage');
  const dateLocale = locale === 'pl' ? 'pl-PL' : 'en-GB';
  const featured = articles[0];
  const feed = articles.slice(1);

  return (
    <aside className={styles.rail}>
      <p className={styles.railHeading}>{t('feed')}</p>

      {featured && (
        <div className={styles.featuredEvent}>
          <p className={styles.featuredLabel}>{t('upcoming')}</p>
          <p className={styles.featuredTitle}>{featured.title}</p>
          {featured.location && (
            <p className={styles.featuredMeta}>📍 {featured.location}</p>
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
        {feed.map(article => (
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
  );
}
