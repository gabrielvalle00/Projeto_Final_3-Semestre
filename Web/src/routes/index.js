const express = require('express');
const router = express.Router();

const pessoasController = require('../controllers/pessoasController');

// router.get('/', ClienteController.index);
router.post('/cadastro/novo', pessoasController.adicionarCliente);

module.exports = router;