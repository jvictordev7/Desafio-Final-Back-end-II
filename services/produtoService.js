const Produto = require('../models/produtoModel');

const produtoService = {
  listar: (callback) => Produto.listarTodos(callback),

  buscar: (id, callback) => Produto.buscarPorId(id, callback),

  criar: (dados, callback) => Produto.criar(dados, callback),

  atualizar: (id, dados, callback) => Produto.atualizar(id, dados, callback),

  deletar: (id, callback) => Produto.deletar(id, callback)
};

module.exports = produtoService;
