import { useState, useEffect } from 'react';
import styles from './catalog-page.module.scss';
import Header from '../../../components/header/header';
import PageHero from '../../../components/page-hero/page-hero';
import CountryFilter from '../../../components/country-filter/country-filter';
import { useCountriesQuery } from '../../../hooks/api/use-countires-query';
import Footer from '../../../components/footer/footer';
import CatalogCards from '../../../components/catalog-cards/catalog-cards';
import { useCompanionsQuery } from '../../../hooks/api/use-companions-query';
import Container from '../../../components/container/container';
import Loader from '../../../components/loader/loader';
import { useCountryFilter } from '../../../context/county-filter/use-country-filter';
import { DEFAULT_CARDS_AMOUNT, MAX_CARDS_PER_SERVER_PAGE } from '../../../const/const';
import { translateArray } from '../../../utils/country';
import { continentDictionary, countryDictionary } from '../../../const/dictionary';
import CatalogFilters from '../../../components/catalog-filters/catalog-filters';
import { ExtraFilters } from '../../../types/api';

function CatalogPage () {
  const { activeCategories, selectedCountries } = useCountryFilter();
  const [amount, setAmount] = useState<number>(DEFAULT_CARDS_AMOUNT);

  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({
    hobbies: [],
    musics: [],
    foods: [],
    transportType: [],
    minLevel: 0,
    maxLevel: 100
  });

  // Сбрасываем amount при смене фильтров
  useEffect(() => {
    setAmount(DEFAULT_CARDS_AMOUNT);
  }, [activeCategories, selectedCountries, extraFilters]);

  const filterParams = {
    limit: amount,
    page: 1,
    continents: translateArray(activeCategories, continentDictionary),
    countries: translateArray(selectedCountries, countryDictionary),
    ...extraFilters
  };

  const { data: countries } = useCountriesQuery();
  const { data: companions, isLoading } = useCompanionsQuery(filterParams);

  const handleShowMore = () => {
    setAmount((prev) => prev < MAX_CARDS_PER_SERVER_PAGE
      ? prev + DEFAULT_CARDS_AMOUNT
      : MAX_CARDS_PER_SERVER_PAGE
    );
  };

  return(
    <div className={styles.catalogPage}>
      <Header />
      <PageHero title="Попутчики" />

      <main className={styles.main}>
        <Container>
          {countries && <CountryFilter countries={countries.locations}/>}

          <div className={styles.cardsContainer}>
            {
              isLoading
                ? <Loader/>
                : companions &&
                <CatalogCards
                  isButtonVisible={amount < MAX_CARDS_PER_SERVER_PAGE}
                  onShowMore={handleShowMore}
                  companionsData={companions}
                />
            }

            <CatalogFilters
              onApplyFilters={setExtraFilters}
            />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default CatalogPage;
