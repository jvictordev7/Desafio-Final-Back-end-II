const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioService = require('../services/usuarioService');

exports.login = (req, res, next) => {
  const { usuario, senha } = req.body;

  usuarioService.buscarPorUsuario(usuario, (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const usuarioDB = results[0];

    bcrypt.compare(senha, usuarioDB.senha, (err, same) => {
      if (!same) return res.status(401).json({ erro: 'Senha incorreta' });

      const token = jwt.sign({ id: usuarioDB.id, usuario: usuarioDB.usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
};

exports.logout = (req, res) => {
  // Invalidação de token normalmente exige blacklist; aqui apenas resposta simulada
  res.status(200).json({ mensagem: 'Logout efetuado com sucesso (token será ignorado no frontend)' });
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
