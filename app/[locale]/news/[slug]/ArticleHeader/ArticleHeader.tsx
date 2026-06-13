import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import type { NewsArticleFull } from "@/lib/news";
import styles from "./ArticleHeader.module.css";

interface Props {
    article: NewsArticleFull;
}

export default async function ArticleHeader({ article }: Props) {
    const locale = await getLocale();
    const t = await getTranslations("newsArticlePage");
    const dateLocale = locale === "pl" ? "pl-PL" : "en-GB";
    const formattedDate = article.date
        ? new Date(article.date).toLocaleDateString(dateLocale, {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

    return (
        <div className={styles.wrapper}>
            <Link href={`/${locale}/#news`} className={styles.backLink}>
                {t("backLink")}
            </Link>

            <div className={styles.meta}>
                {article.tag && (
                    <span className={styles.tag}>{article.tag}</span>
                )}
                {formattedDate && (
                    <time className={styles.date} dateTime={article.date}>
                        <svg
                            className={styles.calIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M3 9H21M8 3V6M16 3V6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        {formattedDate}
                    </time>
                )}
                {article.location.town && (
                    <span className={styles.location}>
                        📍 {article.location.town}
                    </span>
                )}
            </div>

            <h1 className={styles.title}>{article.title}</h1>
            {article.excerpt && (
                <p className={styles.excerpt}>{article.excerpt}</p>
            )}
        </div>
    );
}
