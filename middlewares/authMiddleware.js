const jwt = require('jsonwebtoken');
const cache = require('../utils/cache'); // Importa o utilitário de cache

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];

  // Verifica se o token está na blacklist
  if (cache.isBlacklisted(token)) {
    return res.status(401).json({ erro: 'Token inválido ou expirado (blacklist)' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ erro: 'Token inválido' });

    req.usuario = decoded;
    next();
  });
};