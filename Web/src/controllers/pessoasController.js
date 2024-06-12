const Pessoa = require('../models/DAO/Pessoa');
const Endereco = require('../models/DAO/Endereco');
const Funcionario = require('../models/DAO/Funcionario');
const Telefone = require('../models/DAO/Telefone');
const Login = require('../models/DAO/login');
const Especialidade = require('../models/DAO/Especialidade')
const Perfil = require('../models/DAO/perfil');

const { insert, verificarCpfExistente, visualizarPaciente, visualizarFuncionario, visualizarLogin, atualizarLogin, deletarLogin, visualizarPessoa, atualizarPessoa, deletarPessoa } = require('../models/DAL/pessoasModel');



const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { cpf, nome, dataNasc, genero, email, endereco, telefone, funcionario, login, perfil,especialidade } = req.body;
            const cpfExistente = await verificarCpfExistente(cpf)
            if (cpfExistente > 0) {
                return res.json({ message: 'CPF ja cadastrado!' })
            }

            // Criar objeto Cliente (pessoa)
            const objCliente = new Pessoa(null, nome, cpf, dataNasc, email, genero);
            console.log(objCliente);
            
            // Criar objeto Endereco
            const [enderecoData] = endereco; // Pegando o primeiro item do array
            const objEndereco = new Endereco(null, enderecoData.logradouro, enderecoData.bairro, enderecoData.estado, enderecoData.numeroEndereco, enderecoData.complementoEndereco, enderecoData.cep);
            console.log(objEndereco);
            const objTelefone = []
            if(telefone.length > 0){
                telefone.forEach(value =>{
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
            const objLogin = new Login(null, loginData.login, loginData.senha, 1 , null, null); 
            console.log(objLogin);

           // Criar objeto Perfil
           const [perfilData] = perfil; // Pegando o primeiro item do array
           const objPerfil = new Perfil(null, perfilData.tipo, null, null, null);
           console.log(objPerfil);
    

    

            console.log(Especialidade)
            console.log(especialidade)
            const objEspecialidade = []
            if(especialidade.length > 0){
                especialidade.forEach(value =>{
                    objEspecialidade.push( new Especialidade(null, value.desc_especialidade))
                })
            }
            
      
            console.log(objEspecialidade)


            // Chamar a função insert com os dados processados
            const result = await insert(objFuncionario, objEndereco, objCliente, objTelefone, objLogin, objPerfil,objEspecialidade);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao adicionar cliente' });
        }
    }
};

module.exports = clienteController;
