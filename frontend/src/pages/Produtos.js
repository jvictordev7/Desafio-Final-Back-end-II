import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Produtos.css';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', data_atualizado: '' });
  const [editId, setEditId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  // Carrega produtos ao montar
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    api.get('/produtos')
      .then(res => setProdutos(res.data))
      .catch(() => setProdutos([]));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limparForm = () => {
    setForm({ nome: '', descricao: '', preco: '', data_atualizado: '' });
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
        await api.put(`/produtos/${editId}`, form);
        setMensagem('Produto atualizado com sucesso!');
      } else {
        await api.post('/produtos', form);
        setMensagem('Produto adicionado com sucesso!');
      }
      carregarProdutos();
      limparForm();
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao salvar produto');
    }
  };

  const handleEdit = (produto) => {
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      data_atualizado: produto.data_atualizado?.slice(0, 10) || ''
    });
    setEditId(produto.id);
    setMensagem('');
    setErro('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente deletar este produto?')) {
      try {
        await api.delete(`/produtos/${id}`);
        setMensagem('Produto deletado com sucesso!');
        carregarProdutos();
        limparForm();
      } catch (err) {
        setErro('Erro ao deletar produto');
      }
    }
  };

  return (
    <div className="produtos-bg">
      <div className="produtos-container">
        <h2 className="produtos-title">Produtos</h2>
        <form className="produtos-form" onSubmit={handleSubmit}>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="produtos-input"
            required
          />
          <input
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            className="produtos-input"
            required
          />
          <input
            name="preco"
            value={form.preco}
            onChange={handleChange}
            placeholder="Preço"
            type="number"
            min="0"
            step="0.01"
            className="produtos-input"
            required
          />
          <input
            name="data_atualizado"
            value={form.data_atualizado}
            onChange={handleChange}
            placeholder="Data Atualizado"
            type="date"
            className="produtos-input"
            required
          />
          <button type="submit" className="produtos-button">
            {editId ? 'Salvar Alterações' : 'Adicionar Produto'}
          </button>
          {editId && (
            <button type="button" className="produtos-button-cancel" onClick={limparForm}>
              Cancelar
            </button>
          )}
        </form>
        {mensagem && <p className="produtos-msg">{mensagem}</p>}
        {erro && <p className="produtos-erro">{erro}</p>}
        <ul className="produtos-lista">
          {produtos.map(prod => (
            <li key={prod.id} className="produtos-item">
              <div>
                <strong>{prod.nome}</strong> - {prod.descricao} <br />
                <span>R$ {prod.preco} | Atualizado: {prod.data_atualizado?.slice(0, 10)}</span>
              </div>
              <div>
                <button className="produtos-edit" onClick={() => handleEdit(prod)}>Editar</button>
                <button className="produtos-delete" onClick={() => handleDelete(prod.id)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Produtos;
