const Pessoa = require('../models/DAO/Pessoa');
const Endereco = require('../models/DAO/Endereco');
const Funcionario = require('../models/DAO/Funcionario');
const Telefone = require('../models/DAO/Telefone');
const { insert } = require('../models/DAL/pessoasModel');

const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { cpf, nome, dataNasc, genero, email, endereco, telefone, funcionario } = req.body;

            // Criar objeto Cliente (pessoa)
            const objCliente = new Pessoa(null, nome, cpf, dataNasc, email, genero);
            console.log(objCliente);
            
            // Criar objeto Endereco
            const [enderecoData] = endereco; // Pegando o primeiro item do array
            const objEndereco = new Endereco(null, enderecoData.logradouro, enderecoData.bairro, enderecoData.estado, enderecoData.numeroEndereco, enderecoData.complementoEndereco, enderecoData.cep);
            console.log(objEndereco);

            // Criar array de objetos Telefone
            const objTelefone = telefone.map(tel => new Telefone(null, tel.numeroTel));
            console.log(objTelefone);

            // Criar objeto Funcionario
            const [funcionarioData] = funcionario; // Pegando o primeiro item do array
            const objFuncionario = new Funcionario(null, funcionarioData.crm, funcionarioData.data_Contrato);
            console.log(objFuncionario);

            // Chamar a função insert com os dados processados
            const result = await insert(objFuncionario, objEndereco, objCliente, objTelefone);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao adicionar cliente' });
        }
    }
};

module.exports = clienteController;
