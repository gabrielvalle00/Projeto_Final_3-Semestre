const { insertModalidade } = require('../models/DAL/pessoasModel');
import Especialidade from('../models/DAO/Especialidade');

const EspecialidadeController = {
    adicionarEspecialidade: async (req, res) => {
        try {
            const especialidade = req.body;
            const objEspecialidade = new Especialidade(null, especialidade.Especialidade);
            const result = await insertModalidade(objEspecialidade);
            res.status(200).json({ success: true, message: 'Especialidade adicionada com sucesso!', result });
        } catch (error) {
            console.error('Erro ao adicionar Especialidade:', error);
            res.status(500).json({ success: false, message: 'Erro ao adicionar Especialidade', error });
        }
    }
};

module.exports = EspecialidadeController;