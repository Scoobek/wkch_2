import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n";
import type { NewsArticleFull } from "@/lib/news";
import GalleryClient from "./GalleryClient";
import styles from "./ArticleGallery.module.css";

interface Props {
    locale: Locale;
    article: NewsArticleFull;
}

export default async function ArticleGallery({ locale, article }: Props) {
    if (!article.images?.length) return null;

    const t = await getTranslations({ locale, namespace: "newsArticlePage" });

    return (
        <section className={styles.section}>
            <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{t("gallery")}</h2>
                <span className={styles.sectionSubtitle}>
                    {t("gallerySubtitle")}
                </span>
            </div>
            <GalleryClient images={article.images} />
        </section>
    );
}