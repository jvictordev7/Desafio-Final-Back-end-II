import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

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
    <div className="login-dark-bg">
      <form className="login-dark-form" onSubmit={handleLogin}>
        <h2 className="login-dark-title">Acesse o Sistema</h2>
        <input
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          placeholder="Usuário"
          className="login-dark-input"
        />
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          placeholder="Senha"
          className="login-dark-input"
        />
        <button type="submit" className="login-dark-button">Entrar</button>
        {erro && <p className="login-dark-error">{erro}</p>}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/cadastro" style={{ color: '#f1c40f', marginRight: 16 }}>Criar conta</Link>
          <Link to="/esqueci-senha" style={{ color: '#f1c40f' }}>Esqueci minha senha</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
