module.exports = (err, req, res, next) => {
  console.error('🧨 Erro:', err.stack);
  // Retorna 400 para erros de constraint/validação do MySQL
  if (
    err.code === 'ER_CHECK_CONSTRAINT_VIOLATED' ||
    err.code === 'ER_DUP_ENTRY' || // Adicionado para capturar erros de chave única duplicada
    (err.sqlMessage && err.sqlMessage.includes('CONSTRAINT'))
  ) {
    return res.status(400).json({ erro: 'Dados inválidos: ' + err.sqlMessage });
  }
  res.status(500).json({ erro: 'Erro interno no servidor.' });
};