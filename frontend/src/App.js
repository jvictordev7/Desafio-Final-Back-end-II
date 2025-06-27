import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Produtos from './pages/Produtos';
import Clientes from './pages/Clientes';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';
import Logout from './pages/Logout';
import CadastroUsuario from './pages/CadastroUsuario';
import EsqueciSenha from './pages/EsqueciSenha';
import Header from './components/Header';
import BoasVindas from './pages/BoasVindas';
import './App.css';

function AppRoutes() {
  const location = useLocation();
  const hideHeader = ['/login', '/cadastro', '/esqueci-senha', '/'].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<BoasVindas />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
