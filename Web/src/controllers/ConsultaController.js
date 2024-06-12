const { criarConsulta } = require('../models/DAL/pessoasModel');
const Consulta = require('../models/DAO/Consulta');


const ConsultaController = {
    criarConsulta: async (req,res) => {
        try{
            const {data, hora, status,paciente_id,paciente_pessoa_id,funcionario_id, funcionario_pessoa_id,especialidade_id} = req.body
            const objConsulta = new Consulta (null, data, hora,status,paciente_id,paciente_pessoa_id,funcionario_id,funcionario_pessoa_id,especialidade_id)
            const result = await criarConsulta(objConsulta);
            res.status(200).json({ success: true, message: 'Consulta criada com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar consulta:', error);
            res.status(500).json({ success: false, message: 'Erro ao criar consulta', error });
        }
    }
}

module.exports = ConsultaController;