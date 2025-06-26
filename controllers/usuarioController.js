const usuarioService = require('../services/usuarioService');

exports.listarUsuarios = (req, res, next) => {
  usuarioService.listarUsuarios((err, usuarios) => {
    if (err) return next(err);
    res.status(200).json(usuarios);
  });
};
