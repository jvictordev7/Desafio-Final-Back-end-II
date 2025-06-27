import React, { useState } from 'react';
import './Login.css';

function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Apenas mensagem visual, pois não há endpoint real
    setMensagem('Se este email estiver cadastrado, você receberá instruções para redefinir sua senha.');
    setEmail('');
  };

  return (
    <div className="login-dark-bg">
      <form className="login-dark-form" onSubmit={handleSubmit}>
        <h2 className="login-dark-title">Esqueci minha senha</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Seu email"
          className="login-dark-input"
          required
        />
        <button type="submit" className="login-dark-button">Enviar</button>
        {mensagem && <p style={{ color: '#27ae60', textAlign: 'center' }}>{mensagem}</p>}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="/login" style={{ color: '#f1c40f' }}>Voltar para login</a>
        </p>
      </form>
    </div>
  );
}

export default EsqueciSenha;
