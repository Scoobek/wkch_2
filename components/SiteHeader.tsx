'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SiteHeader.module.css';

const NAV = [
  { label: 'Start',       href: '/' },
  { label: 'Rasy',        href: '/#breeds' },
  { label: 'Aktualności', href: '/#news' },
  { label: 'O klubie',    href: '/#about' },
  { label: 'Wydarzenia',  href: '/#news' },
  { label: 'Kontakt',     href: '/#contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="var(--border-strong)" strokeWidth="1.5" fill="var(--paper)" />
          <path
            d="M8 24 Q14 14 20 18 Q26 22 32 16"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="30" cy="16" r="1.4" fill="var(--border-strong)" />
        </svg>
        <div className={styles.logoText}>
          <span className={styles.logoName}>WYBIERALNY KLUB</span>
          <span className={styles.logoSub}>Charta</span>
        </div>
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        {NAV.map(({ label, href }) => {
          const isActive = pathname === '/' && href === '/';
          return (
            <Link
              key={href + label}
              href={href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.lang}>
        <span className={`${styles.langChip} ${styles.langChipActive}`}>PL</span>
        <span className={styles.langChip}>EN</span>
      </div>
    </header>
  );
}
