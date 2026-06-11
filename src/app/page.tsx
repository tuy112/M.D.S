import Link from 'next/link';
import { scenarios  } from '@/data';
import styles from './page.module.css';

export default function Home() {

  return (
    <div className={styles.wrap}>
      {/* header */}

      {/* main */}
      <main className={styles.main}>
        <h1 className={styles.title}>DUGOUT</h1>

        <div className={styles.grid}>
          {scenarios.map(game => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className={styles.gameCard}
            >
              <div className={styles.gameDate}>
                {game.id}
              </div>

              <div className={styles.gameTitle}>
                {game.title}
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* footer */}
      
    </div>
    
  );
}