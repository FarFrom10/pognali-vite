import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const/enum';
import FormPage from './pages/form-page/form-page';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { useCountriesQuery } from './hooks/api/use-countires-query';
import Loader from './components/loader/loader';
import CatalogPage from './pages/form-page/catalog-page/catalog-page';
import { CountryFilterProvider } from './context/county-filter/country-filter-provider';

function App() {
  const { isLoading } = useCountriesQuery();

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <ScrollToTop>
      <Routes>
        <Route index path={AppRoute.Index} element={<FormPage/>}/>
        <Route path={AppRoute.Catalog} element={
          <CountryFilterProvider>
            <CatalogPage/>
          </CountryFilterProvider>
        }
        />
      </Routes>
    </ScrollToTop>
  );
}

export default App;
