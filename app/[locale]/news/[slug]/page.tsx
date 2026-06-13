import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { getNewsArticle } from "@/lib/news";
import { type Locale } from "@/i18n";
import { newsParams } from "@/lib/static-params";
import ArticleHeader from "./ArticleHeader/ArticleHeader";
import ArticleBody from "./ArticleBody/ArticleBody";
import ArticleLocation from "./ArticleLocation/ArticleLocation";
import ArticleGallery from "./ArticleGallery/ArticleGallery";
import styles from "./page.module.css";

export const generateStaticParams = newsParams;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const article = getNewsArticle(slug);
    if (!article) return {};
    const t = await getTranslations({
        locale: locale as Locale,
        namespace: "newsArticlePage",
    });
    return {
        title: t("articleTitle", { title: article.title }),
        description: article.excerpt ?? "",
    };
}

export default async function NewsArticlePage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const article = getNewsArticle(slug);
    if (!article) notFound();

    setRequestLocale(locale);

    return (
        <>
            <SiteHeader />
            <main className={styles.page}>
                <ArticleHeader article={article} />
                <ArticleBody article={article} />
                <ArticleLocation article={article} />
                <ArticleGallery article={article} />
            </main>
        </>
    );
}
