import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const/enum';
import FormPage from './pages/form-page/form-page';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  fetch(`${API_URL}/api/countries`)
    .then((res) => res.json())
    .then((data) => console.log(data));

  return (
    <ScrollToTop>
      <Routes>
        <Route index path={AppRoute.Index} element={<FormPage/>}/>

      </Routes>
    </ScrollToTop>
  );
}

export default App;
