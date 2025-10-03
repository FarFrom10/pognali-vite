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
import { useState } from 'react';
import { DEFAULT_CARDS_AMOUNT } from '../../../const/const';
import { translateArray } from '../../../utils/country';
import { continentDictionary, countryDictionary } from '../../../const/dictionary';

function CatalogPage () {
  const { activeCategories, selectedCountries } = useCountryFilter();
  const [amount, setAmount] = useState<number>(DEFAULT_CARDS_AMOUNT);

  const filterParams = {
    limit: amount,
    page: 1,
    continents:  translateArray(activeCategories, continentDictionary),
    countries: translateArray(selectedCountries, countryDictionary),
  };

  const { data: countries } = useCountriesQuery();
  const { data: companions, isLoading } = useCompanionsQuery(filterParams);

  return(
    <div className={styles.catalogPage}>
      <Header />
      <PageHero title="Попутчики" />

      <main className={styles.main}>
        <Container>
          {countries && <CountryFilter countries={countries.locations}/>}
          <div className={styles.cardsContainer}>
            {isLoading
              ? <Loader/>
              : companions && <CatalogCards companionsData={companions}/>}
            {/* {блок фильтрации} */}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}


export default CatalogPage;
