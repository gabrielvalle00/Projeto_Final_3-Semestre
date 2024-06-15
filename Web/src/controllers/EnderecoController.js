const { updateEndereco,deletarEndereco } = require('../models/DAL/PessoasModel');
const Endereco = require('../models/DAO/Endereco');


const EnderecoController = {

    updateEndereco: async (req,res) =>{
        try {
            const id = req.params.id
            const {logradouro,bairro,estado,numeroEndereco,complementoEndereco,cep} = req.body;
            const obgEndereco = new Endereco(id,logradouro,bairro,estado,numeroEndereco,complementoEndereco,cep);
            console.log(obgEndereco)
            const result = await updateEndereco(obgEndereco);
            res.status(200).json({ success: true, message: 'Endereco editado com sucesso!', result });
        } catch (error) {
            console.error('Erro ao editar Endereco:', error);
            res.status(500).json({ success: false, message: 'Erro ao editar Endereco', error });
        }
    },
    deletarEndereco: async (req,res) =>{
        try {
            const id = req.params.id
            const obgEndereco = new Endereco(id);
            console.log(obgEndereco)
            const result = await deletarEndereco(obgEndereco);
            res.status(200).json({ success: true, message: 'Endereco excluido com sucesso!', result });
        } catch (error) {
            console.error('Erro ao editar Endereco:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Endereco', error });
        }
    }
}


module.exports = EnderecoController;