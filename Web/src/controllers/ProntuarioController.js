const Prontuario = require('../models/DAO/Prontuario')
const { criarProntu, editarProntu,excluirProntu} = require('../models/DAL/PessoasModel');

const ProntuarioController = {
    criarConsulta: async (req,res) => {
        try{
            const {diagnostico,medicacao,id_consulta} = req.body
            const objProntu = new Prontuario (null, diagnostico,medicacao,id_consulta)
            console.log(objProntu)
            const result = await criarProntu(objProntu);
            res.status(200).json({ success: true, message: 'prontuario criado com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar prontuario:', error);
            res.status(500).json({ success: false, message: 'Erro ao criar prontuario', error });
        }
    },
    editarConsulta: async (req,res) => {
        try{
            const id = req.params.id
            const {diagnostico,medicacao} = req.body
            const objProntu = new Prontuario (id, diagnostico,medicacao)
            console.log(objProntu)
            const result = await editarProntu(objProntu);
            res.status(200).json({ success: true, message: 'prontuario editado com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar prontuario:', error);
            res.status(500).json({ success: false, message: 'Erro ao editar prontuario', error });
        }
    },
    excluirProntu: async (req,res) => {
        try{
            const id = req.params.id
            const objProntu = new Prontuario (id)
            console.log(objProntu)
            const result = await excluirProntu(objProntu);
            res.status(200).json({ success: true, message: 'prontuario excluido com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar prontuario:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir prontuario', error });
        }
    }
    
}

module.exports = ProntuarioController;