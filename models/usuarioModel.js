const db = require('../configs/db');

const Usuario = {
  criar: (usuario, senhaHash, callback) => {
    const query = 'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)';
    db.query(query, [usuario, senhaHash], callback);
  },

  buscarPorUsuario: (usuario, callback) => {
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    db.query(query, [usuario], callback);
  },

  listarTodos: (callback) => {
    const query = 'SELECT id, usuario FROM usuarios';
    db.query(query, callback);
  }
};

module.exports = Usuario;
