import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    api.get('/clientes', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setClientes(res.data))
      .catch(() => setClientes([]));
  }, [token]);

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cli => (
          <li key={cli.id}>{cli.nome} {cli.sobrenome} - {cli.email} - Idade: {cli.idade}</li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
