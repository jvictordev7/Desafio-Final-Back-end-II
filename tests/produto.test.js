const request = require('supertest');
const app = require('../app');
const db = require('../configs/db'); // Garante que a conexão com o banco possa ser encerrada

describe('Produtos - Testes de Validação', () => {
  afterAll(async () => {
    // Garante que a conexão com o banco de dados seja encerrada após todos os testes
    await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeno delay para queries pendentes
    db.end((err) => {
      if (err) console.error('❌ Erro ao encerrar conexão com o banco:', err);
      else console.log('✅ Conexão com o banco finalizada');
    });
  });

  test('GET /produtos deve retornar status 200', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
  });

  // Testes de validação abrangentes para POST /produtos
  test('Deve recusar produto com nome muito curto (< 3 caracteres)', async () => {
    const novoProduto = { nome: "ab", descricao: "Descricao Teste", preco: 10.50, data_atualizado: "2024-01-01" };
    const res = await request(app)
      .post('/produtos')
      .send(novoProduto);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Nome do produto deve ter entre 3 e 255 caracteres');
  });

  test('Deve recusar produto com nome muito longo (> 255 caracteres)', async () => {
    const longName = 'a'.repeat(256);
    const novoProduto = { nome: longName, descricao: "Descricao Teste", preco: 10.50, data_atualizado: "2024-01-01" };
    const res = await request(app)
      .post('/produtos')
      .send(novoProduto);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Nome do produto deve ter entre 3 e 255 caracteres');
  });

  test('Deve recusar produto com descrição muito curta (< 3 caracteres)', async () => {
    const novoProduto = { nome: "Produto Teste", descricao: "ab", preco: 10.50, data_atualizado: "2024-01-01" };
    const res = await request(app)
      .post('/produtos')
      .send(novoProduto);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Descrição deve ter entre 3 e 255 caracteres');
  });

  test('Deve recusar produto com preço menor ou igual a 0', async () => {
    const novoProduto = { nome: "Produto Teste", descricao: "Descricao Teste", preco: 0, data_atualizado: "2024-01-01" };
    const res = await request(app)
      .post('/produtos')
      .send(novoProduto);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Preço deve ser positivo');
  });

  test('Deve recusar produto com data anterior a 2000-01-01', async () => {
    const novoProduto = { nome: "Produto Teste", descricao: "Descricao Teste", preco: 10.50, data_atualizado: "1999-12-31" };
    const res = await request(app)
      .post('/produtos')
      .send(novoProduto);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Data deve estar entre 01/01/2000 e 20/06/2025');
  });

  test('Deve recusar produto com data posterior a 2025-06-20', async () => {
    const novoProduto = { nome: "Produto Teste", descricao: "Descricao Teste", preco: 10.50, data_atualizado: "2025-06-21" };
    const res = await request(app)
      .post('/produtos')
      .send(novoProduto);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Data deve estar entre 01/01/2000 e 20/06/2025');
  });

  test('Deve criar produto com dados válidos', async () => {
    const novoProduto = { nome: "Produto Valido", descricao: "Descricao Valida", preco: 25.75, data_atualizado: "2023-05-15" };
    const res = await request(app)
      .post('/produtos')
      .send(novoProduto);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensagem', 'Produto criado com sucesso');
    expect(res.body).toHaveProperty('id');
  });

  // Testes de validação para PUT /produtos
  test('Deve recusar atualização de produto com preço inválido', async () => {
    // Crie um produto temporário para atualizar
    const tempProduct = { nome: "Temp Prod", descricao: "Desc Temp", preco: 100, data_atualizado: "2024-01-01" };
    const createRes = await request(app).post('/produtos').send(tempProduct);
    const productId = createRes.body.id;

    const produtoAtualizado = { nome: "Produto Att", descricao: "Desc Att", preco: -5, data_atualizado: "2024-02-01" };
    const res = await request(app)
      .put(`/produtos/${productId}`)
      .send(produtoAtualizado);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Preço deve ser positivo');
  });
});