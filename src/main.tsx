import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { FinanceProvider } from './contexts/FinanceContext'

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <FinanceProvider>
        <App />
      </FinanceProvider>
    </React.StrictMode>,
  );
}
