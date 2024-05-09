import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from '@components/shared';
import { MainPage, OrderPage, AdminPage } from './pages';
import { Suspense } from 'react';
import { ErrorBoundary } from './components';

function App() {
  return (
    <ErrorBoundary fallback={<div>error</div>}>
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
    </ErrorBoundary>
  );
}

export default App;
