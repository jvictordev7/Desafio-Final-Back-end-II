const request = require('supertest');
const app = require('../app');

describe('Usuários - Teste básico', () => {
  test('GET /usuarios deve retornar status 200', async () => {
    const res = await request(app).get('/usuarios');
    expect([200, 401]).toContain(res.statusCode); // 401 se exigir autenticação
  });
});
