import React, { useEffect } from 'react';
import api from '../services/api';

function Logout() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem('token');
    }
    window.location.href = '/login';
  }, []);

  return <div>Saindo...</div>;
}

export default Logout;
