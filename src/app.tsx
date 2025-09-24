import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const/enum';
import FormPage from './pages/form-page/form-page';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route index path={AppRoute.Index} element={<FormPage/>}/>

      </Routes>
    </ScrollToTop>
  );
}

export default App;
