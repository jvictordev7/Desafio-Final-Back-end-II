const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const db = require('../configs/db'); // Garante que a conexão com o banco possa ser encerrada

// Mock JWT_SECRET para propósitos de teste. Use a mesma chave que você usa no .env para o ambiente de teste.
process.env.JWT_SECRET = '123456'; // SUBSTITUA PELA SUA CHAVE SECRETA DE TESTE

const token = jwt.sign({ id: 1, usuario: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Clientes - Testes de Validação e Autenticação', () => {
  // Limpeza ou setup inicial do banco de dados para os testes
  beforeAll(async () => {
    // Limpar tabela de clientes antes de cada suite de testes para garantir um estado limpo
    await db.promise().query('DELETE FROM clientes'); // ADICIONADA ESTA LINHA
  });

  afterAll(async () => {
    // Garante que a conexão com o banco de dados seja encerrada após todos os testes
    await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeno delay para queries pendentes
    db.end((err) => {
      if (err) console.error('❌ Erro ao encerrar conexão com o banco:', err);
      else console.log('✅ Conexão com o banco finalizada');
    });
  });

  test('Deve negar acesso sem token', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro', 'Token não fornecido');
  });

  test('Deve listar clientes com token válido', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Testes de validação abrangentes para POST /clientes
  test('Deve recusar cliente com nome muito curto (< 3 caracteres)', async () => {
    const novoCliente = { nome: "ab", sobrenome: "Sobrenome Teste", email: "testea@email.com", idade: 30 };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Nome deve ter entre 3 e 255 caracteres');
  });

  test('Deve recusar cliente com nome muito longo (> 255 caracteres)', async () => {
    const longName = 'a'.repeat(256);
    const novoCliente = { nome: longName, sobrenome: "Sobrenome Teste", email: "testeb@email.com", idade: 30 };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Nome deve ter entre 3 e 255 caracteres');
  });

  test('Deve recusar cliente com sobrenome muito curto (< 3 caracteres)', async () => {
    const novoCliente = { nome: "Nome Teste", sobrenome: "ab", email: "testec@email.com", idade: 30 };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Sobrenome deve ter entre 3 e 255 caracteres');
  });

  test('Deve recusar cliente com email inválido', async () => {
    const novoCliente = { nome: "Nome Teste", sobrenome: "Sobrenome Teste", email: "emailinvalido", idade: 30 };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Email inválido');
  });

  test('Deve recusar cliente com idade menor ou igual a 0', async () => {
    const novoCliente = { nome: "Nome Teste", sobrenome: "Sobrenome Teste", email: "tested@email.com", idade: 0 };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Idade deve ser maior que 0 e menor que 120');
  });

  test('Deve recusar cliente com idade maior ou igual a 120', async () => {
    const novoCliente = { nome: "Nome Teste", sobrenome: "Sobrenome Teste", email: "testee@email.com", idade: 120 };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Idade deve ser maior que 0 e menor que 120');
  });

  test('Deve criar cliente com dados válidos', async () => {
    const novoCliente = { nome: "Cliente", sobrenome: "Valido", email: "clientevalido@example.com", idade: 45 };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensagem', 'Cliente criado com sucesso');
    expect(res.body).toHaveProperty('id');
  });

  // Testes de validação para PUT /clientes (semelhantes aos de POST)
  test('Deve recusar atualização de cliente com nome inválido', async () => {
    // Crie um cliente temporário para atualizar
    const tempClient = { nome: "Temp", sobrenome: "Client", email: "temp@example.com", idade: 30 };
    const createRes = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(tempClient);
    const clientId = createRes.body.id;

    const clienteAtualizado = { nome: "a", sobrenome: "Atualizado", email: "temp_updated@email.com", idade: 35 };
    const res = await request(app)
      .put(`/clientes/${clientId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(clienteAtualizado);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('Nome deve ter entre 3 e 255 caracteres');
  });
});