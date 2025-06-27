import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Clientes.css';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nome: '', sobrenome: '', email: '', idade: '' });
  const [editId, setEditId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    api.get('/clientes')
      .then(res => setClientes(res.data))
      .catch(() => setClientes([]));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limparForm = () => {
    setForm({ nome: '', sobrenome: '', email: '', idade: '' });
    setEditId(null);
    setErro('');
    setMensagem('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    try {
      if (editId) {
        await api.put(`/clientes/${editId}`, form);
        setMensagem('Cliente atualizado com sucesso!');
      } else {
        await api.post('/clientes', form);
        setMensagem('Cliente adicionado com sucesso!');
      }
      carregarClientes();
      limparForm();
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao salvar cliente');
    }
  };

  const handleEdit = (cliente) => {
    setForm({
      nome: cliente.nome,
      sobrenome: cliente.sobrenome,
      email: cliente.email,
      idade: cliente.idade
    });
    setEditId(cliente.id);
    setMensagem('');
    setErro('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente deletar este cliente?')) {
      try {
        await api.delete(`/clientes/${id}`);
        setMensagem('Cliente deletado com sucesso!');
        carregarClientes();
        limparForm();
      } catch (err) {
        setErro('Erro ao deletar cliente');
      }
    }
  };

  return (
    <div className="clientes-bg">
      <div className="clientes-container">
        <h2 className="clientes-title">Clientes</h2>
        <form className="clientes-form" onSubmit={handleSubmit}>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="clientes-input"
            required
          />
          <input
            name="sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            placeholder="Sobrenome"
            className="clientes-input"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="clientes-input"
            required
          />
          <input
            name="idade"
            value={form.idade}
            onChange={handleChange}
            placeholder="Idade"
            type="number"
            min="1"
            max="119"
            className="clientes-input"
            required
          />
          <button type="submit" className="clientes-button">
            {editId ? 'Salvar Alterações' : 'Adicionar Cliente'}
          </button>
          {editId && (
            <button type="button" className="clientes-button-cancel" onClick={limparForm}>
              Cancelar
            </button>
          )}
        </form>
        {mensagem && <p className="clientes-msg">{mensagem}</p>}
        {erro && <p className="clientes-erro">{erro}</p>}
        <ul className="clientes-lista">
          {clientes.map(cli => (
            <li key={cli.id} className="clientes-item">
              <div>
                <strong>{cli.nome} {cli.sobrenome}</strong> <br />
                <span>{cli.email} | Idade: {cli.idade}</span>
              </div>
              <div>
                <button className="clientes-edit" onClick={() => handleEdit(cli)}>Editar</button>
                <button className="clientes-delete" onClick={() => handleDelete(cli.id)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Clientes;
