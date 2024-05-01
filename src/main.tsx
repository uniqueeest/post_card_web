import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { AlertContext } from './contexts/alertContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertContext>
      <App />
    </AlertContext>
  </React.StrictMode>
);
