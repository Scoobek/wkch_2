import { getTranslations } from "next-intl/server";
import type { NewsArticleFull } from "@/lib/news";
import type { Locale } from "@/i18n";
import styles from "./ArticleLocation.module.css";

interface Props {
    article: NewsArticleFull;
    locale: Locale;
}

export default async function ArticleLocation({ article, locale }: Props) {
    const t = await getTranslations({ locale, namespace: "newsArticlePage" });

    if (!article.location.lat && !article.location.lng) return null;

    const { lat, lng, address, town } = article.location;
    const delta = 0.01;
    const mapSrc =
        lat != null && lng != null
            ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta},${lat - delta},${lng + delta},${lat + delta}&layer=mapnik&marker=${lat},${lng}`
            : null;

    return (
        <section className={styles.section}>
            <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{t("location")}</h2>
                <span className={styles.sectionSubtitle}>
                    {t("locationSubtitle")}
                </span>
            </div>

            <div
                className={styles.map}
                aria-label={`Map showing ${address}`}
            >
                {mapSrc && (
                    <iframe
                        src={mapSrc}
                        className={styles.mapIframe}
                        title={`Map – ${address}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                )}
            </div>

            <div className={styles.coordActions}>
                <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navigateBtn}
                >
                    {t("navigate")}
                </a>
            </div>
        </section>
    );
}
