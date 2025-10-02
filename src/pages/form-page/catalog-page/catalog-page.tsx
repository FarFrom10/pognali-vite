import styles from './catalog-page.module.scss';
import Header from '../../../components/header/header';
import { Footer } from 'react-day-picker';
import PageHero from '../../../components/page-hero/page-hero';
import CountryFilter from '../../../components/country-filter/country-filter';
import { useCountriesQuery } from '../../../hooks/api/use-countires-query';
import { CountryFilterProvider } from '../../../context/county-filter/country-filter-provider';

function CatalogPage () {
  const { data: countries } = useCountriesQuery();

  return(
    <CountryFilterProvider>
      <div className={styles.catalogPage}>
        <Header />
        <PageHero title="Попутчики" />

        <main className={styles.main}>
          {countries && <CountryFilter countries={countries.locations}/>}
        </main>

        <Footer />
      </div>
    </CountryFilterProvider>
  );
}


export default CatalogPage;
