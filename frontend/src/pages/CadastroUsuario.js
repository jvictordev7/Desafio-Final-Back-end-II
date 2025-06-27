import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function CadastroUsuario() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');
    try {
      const res = await api.post('/usuarios', { usuario, senha });
      setMensagem('Usuário criado com sucesso! Faça login.');
      setUsuario('');
      setSenha('');
      setTimeout(() => navigate('/login'), 1500);
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
      <form className="login-dark-form" onSubmit={handleCadastro}>
        <h2 className="login-dark-title">Criar Conta</h2>
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
        <button type="submit" className="login-dark-button">Cadastrar</button>
        {mensagem && <p style={{ color: '#27ae60', textAlign: 'center' }}>{mensagem}</p>}
        {erro && <p className="login-dark-error">{erro}</p>}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Já tem conta? <a href="/login" style={{ color: '#f1c40f' }}>Entrar</a>
        </p>
      </form>
    </div>
  );
}

export default CadastroUsuario;
