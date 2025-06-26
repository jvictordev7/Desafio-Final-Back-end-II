const db = require('../configs/db');

const Produto = {
  listarTodos: (callback) => {
    db.query('SELECT * FROM produtos', callback);
  },

  buscarPorId: (id, callback) => {
    db.query('SELECT * FROM produtos WHERE id = ?', [id], callback);
  },

  criar: (produto, callback) => {
    const { nome, descricao, preco, data_atualizado } = produto;
    const query = 'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, descricao, preco, data_atualizado], callback);
  },

  atualizar: (id, produto, callback) => {
    const { nome, descricao, preco, data_atualizado } = produto;
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?';
    db.query(query, [nome, descricao, preco, data_atualizado, id], callback);
  },

  deletar: (id, callback) => {
    db.query('DELETE FROM produtos WHERE id = ?', [id], callback);
  }
};

module.exports = Produto;
