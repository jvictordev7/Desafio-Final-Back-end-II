const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 }); // 30 segundos

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
  }
};
