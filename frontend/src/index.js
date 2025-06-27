import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // <-- Use 'App' se o arquivo for 'App.js'

// Redireciona para /login ao iniciar
if (window.location.pathname === "/") {
  window.location.replace("/login");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
