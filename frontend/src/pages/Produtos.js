import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/produtos')
      .then(res => setProdutos(res.data))
      .catch(() => setProdutos([]));
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtos.map(prod => (
          <li key={prod.id}>{prod.nome} - R$ {prod.preco}</li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
