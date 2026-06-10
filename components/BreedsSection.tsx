import Link from 'next/link';
import type { Breed } from '@/lib/breeds';
import styles from './BreedsSection.module.css';

interface Props {
  breeds: Breed[];
}

export default function BreedsSection({ breeds }: Props) {
  return (
    <section id="breeds" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Rasy chartów</h2>
        <span className={styles.subtitle}>FCI Grupa X · {breeds.length} ras</span>
      </div>

      <div className={styles.grid}>
        {breeds.map(breed => (
          <Link key={breed.slug} href={`/breeds/${breed.slug}`} className={styles.card}>
            <div className={styles.cardImage} aria-hidden="true" />
            <div className={styles.cardBody}>
              <h3 className={styles.cardName}>{breed.pl}</h3>
              <p className={styles.cardSub}>
                {breed.en} · <span className={styles.cardOrigin}>{breed.origin}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
