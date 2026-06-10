import styles from "./HeroSplit.module.css";

export default function HeroSplit() {
    return (
        <section className={styles.hero} aria-labelledby="hero-heading">
            <div className={styles.text}>
                <p className={styles.eyebrow}>est. 1971 · Warszawa</p>
                <h1 id="hero-heading" className={styles.heading}>
                    Wybieralny Klub
                    <br />
                    <span className={styles.headingAccent}>
                        Charta w Polsce
                    </span>
                </h1>
                <p className={styles.description}>
                    Polska organizacja zrzeszająca hodowców i właścicieli
                    chartów wszystkich ras FCI Grupy X. Działamy na rzecz
                    ochrony, hodowli i promocji chartów w Polsce.
                </p>
                <a href="/#about" className={styles.cta}>
                    Dowiedz się więcej →
                </a>
            </div>

            <div className={styles.imageWrap} aria-hidden="true">
                <div className={styles.imagePlaceholder} />
            </div>
        </section>
    );
}
