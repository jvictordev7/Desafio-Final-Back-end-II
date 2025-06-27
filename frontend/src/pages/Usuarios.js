import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    api.get('/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsuarios(res.data))
      .catch(() => setUsuarios([]));
  }, [token]);

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {usuarios.map(user => (
          <li key={user.id}>{user.usuario}</li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
