require('dotenv').config();
const express = require('express');
const app = express();

const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: '🚀 API Back-end II rodando com sucesso!' });
});

app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/', authRoutes);

app.use(errorHandler);

module.exports = app; 
