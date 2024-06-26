const { updateFuncionario, deletarFuncionario} = require('../models/DAL/PessoasModel');
const Funcionario = require('../models/DAO/Funcionario');


const FuncionarioController = {

    updateFuncionario: async (req,res) =>{
        try {
            const id = req.params.id
            const {data_adimissao,crm} = req.body;
            const objFunci = new Funcionario(id,crm,data_adimissao);
            console.log(objFunci)
            const result = await updateFuncionario(objFunci);
            res.status(200).json({ success: true, message: 'Funcionario editado com sucesso!', result });
        } catch (error) {
            console.error('Erro ao editar Funcionario:', error);
            res.status(500).json({ success: false, message: 'Erro ao editar Funcionario', error });
        }
    },
    deletarFuncionario: async (req,res) =>{
        try {
            const id = req.params.id
            const objFunci = new Funcionario(id);
            console.log(objFunci)
            const result = await deletarFuncionario(objFunci);
            res.status(200).json({ success: true, message: 'Funcionario excluido com sucesso!', result });
        } catch (error) {
            console.error('Erro ao editar Funcionario:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Funcionario', error });
        }
    }
}


module.exports = FuncionarioController;