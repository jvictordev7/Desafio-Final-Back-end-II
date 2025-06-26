const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validarCliente } = require('../utils/validator');

// Todas as rotas exigem autenticação
router.get('/', authMiddleware, clienteController.listar);
router.get('/:id', authMiddleware, clienteController.buscar);
router.post('/', authMiddleware, validarCliente, clienteController.criar);
router.put('/:id', authMiddleware, validarCliente, clienteController.atualizar);
router.delete('/:id', authMiddleware, clienteController.deletar);

module.exports = router;
