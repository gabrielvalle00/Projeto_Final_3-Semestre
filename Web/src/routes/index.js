const express = require('express');
const router = express.Router();

const pessoasController = require('../controllers/pessoasController');
const EspecialidadeController = require('../controllers/EspecialidadeController');

// router.get('/', ClienteController.index);
router.post('/cadastro/novo', pessoasController.adicionarCliente);
router.post('/cadastro/especialidades',EspecialidadeController.adicionarEspecialidade )

module.exports = router;