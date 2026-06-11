"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();

    const [activeHref, setActiveHref] = useState<string | null>(null);

    const otherLocale = locale === "pl" ? "en" : "pl";
    const switchHref = pathname.replace(
        new RegExp(`^/${locale}`),
        `/${otherLocale}`
    );

    const NAV = [
        { label: t("start"),   href: `/${locale}` },
        { label: t("breeds"),  href: `/${locale}/#breeds` },
        { label: t("news"),    href: `/${locale}/#news` },
        { label: t("about"),   href: `/${locale}/#about` },
        { label: t("events"),  href: `/${locale}/#news` },
        { label: t("contact"), href: `/${locale}/#contact` },
    ];

    return (
        <header className={styles.header}>
            <Link href={`/${locale}`} className={styles.logo}>
                <svg
                    width="38"
                    height="38"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke="var(--border-strong)"
                        strokeWidth="1.5"
                        fill="var(--paper)"
                    />
                    <path
                        d="M8 24 Q14 14 20 18 Q26 22 32 16"
                        stroke="var(--border-strong)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <circle
                        cx="30"
                        cy="16"
                        r="1.4"
                        fill="var(--border-strong)"
                    />
                </svg>
                <div className={styles.logoText}>
                    <span className={styles.logoName}>WYBIERALNY KLUB</span>
                    <span className={styles.logoSub}>Charta</span>
                </div>
            </Link>

            <nav className={styles.nav} aria-label="Main navigation">
                {NAV.map(({ label, href }) => {
                    const effective = activeHref ?? pathname;
                    const isActive =
                        effective === href ||
                        (!href.includes("#") &&
                            href !== `/${locale}` &&
                            pathname.startsWith(href));
                    return (
                        <Link
                            key={href + label}
                            href={href}
                            onClick={() => setActiveHref(href)}
                            className={`${styles.navLink} ${
                                isActive ? styles.navLinkActive : ""
                            }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.lang}>
                <span className={`${styles.langChip} ${styles.langChipActive}`}>
                    {locale.toUpperCase()}
                </span>
                <a
                    href={switchHref}
                    className={styles.langChip}
                    onClick={() =>
                        localStorage.setItem("wkch-locale", otherLocale)
                    }
                >
                    {otherLocale.toUpperCase()}
                </a>
            </div>
        </header>
    );
}
