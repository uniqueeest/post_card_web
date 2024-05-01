import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from '@components/shared';
import { MainPage, OrderPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
