const express = require('express');
const router = express.Router();

const pessoasController = require('../controllers/PessoasController');
const EspecialidadeController = require('../controllers/EspecialidadeController');
const ConsultaController = require('../controllers/ConsultaController')
const ProntuarioController = require('../controllers/ProntuarioController')
const EnderecoController = require('../controllers/EnderecoController')
const FuncionarioController = require('../controllers/FuncionarioController')
const PerfilController = require('../controllers/PerfilController')
const TelefoneController = require('../controllers/TelefoneController')



// router.get('/', ClienteController.index);
router.post('/cadastro/novo', pessoasController.adicionarCliente);
router.post('/cadastro/especialidades',EspecialidadeController.adicionarEspecialidade)
router.post('/nova/consulta',ConsultaController.criarConsulta)
router.post('/cadastro/especialidades',EspecialidadeController.adicionarEspecialidade);
router.post('/criar/prontuario',ProntuarioController.criarConsulta)  
router.get('/login/:id',pessoasController.visualizarLogin) 
router.get('/paciente/:id',pessoasController.visualizarPaciente) 
router.get('/funcionario/:id',pessoasController.visualizarFuncionario) 
router.put('/alterar/login/:id',pessoasController.atualizarLogin)
router.put('/alterar/consulta/:id',ConsultaController.editarConsulta)
router.put('/alterar/especialidade/:id',EspecialidadeController.updateModalidade)
router.put('/alterar/endereco/:id',EnderecoController.updateEndereco)
router.put('/alterar/pessoa/:id',pessoasController.updatePessoa)
router.put('/alterar/funcionario/:id',FuncionarioController.updateFuncionario)
router.put('/alterar/perfil/:id',PerfilController.atualizarPerfil)
router.put('/alterar/telefone/:id',TelefoneController.updateTelefone) 
router.put('/alterar/prontuario/:id',ProntuarioController.editarConsulta)
router.delete('/deletar/login/:id',pessoasController.deletarLogin)
router.delete('/deletar/consulta/:id',ConsultaController.excluirConsulta)
router.delete('/deletar/modalidade/:id',EspecialidadeController.deleteModalidade)
router.delete('/deletar/prontuario/:id',ProntuarioController.excluirProntu)
router.delete('/deletar/endereco/:id',EnderecoController.deletarEndereco)
router.delete('/deleter/telefone/:id',TelefoneController.deletarTelefone)
router.delete('/deletar/pessoa/:id', pessoasController.deletarPessoa)
router.delete('/deletar/funcionario/:id',FuncionarioController.deletarFuncionario)

module.exports = router;