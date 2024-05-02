import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from '@components/shared';
import { MainPage, OrderPage, AdminPage } from './pages';
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin_jyo" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
