const { insertModalidade } = require('../models/DAL/pessoasModel');
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
    }
};

module.exports = EspecialidadeController;