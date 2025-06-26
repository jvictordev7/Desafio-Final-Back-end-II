const request = require('supertest');
const app = require('../app');

describe('Produtos - Teste básico', () => {
  test('GET /produtos deve retornar status 200', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
  });
});
