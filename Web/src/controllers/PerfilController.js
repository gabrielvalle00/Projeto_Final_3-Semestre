const Perfil = require('../models/DAO/Perfil')
const { atualizarPerfil } = require('../models/DAL/PessoasModel');

const PerfilController = {
    atualizarPerfil: async (req,res) => {
        try{
            const id = req.params.id
            const {tipo} = req.body
            const obfPerfil = new Prontuario (id, tipo)
            console.log(obfPerfil)
            const result = await atualizarPerfil(obfPerfil);
            res.status(200).json({ success: true, message: 'perfil atualizado com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar prontuario:', error);
            res.status(500).json({ success: false, message: 'Erro ao atualizar perfil', error });
        }
    }
}

module.exports = PerfilController;