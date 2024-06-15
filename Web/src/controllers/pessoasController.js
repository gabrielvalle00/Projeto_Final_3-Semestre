const Pessoa = require('../models/DAO/Pessoa');
const Endereco = require('../models/DAO/Endereco');
const Funcionario = require('../models/DAO/Funcionario');
const Telefone = require('../models/DAO/Telefone');
const Login = require('../models/DAO/login');
const Especialidade = require('../models/DAO/Especialidade')
const Perfil = require('../models/DAO/perfil');

const { insert, verificarCpfExistente, visualizarPaciente, visualizarFuncionario, visualizarLogin, atualizarLogin, deletarLogin,updatePessoa } = require('../models/DAL/pessoasModel');



const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { cpf, nome, dataNasc, genero, email, endereco, telefone, funcionario, login, perfil, especialidade } = req.body;
            const cpfExistente = await verificarCpfExistente(cpf)
            if (cpfExistente > 0) {
                return res.json({ message: 'CPF ja cadastrado!' })
            }

            // Criar objeto Cliente (pessoa)
            const objCliente = new Pessoa(null, nome, cpf, dataNasc, email, genero);
            console.log(objCliente);
            const verificaCp = objCliente.validaCpf(objCliente.Cpf)
            if(verificaCp !== true){
            return res.json({message:"CPF INVALIDO"})
            }

            // Criar objeto Endereco
            const [enderecoData] = endereco; // Pegando o primeiro item do array
            const objEndereco = new Endereco(null, enderecoData.logradouro, enderecoData.bairro, enderecoData.estado, enderecoData.numeroEndereco, enderecoData.complementoEndereco, enderecoData.cep);
            console.log(objEndereco);
            const objTelefone = []
            if (telefone.length > 0) {
                telefone.forEach(value => {
                    objTelefone.push(new Telefone(null, value.numeroTel))
                })
            }
            console.log(objTelefone)

            // Criar objeto Funcionario
            const [funcionarioData] = funcionario; // Pegando o primeiro item do array
            const objFuncionario = new Funcionario(null, funcionarioData.crm, funcionarioData.data_Contrato);
            console.log(objFuncionario);



            // Criar objeto Login
            const [loginData] = login; // Pegando o primeiro item do array
            const objLogin = new Login(null, loginData.login, loginData.senha, 1, null, null);
            console.log(objLogin);

            // Criar objeto Perfil
            const [perfilData] = perfil; // Pegando o primeiro item do array
            const objPerfil = new Perfil(null, perfilData.tipo, null, null, null);
            console.log(objPerfil);




            console.log(Especialidade)
            console.log(especialidade)
            const objEspecialidade = []
            if (especialidade.length > 0) {
                especialidade.forEach(value => {
                    objEspecialidade.push(new Especialidade(null, value.desc_especialidade))
                })
            }


            console.log(objEspecialidade)


            // Chamar a função insert com os dados processados
            const result = await insert(objFuncionario, objEndereco, objCliente, objTelefone, objLogin, objPerfil, objEspecialidade);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao adicionar cliente' });
        }
    },

    visualizarLogin: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id)
            const obgLogin = new Login(id);
            const result = await visualizarLogin(obgLogin);
            res.status(200).json({ success: true, result });
        } catch (error) {
            console.error('Erro ao adicionar Especialidade:', error);
            res.status(500).json({ success: false, error });
        }
    },
    visualizarPaciente: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id)
            const objPessoa = new Pessoa(id);
            console.log(objPessoa)
            const result = await visualizarPaciente(objPessoa);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    },
    visualizarFuncionario: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id)
            const objFunc = new Funcionario(id);
            console.log(objFunc)
            const result = await visualizarFuncionario(objFunc);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    },
    atualizarLogin: async (req, res) => {
        try {
            const id = req.params.id;
            const {login, senha, status} = req.body;
            const obgLog = new Login(id,login,senha,status);
            console.log(obgLog)
            const result = await atualizarLogin(obgLog);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    },
    deletarLogin: async (req, res) => {
        try {
            const id = req.params.id;
            const obgLog = new Login(id);
            console.log(obgLog)
            const result = await deletarLogin(obgLog);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    },
    updatePessoa: async (req, res) =>{
        try {
            const id = req.params.id;
            const {cpf,nome,dataNasc,genero,email,endereco_id} = req.body
            const objPessoa = new Pessoa(id,nome,cpf,dataNasc,email,genero,endereco_id)
            console.log(objPessoa)
            const result = await updatePessoa(objPessoa);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }
}

module.exports = clienteController;
