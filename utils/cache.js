const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 }); // 30 segundos para clientes
const jwtBlacklistCache = new NodeCache({ stdTTL: 3600 }); // 1 hora para JWTs (ajuste conforme o expiresIn do seu JWT)

module.exports = {
  get: (key) => {
    const value = cache.get(key);
    if (value) {
      console.log('📦 From Cache');
    } else {
      console.log('🗄️ From Database');
    }
    return value;
  },

  set: (key, value) => {
    cache.set(key, value);
  },

  del: (key) => {
    cache.del(key);
    console.log(`❌ Cache invalidado: ${key}`);
  },

  // Funções para JWT Blacklist
  addToBlacklist: (token) => {
    // Adiciona o token à blacklist. O TTL deve ser o mesmo do token JWT para que ele expire da blacklist naturalmente.
    jwtBlacklistCache.set(token, true);
    console.log(`⚫ JWT adicionado à blacklist: ${token.substring(0, 10)}...`);
  },

  isBlacklisted: (token) => {
    return jwtBlacklistCache.has(token);
  },

  clearAllCaches: () => {
    cache.flushAll();
    jwtBlacklistCache.flushAll();
    console.log('🧹 Todos os caches foram limpos.');
  }
};