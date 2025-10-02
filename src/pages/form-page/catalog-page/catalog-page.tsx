import styles from './catalog-page.module.scss';
import Header from '../../../components/header/header';
import PageHero from '../../../components/page-hero/page-hero';
import CountryFilter from '../../../components/country-filter/country-filter';
import { useCountriesQuery } from '../../../hooks/api/use-countires-query';
import { CountryFilterProvider } from '../../../context/county-filter/country-filter-provider';
import Footer from '../../../components/footer/footer';
import CatalogCards from '../../../components/catalog-cards/catalog-cards';
import { useCompanionsQuery } from '../../../hooks/api/use-companions-query';

function CatalogPage () {
  const { data: countries } = useCountriesQuery();
  const {data: companions} = useCompanionsQuery();
  console.log(companions);

  return(
    <CountryFilterProvider>
      <div className={styles.catalogPage}>
        <Header />
        <PageHero title="Попутчики" />

        <main className={styles.main}>
          {countries && <CountryFilter countries={countries.locations}/>}
          <div className={styles.cardsContainer}>
            {companions && <CatalogCards companionsData={companions}/>}
            {/* {блок фильтрации} */}
          </div>
        </main>

        <Footer />
      </div>
    </CountryFilterProvider>
  );
}


export default CatalogPage;
