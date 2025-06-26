const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { validarProduto } = require('../utils/validator');

// Rota pública: não precisa de autenticação
router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscar);
router.post('/', validarProduto, produtoController.criar);
router.put('/:id', validarProduto, produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;
