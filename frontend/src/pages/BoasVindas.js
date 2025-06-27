import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoasVindas.css';

function BoasVindas() {
  const navigate = useNavigate();

  return (
    <div className="boasvindas-bg">
      <div className="boasvindas-container">
        <h1>Bem-vindo ao Sistema Back-end II</h1>
        <p>Gerencie clientes, produtos e usuários de forma segura e eficiente.</p>
        <button className="boasvindas-btn" onClick={() => navigate('/login')}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default BoasVindas;
