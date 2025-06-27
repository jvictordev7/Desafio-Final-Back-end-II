import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="main-header">
      <nav>
        <Link to="/produtos" className="header-link">Produtos</Link>
        <Link to="/clientes" className="header-link">Clientes</Link>
        <button className="header-logout" onClick={handleLogout}>Sair</button>
      </nav>
    </header>
  );
}

export default Header;
