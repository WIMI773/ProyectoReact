// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 👇 importa tu provider
import { CarritoProvider } from './Pages/components/CarritoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarritoProvider>   {/* 👈 Aquí envuelves todo */}
      <App />
    </CarritoProvider>
  </React.StrictMode>
);

reportWebVitals();
