const express = require('express');
const router = express.Router();

const pessoasController = require('../controllers/pessoasController');
const EspecialidadeController = require('../controllers/EspecialidadeController');
const ConsultaController = require('../controllers/ConsultaController')
const ProntuarioController = require('../controllers/ProntuarioController')



// router.get('/', ClienteController.index);
router.post('/cadastro/novo', pessoasController.adicionarCliente);
router.post('/cadastro/especialidades',EspecialidadeController.adicionarEspecialidade )
router.post('/nova/consulta',ConsultaController.criarConsulta)
router.post('/cadastro/especialidades',EspecialidadeController.adicionarEspecialidade);
router.post('/criar/prontuario',ProntuarioController.criarConsulta)  
router.get('/criar/prontuario/:id',pessoasController.visualizarLogin) 


module.exports = router;