import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Altere se seu backend estiver em outra porta ou endereço
});

// Adiciona o token JWT em todas as requisições, se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
