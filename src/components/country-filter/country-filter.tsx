import styles from './country-filter.module.scss';
import IconClose from '/images/assets/icons/icon-close-dark.svg';
import IconFilter from '/images/assets/icons/icon-filter.svg';
import Container from '../container/container';
import { CYRILLIC_ALPHABET } from '../../const/const';
import { useState } from 'react';
import { useCountryFilter } from '../../context/county-filter/use-country-filter';

type Props = {
  countries: Record<string, string[]>;
};

function CountryFilter({ countries }: Props) {
  const {
    activeCategories,
    toggleCategory,
    selectedCountries,
    toggleCountry
  } = useCountryFilter();

  const CATEGORY_ORDER = ['Европа', 'Азия', 'Америка', 'Острова'];

  // состояние свёрнутого списка
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // список стран для отображения
  const visibleCountries =
    activeCategories.length > 0
      ? activeCategories.map((cat) => countries[cat]).flat()
      : Object.values(countries).flat();

  return (
    <section className={styles.countryFilter}>
      <Container>
        {/* Фильтры */}
        <div className={`${styles.header} ${isCollapsed ? styles.collapsed : ''}`}>
          <img src={IconFilter} alt="filter" className={styles.icon} />
          <span className={styles.label}>Фильтрация по странам:</span>
          <nav className={styles.categories}>
            {CATEGORY_ORDER.map((category) =>
              countries[category] ? (
                <button
                  key={category}
                  className={activeCategories.includes(category) ? styles.active : ''}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ) : null
            )}
          </nav>
        </div>

        {/* Сетка */}
        <div
          className={`${styles.alphabetGrid} ${
            isCollapsed ? styles.collapsed : ''
          }`}
        >
          {CYRILLIC_ALPHABET.map((letter) => {
            const letterCountries = visibleCountries.filter(
              (c) => c[0].toLowerCase() === letter.toLowerCase()
            );

            if (letterCountries.length === 0) {
              return null;
            }

            return (
              <div key={letter} className={styles.letterCell}>
                <span className={styles.letter}>{letter.toUpperCase()}</span>
                <div className={styles.countries}>
                  {letterCountries.map((c) => (
                    <span
                      key={c}
                      className={`${styles.country} ${
                        selectedCountries.includes(c) ? styles.countryActive : ''
                      }`}
                      onClick={() => toggleCountry(c)}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопка */}
        <button
          className={styles.collapseBtn}
          onClick={toggleCollapse}
        >
          <img src={IconClose} alt="close" />
          <span className={styles.collapseBtnText}>
            {isCollapsed ? 'Развернуть' : 'Свернуть'}
          </span>
        </button>
      </Container>
    </section>
  );
}

export default CountryFilter;
