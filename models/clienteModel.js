const db = require('../configs/db');

const Cliente = {
  listarTodos: (callback) => {
    db.query('SELECT * FROM clientes', callback);
  },

  buscarPorId: (id, callback) => {
    db.query('SELECT * FROM clientes WHERE id = ?', [id], callback);
  },

  criar: (dados, callback) => {
    const { nome, sobrenome, email, idade } = dados;
    const query = 'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, sobrenome, email, idade], callback);
  },

  atualizar: (id, dados, callback) => {
    const { nome, sobrenome, email, idade } = dados;
    const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?';
    db.query(query, [nome, sobrenome, email, idade, id], callback);
  },

  deletar: (id, callback) => {
    db.query('DELETE FROM clientes WHERE id = ?', [id], callback);
  }
};

module.exports = Cliente;
