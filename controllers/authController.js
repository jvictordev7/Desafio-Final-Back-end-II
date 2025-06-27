const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioService = require('../services/usuarioService');
const cache = require('../utils/cache'); // Importa o utilitário de cache

exports.login = (req, res, next) => {
  const { usuario, senha } = req.body;

  usuarioService.buscarPorUsuario(usuario, (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const usuarioDB = results[0];

    bcrypt.compare(senha, usuarioDB.senha, (err, same) => {
      if (!same) return res.status(401).json({ erro: 'Senha incorreta' });

      const token = jwt.sign({ id: usuarioDB.id, usuario: usuarioDB.usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Se você fosse armazenar o token na coluna 'token' da tabela usuarios, seria aqui:
      // usuarioService.atualizarToken(usuarioDB.id, token, (updateErr, updateResult) => {
      //   if (updateErr) return next(updateErr);
      //   res.status(200).json({ token });
      // });
      res.status(200).json({ token });
    });
  });
};

exports.logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    cache.addToBlacklist(token); // Adiciona o token à blacklist
  }
  res.status(200).json({ mensagem: 'Logout efetuado com sucesso (token invalidado)' });
};

exports.registrar = (req, res, next) => {
  const { usuario, senha } = req.body;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return next(err);

    usuarioService.criarUsuario(usuario, hash, (err, result) => {
      if (err) return next(err);
      res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: result.insertId });
    });
  });
};