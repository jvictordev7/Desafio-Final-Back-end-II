import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importe o CSS customizado

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const res = await api.post('/login', { usuario, senha });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/produtos');
      } else {
        setErro('Resposta inesperada do servidor.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.erro) {
        setErro(err.response.data.erro);
      } else {
        setErro('Erro ao conectar ao servidor.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          placeholder="Usuário"
          className="login-input"
        />
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          placeholder="Senha"
          className="login-input"
        />
        <button type="submit" className="login-button">Entrar</button>
        {erro && <p className="login-error">{erro}</p>}
      </form>
    </div>
  );
}

export default Login;
