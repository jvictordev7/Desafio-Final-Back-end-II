const request = require('supertest');
const app = require('../app'); // certifique-se de exportar app.js como módulo
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 1, usuario: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Clientes - Testes de Validação e Autenticação', () => {
  test('Deve negar acesso sem token', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro');
  });

  test('Deve listar clientes com token válido', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Deve recusar cliente com idade inválida', async () => {
    const novoCliente = {
      nome: "Test",
      sobrenome: "User",
      email: "teste@email.com",
      idade: 150
    };

    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});

const db = require('../configs/db');

afterAll(async () => {
  // Aguarda um pequeno tempo para garantir que todas as queries terminaram
  await new Promise((resolve) => setTimeout(resolve, 100));
  db.end((err) => {
    if (err) console.error('❌ Erro ao encerrar conexão com o banco:', err);
    else console.log('✅ Conexão com o banco finalizada');
  });
});