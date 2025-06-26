function validarCliente(req, res, next) {
  const { nome, sobrenome, email, idade } = req.body;
  if (!nome || nome.length < 3 || nome.length > 255) {
    return res.status(400).json({ erro: 'Nome deve ter entre 3 e 255 caracteres' });
  }
  if (!sobrenome || sobrenome.length < 3 || sobrenome.length > 255) {
    return res.status(400).json({ erro: 'Sobrenome deve ter entre 3 e 255 caracteres' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ erro: 'Email inválido' });
  }
  if (!idade || idade <= 0 || idade >= 120) {
    return res.status(400).json({ erro: 'Idade deve ser maior que 0 e menor que 120' });
  }
  next();
}

function validarProduto(req, res, next) {
  const { nome, descricao, preco, data_atualizado } = req.body;
  if (!nome || nome.length < 3 || nome.length > 255) {
    return res.status(400).json({ erro: 'Nome do produto deve ter entre 3 e 255 caracteres' });
  }
  if (!descricao || descricao.length < 3 || descricao.length > 255) {
    return res.status(400).json({ erro: 'Descrição deve ter entre 3 e 255 caracteres' });
  }
  if (!preco || preco <= 0) {
    return res.status(400).json({ erro: 'Preço deve ser positivo' });
  }
  const dataMin = new Date('2000-01-01');
  const dataMax = new Date('2025-06-20');
  const data = new Date(data_atualizado);
  if (!(data instanceof Date) || isNaN(data) || data < dataMin || data > dataMax) {
    return res.status(400).json({ erro: 'Data deve estar entre 01/01/2000 e 20/06/2025' });
  }
  next();
}

module.exports = { validarCliente, validarProduto };
