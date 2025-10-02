import styles from './country-filter.module.scss';
import IconClose from '/images/assets/icons/icon-close-dark.svg';
import IconFilter from '/images/assets/icons/icon-filter.svg';
import Container from '../container/container';
import { CYRILLIC_ALPHABET } from '../../const/const';

type Props = {
  countries: Record<string, string[]>;
}

function CountryFilter({ countries }: Props) {
  return (
    <section className={styles.countryFilter}>
      <Container>
        {/* Фильтры */}
        <div className={styles.header}>
          <img src={IconFilter} alt="filter" className={styles.icon} /> {/* по тз похоже что кнопка, но реализации в макете нет */}
          <span className={styles.label}>Фильтрация по странам:</span>
          <nav className={styles.categories}>
            <button className={styles.active}>Европа</button>
            <button>Азия</button>
            <button>Америка</button>
            <button>Острова</button>
          </nav>
        </div>

        {/* Сетка */}
        <div className={styles.alphabetGrid}>
          {CYRILLIC_ALPHABET.map((letter) => {
            const letterCountries = Object.values(countries).flat().filter(
              (c) => c.toLowerCase() === letter
            );

            return (
              <div key={letter} className={styles.letterCell}>
                <span className={styles.letter}>{letter.toUpperCase()}</span>
                <div className={styles.countries}>
                  {letterCountries.map((c) => (
                    <span key={c} className={styles.country}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопка */}
        <button className={styles.collapseBtn}>
          <img src={IconClose} alt="close" />
          <span className={styles.collapseBtnText}>Свернуть</span>
        </button>
      </Container>
    </section>
  );
}

export default CountryFilter;
