import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Додаємо імпорт
import App from './App';
import './styles/index.css';
import { MythProvider } from './pages/MythContext/MythContext'; // Імпортуємо провайдер контексту міфів

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MythProvider>
        <App />
      </MythProvider>
    </BrowserRouter>
  </React.StrictMode>
);