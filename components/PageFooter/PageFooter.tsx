import { getTranslations } from "next-intl/server";
import styles from "./PageFooter.module.css";

const SOCIAL = [
    { name: "Facebook", handle: "@klubchartow", followers: "4.2k" },
    { name: "Instagram", handle: "@klubchartow", followers: "8.7k" },
    { name: "YouTube", handle: "Klub Chartów", followers: "1.1k" },
    { name: "TikTok", handle: "@klubchartow", followers: "3.3k" },
];

export default async function PageFooter() {
    const t = await getTranslations("footer");

    return (
        <footer className={styles.footer}>
            {/* About */}
            <div id="about" className={styles.row}>
                <h2 className={styles.rowTitle}>{t("about")}</h2>
                <div className={styles.rowContent}>
                    <p className={styles.text}>{t("aboutText")}</p>
                </div>
                <div className={styles.rowAction}>
                    <a href="#" className={styles.btn}>
                        {t("aboutCta")}
                    </a>
                </div>
            </div>

            {/* Sponsors */}
            <div className={`${styles.row} ${styles.rowDashed}`}>
                <h2 className={styles.rowTitle}>{t("sponsors")}</h2>
                <div className={styles.rowContent}>
                    <div className={styles.sponsorsGrid}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={styles.sponsorLogo}>
                                logo {i}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.rowAction}>
                    <a href="#" className={styles.linkMuted}>
                        {t("sponsorsCta")}
                    </a>
                </div>
            </div>

            {/* Social media */}
            <div className={`${styles.row} ${styles.rowDashed}`}>
                <div style={{ display: "block" }}>
                    <h2 className={styles.rowTitle}>{t("social")}</h2>
                    <p className={styles.rowTitleSub}>{t("socialSub")}</p>
                </div>
                <div className={styles.rowContent}>
                    <div className={styles.socialGrid}>
                        {SOCIAL.map((s) => (
                            <div key={s.name} className={styles.socialCard}>
                                <div className={styles.socialCardInner}>
                                    <div className={styles.socialIcon}>
                                        {s.name[0]}
                                    </div>
                                    <div>
                                        <p className={styles.socialName}>
                                            {s.name}
                                        </p>
                                        <p className={styles.socialHandle}>
                                            {s.handle}
                                        </p>
                                    </div>
                                </div>
                                <p className={styles.socialFollowers}>
                                    {s.followers} followers
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div
                id="contact"
                className={`${styles.row} ${styles.rowDashed} ${styles.rowLast}`}
            >
                <h2 className={styles.rowTitle}>{t("contact")}</h2>
                <div className={styles.rowContent}>
                    <div className={styles.contactGrid}>
                        <div>
                            <p className={styles.contactLabel}>
                                {t("addressLabel")}
                            </p>
                            <p className={styles.contactValue}>
                                ul. Chartów 1<br />
                                00-001 Warszawa
                            </p>
                        </div>
                        <div>
                            <p className={styles.contactLabel}>
                                {t("emailLabel")}
                            </p>
                            <p className={styles.contactValue}>
                                kontakt@wkch.pl
                                <br />
                                +48 22 000 00 00
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.rowAction}>
                    <p className={styles.linkMuted}>{t("responseTime")}</p>
                </div>
            </div>
        </footer>
    );
}
