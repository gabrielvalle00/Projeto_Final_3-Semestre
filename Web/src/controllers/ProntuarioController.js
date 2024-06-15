const Prontuario = require('../models/DAO/Prontuario')
const { criarProntu } = require('../models/DAL/pessoasModel');

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
    }
}

module.exports = ProntuarioController;