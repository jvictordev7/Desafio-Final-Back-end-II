import React, { useState } from 'react';
import api from '../services/api';

function CadastroUsuario() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/usuarios', { usuario, senha });
      setMensagem('Usuário criado com sucesso!');
    } catch (err) {
      setMensagem(err.response?.data?.erro || 'Erro ao criar usuário');
    }
  };

  return (
    <div>
      <h2>Cadastrar Usuário</h2>
      <form onSubmit={handleCadastro}>
        <input value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuário" />
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CadastroUsuario;
