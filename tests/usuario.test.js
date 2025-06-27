const request = require('supertest');
const app = require('../app');
const db = require('../configs/db'); // Garante que a conexão com o banco possa ser encerrada
const cache = require('../utils/cache'); // Para limpar o cache de blacklist em testes se necessário

// Mock JWT_SECRET para propósitos de teste
process.env.JWT_SECRET = '123456'; // SUBSTITUA PELA SUA CHAVE SECRETA DE TESTE

describe('Usuários - Testes Completos', () => {
  let adminToken; // Token para requisições autenticadas

  beforeAll(async () => {
    // Limpar usuários existentes para garantir um estado limpo para os testes de criação
    await db.promise().query('DELETE FROM usuarios');
    cache.clearAllCaches(); // Limpa o cache de blacklist antes dos testes

    // Registrar um usuário de teste para login e requisições autenticadas
    await request(app)
      .post('/usuarios') // Rota de registro no authRoutes.js
      .send({ usuario: 'testuser', senha: 'testpassword' });

    // Fazer login com o usuário de teste para obter um token válido
    const loginRes = await request(app)
      .post('/login')
      .send({ usuario: 'testuser', senha: 'testpassword' });
    adminToken = loginRes.body.token;
  });

  afterAll(async () => {
    // Limpeza do banco de dados após todos os testes
    await db.promise().query('DELETE FROM usuarios WHERE usuario = "testuser" OR usuario = "novo_usuario_teste" OR usuario = "usuario_logout"');
    cache.clearAllCaches(); // Limpa o cache de blacklist

    await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeno delay para queries pendentes
    db.end((err) => {
      if (err) console.error('❌ Erro ao encerrar conexão com o banco:', err);
      else console.log('✅ Conexão com o banco finalizada');
    });
  });

  test('GET /usuarios deve retornar status 200 para usuário autenticado', async () => {
    const res = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Deve conter pelo menos o 'testuser'
    expect(res.body[0]).toHaveProperty('usuario');
    expect(res.body[0]).not.toHaveProperty('senha'); // Senha não deve ser retornada
  });

  test('GET /usuarios deve retornar status 401 sem autenticação', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro', 'Token não fornecido');
  });

  test('POST /usuarios deve criar um novo usuário', async () => {
    const newUser = { usuario: 'novo_usuario_teste', senha: 'novasenha' };
    const res = await request(app)
      .post('/usuarios')
      .send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensagem', 'Usuário criado com sucesso');
    expect(res.body).toHaveProperty('id');
  });

  test('POST /usuarios deve recusar a criação de usuário duplicado', async () => {
    // Tenta criar 'testuser' novamente (já criado no beforeAll)
    const existingUser = { usuario: 'testuser', senha: 'password' };
    const res = await request(app)
      .post('/usuarios')
      .send(existingUser);
    expect(res.statusCode).toBe(400); // Espera bad request ou conflito devido à constraint UNIQUE
    expect(res.body).toHaveProperty('erro');
  });

  test('POST /login deve autenticar com credenciais válidas e retornar token', async () => {
    const credentials = { usuario: 'testuser', senha: 'testpassword' };
    const res = await request(app)
      .post('/login')
      .send(credentials);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  test('POST /login deve negar autenticação com senha incorreta', async () => {
    const credentials = { usuario: 'testuser', senha: 'wrongpassword' };
    const res = await request(app)
      .post('/login')
      .send(credentials);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro', 'Senha incorreta');
  });

  test('POST /logout deve invalidar o token', async () => {
    // Primeiro, faz login para obter um token fresco para este teste
    const loginRes = await request(app)
      .post('/login')
      .send({ usuario: 'testuser', senha: 'testpassword' });
    const freshToken = loginRes.body.token;

    // Em seguida, faz logout
    const logoutRes = await request(app)
      .post('/logout')
      .set('Authorization', `Bearer ${freshToken}`);
    expect(logoutRes.statusCode).toBe(200);
    expect(logoutRes.body).toHaveProperty('mensagem', 'Logout efetuado com sucesso (token invalidado)');

    // Tenta acessar uma rota protegida com o token invalidado
    const protectedRes = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${freshToken}`);
    expect(protectedRes.statusCode).toBe(401);
    expect(protectedRes.body).toHaveProperty('erro', 'Token inválido ou expirado (blacklist)');
  });
});