const clienteService = require('../services/clienteService');
const cache = require('../utils/cache');

exports.listar = (req, res, next) => {
  const cacheKey = 'clientes';

  const cached = cache.get(cacheKey);
  if (cached) return res.status(200).json(cached);

  clienteService.listar((err, clientes) => {
    if (err) return next(err);
    cache.set(cacheKey, clientes);
    res.status(200).json(clientes);
  });
};

exports.buscar = (req, res, next) => {
  const id = req.params.id;
  clienteService.buscar(id, (err, resultado) => {
    if (err) return next(err);
    if (resultado.length === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.status(200).json(resultado[0]);
  });
};

exports.criar = (req, res, next) => {
  const dados = req.body;
  clienteService.criar(dados, (err, result) => {
    if (err) return next(err);
    cache.del('clientes'); // Invalida cache
    res.status(201).json({ mensagem: 'Cliente criado com sucesso', id: result.insertId });
  });
};

exports.atualizar = (req, res, next) => {
  const id = req.params.id;
  const dados = req.body;
  clienteService.atualizar(id, dados, (err, result) => {
    if (err) return next(err);
    cache.del('clientes');
    res.status(200).json({ mensagem: 'Cliente atualizado com sucesso' });
  });
};

exports.deletar = (req, res, next) => {
  const id = req.params.id;
  clienteService.deletar(id, (err, result) => {
    if (err) return next(err);
    cache.del('clientes');
    res.status(200).json({ mensagem: 'Cliente deletado com sucesso' });
  });
};
