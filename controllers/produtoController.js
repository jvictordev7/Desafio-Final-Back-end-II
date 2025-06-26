const produtoService = require('../services/produtoService');

exports.listar = (req, res, next) => {
  produtoService.listar((err, produtos) => {
    if (err) return next(err);
    res.status(200).json(produtos);
  });
};

exports.buscar = (req, res, next) => {
  const id = req.params.id;
  produtoService.buscar(id, (err, resultado) => {
    if (err) return next(err);
    if (resultado.length === 0) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.status(200).json(resultado[0]);
  });
};

exports.criar = (req, res, next) => {
  const dados = req.body;
  produtoService.criar(dados, (err, result) => {
    if (err) return next(err);
    res.status(201).json({ mensagem: 'Produto criado com sucesso', id: result.insertId });
  });
};

exports.atualizar = (req, res, next) => {
  const id = req.params.id;
  const dados = req.body;
  produtoService.atualizar(id, dados, (err, result) => {
    if (err) return next(err);
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
  });
};

exports.deletar = (req, res, next) => {
  const id = req.params.id;
  produtoService.deletar(id, (err, result) => {
    if (err) return next(err);
    res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
  });
};
