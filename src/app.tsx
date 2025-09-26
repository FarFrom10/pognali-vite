import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const/enum';
import FormPage from './pages/form-page/form-page';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { useCountriesQuery } from './hooks/api/use-countires-query';
import Loader from './components/loader/loader';

function App() {
  const { data, isLoading } = useCountriesQuery();
  console.log(data);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <ScrollToTop>
      <Routes>
        <Route index path={AppRoute.Index} element={<FormPage/>}/>

      </Routes>
    </ScrollToTop>
  );
}

export default App;
