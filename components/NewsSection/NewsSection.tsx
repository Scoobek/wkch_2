"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { NewsArticle } from "@/lib/news";
import styles from "./NewsSection.module.css";

const FILTERS: { value: string; labelKey: string }[] = [
    { value: "all",       labelKey: "all" },
    { value: "Coursing",  labelKey: "coursing" },
    { value: "Wystawy",   labelKey: "shows" },
    { value: "Wyścigi",   labelKey: "racing" },
    { value: "Szkolenia", labelKey: "training" },
    { value: "Meetup",    labelKey: "meetup" },
    { value: "Breed",     labelKey: "breed" },
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

    function handleFilterClick(tag: string) {
        return () => setActive(tag);
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
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            className={`${styles.chip} ${
                                active === filter.value ? styles.chipActive : ""
                            }`}
                            onClick={handleFilterClick(filter.value)}
                            aria-pressed={active === filter.value}
                        >
                            {t(filter.labelKey)}
                        </button>
                    ))}
                </div>
            </div>

            {filtered.length > 0 ? (
                <div className={styles.grid}>
                    {filtered.map((article, index) => (
                        <article key={article.slug} className={styles.card}>
                            <div className={styles.cardImage}>
                                {article.thumbnail && (
                                    <Image
                                        src={article.thumbnail}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                        priority={index === 0}
                                        className={styles.cardImg}
                                    />
                                )}
                            </div>
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
                                {article.location?.town && (
                                    <p className={styles.cardLocation}>
                                        📍 {article.location.town}
                                    </p>
                                )}
                                <Link
                                    className={styles.cardLink}
                                    href={`/${locale}/news/${article.slug}`}
                                >
                                    <span className="sr-only">
                                        {article.title}
                                    </span>
                                </Link>
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
