"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { NewsArticle } from "@/lib/news";
import styles from "./NewsSection.module.css";

const FILTERS = [
    "all",
    "Coursing",
    "Wystawy",
    "Wyścigi",
    "Szkolenia",
    "Meetup",
];

interface Props {
    articles: NewsArticle[];
}

export default function NewsSection({ articles }: Props) {
    const t = useTranslations("news");
    const locale = useLocale();
    const dateLocale = locale === "pl" ? "pl-PL" : "en-GB";
    const [active, setActive] = useState("all");

    const filtered =
        active === "all"
            ? articles
            : articles.filter((article) => article.tag === active);

    function formatDate(iso: string) {
        return new Date(iso).toLocaleDateString(dateLocale, {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <section id="news" className={styles.section}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>{t("title")}</h2>
                    <p className={styles.subtitle}>{t("subtitle")}</p>
                </div>
                <div
                    className={styles.filters}
                    role="group"
                    aria-label="Filter news"
                >
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            className={`${styles.chip} ${
                                active === f ? styles.chipActive : ""
                            }`}
                            onClick={() => setActive(f)}
                            aria-pressed={active === f}
                        >
                            {f === "all" ? t("filterAll") : f}
                        </button>
                    ))}
                </div>
            </div>

            {filtered.length > 0 ? (
                <div className={styles.grid}>
                    {filtered.map((article) => (
                        <article key={article.slug} className={styles.card}>
                            <div
                                className={styles.cardImage}
                                aria-hidden="true"
                            />
                            <div className={styles.cardBody}>
                                <div className={styles.cardMeta}>
                                    {article.tag && (
                                        <span className={styles.cardTag}>
                                            {article.tag}
                                        </span>
                                    )}
                                    {article.date && (
                                        <time
                                            className={styles.cardDate}
                                            dateTime={article.date}
                                        >
                                            {formatDate(article.date)}
                                        </time>
                                    )}
                                </div>
                                <h3 className={styles.cardTitle}>
                                    {article.title}
                                </h3>
                                {article.location && (
                                    <p className={styles.cardLocation}>
                                        📍 {article.location.town}
                                    </p>
                                )}
                                <Link
                                    className={styles.cardLink}
                                    href={`/${locale}/news/${article.slug}`}
                                ></Link>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>
                    {active === "all"
                        ? t("empty")
                        : t("emptyCategory", { category: active })}
                </p>
            )}
        </section>
    );
}
