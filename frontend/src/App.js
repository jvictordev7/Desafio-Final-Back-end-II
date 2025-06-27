import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produtos from './pages/Produtos';
import Clientes from './pages/Clientes';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';
import Logout from './pages/Logout';
import CadastroUsuario from './pages/CadastroUsuario';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
