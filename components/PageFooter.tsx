import styles from './PageFooter.module.css';

const SOCIAL = [
  { name: 'Facebook',  handle: '@klubchartow', followers: '4.2k' },
  { name: 'Instagram', handle: '@klubchartow', followers: '8.7k' },
  { name: 'YouTube',   handle: 'Klub Chartów', followers: '1.1k' },
  { name: 'TikTok',    handle: '@klubchartow', followers: '3.3k' },
];

export default function PageFooter() {
  return (
    <footer className={styles.footer}>
      {/* About */}
      <div id="about" className={styles.row}>
        <h2 className={styles.rowTitle}>O klubie</h2>
        <div className={styles.rowContent}>
          <p className={styles.text}>
            Wybieralny Klub Charta działa od 1971 roku i zrzesza hodowców oraz
            właścicieli chartów wszystkich ras FCI Grupy X w Polsce. Naszym celem
            jest ochrona ras, prowadzenie hodowli i organizacja zawodów.
          </p>
        </div>
        <div className={styles.rowAction}>
          <a href="#" className={styles.btn}>Nasza historia →</a>
        </div>
      </div>

      {/* Sponsors */}
      <div className={`${styles.row} ${styles.rowDashed}`}>
        <h2 className={styles.rowTitle}>Sponsorzy</h2>
        <div className={styles.rowContent}>
          <div className={styles.sponsorsGrid}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={styles.sponsorLogo}>logo {i}</div>
            ))}
          </div>
        </div>
        <div className={styles.rowAction}>
          <a href="#" className={styles.linkMuted}>zostań partnerem →</a>
        </div>
      </div>

      {/* Social media */}
      <div className={`${styles.row} ${styles.rowDashed}`}>
        <div>
          <h2 className={styles.rowTitle}>Social media</h2>
          <p className={styles.rowTitleSub}>śledź nas</p>
        </div>
        <div className={styles.rowContent}>
          <div className={styles.socialGrid}>
            {SOCIAL.map(s => (
              <div key={s.name} className={styles.socialCard}>
                <div className={styles.socialCardInner}>
                  <div className={styles.socialIcon}>{s.name[0]}</div>
                  <div>
                    <p className={styles.socialName}>{s.name}</p>
                    <p className={styles.socialHandle}>{s.handle}</p>
                  </div>
                </div>
                <p className={styles.socialFollowers}>{s.followers} followers</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rowAction} />
      </div>

      {/* Contact */}
      <div id="contact" className={`${styles.row} ${styles.rowDashed} ${styles.rowLast}`}>
        <h2 className={styles.rowTitle}>Kontakt</h2>
        <div className={styles.rowContent}>
          <div className={styles.contactGrid}>
            <div>
              <p className={styles.contactLabel}>adres</p>
              <p className={styles.contactValue}>ul. Chartów 1<br />00-001 Warszawa</p>
            </div>
            <div>
              <p className={styles.contactLabel}>email / tel</p>
              <p className={styles.contactValue}>
                kontakt@wkch.pl<br />+48 22 000 00 00
              </p>
            </div>
          </div>
        </div>
        <div className={styles.rowAction}>
          <p className={styles.linkMuted}>odpowiadamy w 48h</p>
        </div>
      </div>
    </footer>
  );
}
