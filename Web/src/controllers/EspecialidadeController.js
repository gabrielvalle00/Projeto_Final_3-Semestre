const { insertModalidade,deleteModalidade,updateModalidade } = require('../models/DAL/pessoasModel');
const Especialidade = require('../models/DAO/Especialidade')

const EspecialidadeController = {
    adicionarEspecialidade: async (req, res) => {
        try {
            const {desc_especialidade} = req.body;
            const objEspecialidade = new Especialidade(null, desc_especialidade);
            console.log(objEspecialidade)
            const result = await insertModalidade(objEspecialidade);
            console.log(objEspecialidade)
            res.status(200).json({ success: true, message: 'Especialidade adicionada com sucesso!', result });
        } catch (error) {
            console.error('Erro ao adicionar Especialidade:', error);
            res.status(500).json({ success: false, message: 'Erro ao adicionar Especialidade', error });
        }
    },
    deleteModalidade: async (req, res) => {
        try {
            const id = req.params.id
            const objEspe = new Especialidade(id)
            console.log(objEspe)
            const result = await deleteModalidade(objEspe);
            res.status(200).json({ success: true, message: 'Especialidade eccluida com sucesso!', result });
        } catch (error) {
            console.error('Erro ao excluir Especialidade:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Especialidade', error });
        }
    },
    updateModalidade: async (req,res) => {
        try {
            const id = req.params.id
            const {desc_especialidade} = req.body
            console.log(desc_especialidade)
            const obgEspe = new Especialidade(id,desc_especialidade)
            console.log(obgEspe)
            const result = await updateModalidade(obgEspe);
            res.status(200).json({ success: true, message: 'Especialidade atualizada com sucesso!',result});
        } catch (error) {
            console.error('Erro ao excluir Especialidade:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Especialidade', error });
        }
    }
};

module.exports = EspecialidadeController;