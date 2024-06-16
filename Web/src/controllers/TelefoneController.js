const Telefone = require('../models/DAO/Telefone')
const { updateTelefone,deletarTelefone,adicionarTelefone } = require('../models/DAL/PessoasModel');

const TelefoneController = {
    updateTelefone: async (req,res) => {
        try{
            const id = req.params.id
            const {numeroTel} = req.body
            const obgTele = new Telefone (id,numeroTel)
            console.log(obgTele)
            const result = await updateTelefone(obgTele);
            res.status(200).json({ success: true, message: 'Telefone editado com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar prontuario:', error);
            res.status(500).json({ success: false, message: 'Erro ao editar Telefone', error });
        }
    },
    deletarTelefone: async (req,res) => {
        try{
            const id = req.params.id
            const obgTele = new Telefone (id)
            console.log(obgTele)
            const result = await deletarTelefone(obgTele);
            res.status(200).json({ success: true, message: 'Telefone excluido com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar prontuario:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Telefone', error });
        }
    },
    adicionarTelefone: async (req,res) => {
        try{
            const id = req.params.id
            const {numeroTel} = req.body
            const obgTele = new Telefone (null,numeroTel)
            console.log(obgTele)
            const result = await adicionarTelefone(id,obgTele);
            res.status(200).json({ success: true, message: 'Telefone inserido com sucesso!', result });
        }catch(error){
            console.error('Erro ao criar prontuario:', error);
            res.status(500).json({ success: false, message: 'Erro ao inserir Telefone', error });
        }
    }
}

module.exports = TelefoneController;