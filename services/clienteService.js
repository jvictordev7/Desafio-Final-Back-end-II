const Cliente = require('../models/clienteModel');

const clienteService = {
  listar: (callback) => Cliente.listarTodos(callback),
  buscar: (id, callback) => Cliente.buscarPorId(id, callback),
  criar: (dados, callback) => Cliente.criar(dados, callback),
  atualizar: (id, dados, callback) => Cliente.atualizar(id, dados, callback),
  deletar: (id, callback) => Cliente.deletar(id, callback)
};

module.exports = clienteService;
