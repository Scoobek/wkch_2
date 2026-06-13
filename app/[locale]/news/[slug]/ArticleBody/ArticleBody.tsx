import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { NewsArticleFull } from "@/lib/news";
import type { Locale } from "@/i18n";
import styles from "./ArticleBody.module.css";

interface Props {
    article: NewsArticleFull;
    locale: Locale;
}

export default async function ArticleBody({ article, locale }: Props) {
    const t = await getTranslations({ locale, namespace: "newsArticlePage" });
    const dateLocale = locale === "pl" ? "pl-PL" : "en-GB";
    const formattedDate = article.date
        ? new Date(article.date).toLocaleDateString(dateLocale, {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

    const paragraphs = article.body
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <div className={styles.wrapper}>
            {article.isHeroSection && (
                <figure className={styles.hero}>
                    <Image
                        src={article.thumbnail!}
                        alt={article.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 1280px"
                        priority
                        className={styles.heroImg}
                    />
                    <figcaption className={styles.heroCaption}>
                        {article.title}
                    </figcaption>
                </figure>
            )}
            <div className={styles.body}>
                <div className={styles.content}>
                    <h2 className={styles.contentTitle}>{t("about")}</h2>
                    <div className={styles.prose}>
                        {paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>

                <aside className={styles.metaCard}>
                    <p className={styles.metaCardTitle}>{t("details")}</p>
                    <dl className={styles.metaList}>
                        {article.tag && (
                            <div className={styles.metaRow}>
                                <dt className={styles.metaLabel}>
                                    {t("detailType")}
                                </dt>
                                <dd className={styles.metaValue}>
                                    {article.tag}
                                </dd>
                            </div>
                        )}
                        {formattedDate && (
                            <div className={styles.metaRow}>
                                <dt className={styles.metaLabel}>
                                    {t("detailDate")}
                                </dt>
                                <dd className={styles.metaValue}>
                                    {formattedDate}
                                </dd>
                            </div>
                        )}
                        {article.location.town && (
                            <div className={styles.metaRow}>
                                <dt className={styles.metaLabel}>
                                    {t("detailCity")}
                                </dt>
                                <dd className={styles.metaValue}>
                                    {article.location.town}
                                </dd>
                            </div>
                        )}
                        {article.location.address && (
                            <div className={styles.metaRow}>
                                <dt className={styles.metaLabel}>
                                    {t("detailAddress")}
                                </dt>
                                <dd className={styles.metaValue}>
                                    {article.location.address}
                                </dd>
                            </div>
                        )}
                        {article.location.lat != null && (
                            <div className={styles.metaRow}>
                                <dt className={styles.metaLabel}>
                                    {t("detailLat")}
                                </dt>
                                <dd className={styles.metaValue}>
                                    {article.location.lat}
                                </dd>
                            </div>
                        )}
                        {article.location.lng != null && (
                            <div className={styles.metaRow}>
                                <dt className={styles.metaLabel}>
                                    {t("detailLng")}
                                </dt>
                                <dd className={styles.metaValue}>
                                    {article.location.lng}
                                </dd>
                            </div>
                        )}
                    </dl>
                    {/* TO DO -> external link to */}
                    <Link href="" className={styles.cta}>
                        {t("registerCta")}
                    </Link>
                </aside>
            </div>
        </div>
    );
}
