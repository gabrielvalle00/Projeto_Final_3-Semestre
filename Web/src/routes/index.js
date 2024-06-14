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
router.get('/login/:id',pessoasController.visualizarLogin) 
router.get('/paciente/:id',pessoasController.visualizarPaciente) 
router.get('/funcionario/:id',pessoasController.visualizarFuncionario) 
router.put('/alterar/login/:id',pessoasController.atualizarLogin)
router.put('/alterar/consulta/:id',ConsultaController.editarConsulta)
router.delete('/deletar/login/:id',pessoasController.deletarLogin)
router.delete('/deletar/consulta/:id',ConsultaController.excluirConsulta)
module.exports = router;