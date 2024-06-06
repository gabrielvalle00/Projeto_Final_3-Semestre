const Pessoa = require('../models/DAO/Pessoa')
const Endereco = require('../models/DAO/Endereco')
const Paciente = require('../models/DAO/Paciente')
const Funcionario = require('../models/DAO/Funcionario')
const Telefone = require('../models/DAO/Telefone')
const { insert } = require('../models/DAL/pessoasModel');

const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { cpf, nome, dataNasc, genero, email, endereco: [{ logradouro, bairro, estado, NumeroEndereco, ComplementoEndereco, cep }], telefone, funcionario: [{ data_Contrato, crm }] } = req.body;
            // Criar objeto Cliente (pessoa)
            const objCliente = new Pessoa(null,nome,cpf,dataNasc,email,genero);
            console.log(objCliente)         
            // Criar objeto Endereco
            const objEndereco = new Endereco(null, logradouro, bairro, estado, NumeroEndereco, ComplementoEndereco, cep);
            console.log(objEndereco)
            // Criar array de objetos Telefone
            const objTelefone = telefone.map(tel => new Telefone(null,tel.numeroTel));
            console.log(objTelefone)
            const funcionario = new Funcionario(null,crm,data_Contrato)
            console.log(funcionario)
            // Chamar a função insert com os dados processados
            const result = await insert(funcionario, objEndereco, objCliente, objTelefone);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    }
};

module.exports = clienteController;
