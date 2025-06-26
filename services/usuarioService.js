const Usuario = require('../models/usuarioModel');

const usuarioService = {
  criarUsuario: (usuario, senhaHash, callback) => {
    Usuario.criar(usuario, senhaHash, callback);
  },

  buscarPorUsuario: (usuario, callback) => {
    Usuario.buscarPorUsuario(usuario, callback);
  },

  listarUsuarios: (callback) => {
    Usuario.listarTodos(callback);
  }
};

module.exports = usuarioService;
