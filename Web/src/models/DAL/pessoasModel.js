const conectarBancoDeDados = require('../../config/db');
const Endereco = require('../DAO/Endereco');

async function insert(funcionario, endereco, pessoa, telefones) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();

        // Inserir Endereco
        const [resEndereco] = await connection.query(
            'INSERT INTO tbl_endereco (logradouro, bairro, estado, numero, complemento, cep) VALUES (?, ?, ?, ?, ?, ?)', 
            [endereco.logradouro, endereco.bairro, endereco.estado, endereco.numeroEndereco, endereco.complementoEndereco, endereco.cep]
        );
        const enderecoId = resEndereco.insertId;

        // Inserir Pessoa
        const [resPessoa] = await connection.query(
            'INSERT INTO tbl_pessoa (cpf, nome, data_nasc, genero, email, endereco_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [pessoa.cpf, pessoa.nome, pessoa.dataNasc, pessoa.genero, pessoa.email, enderecoId]
        );
        const pessoaId = resPessoa.insertId;

        // Inserir Telefones e associá-los à pessoa
        for (const tel of telefones) {
            const [resTelefone] = await connection.query(
                'INSERT INTO tbl_telefone (numero) VALUES (?)', 
                [tel.numeroTel]
            );
            const telefoneId = resTelefone.insertId;

            await connection.query(
                'INSERT INTO tbl_pessoa_has_tbl_telefone (telefone_id, pessoa_id, pessoa_tbl_endereco_id) VALUES (?, ?, ?)', 

                [telefoneId, pessoaId, enderecoId]
            );
        }

        // Inserir Funcionario
        await connection.query(
            'INSERT INTO tbl_funcionario (data_admissao, crm, pessoa_id, pessoa_endereco_id) VALUES (?, ?, ?, ?)', 
            [funcionario.data_Contrato, funcionario.crm, pessoaId, enderecoId]
        );

        await connection.commit();
        console.log('Transação concluída com sucesso.');
        return { success: true, message: 'Cliente adicionado com sucesso' };
    } catch (error) {
        await connection.rollback();
        console.error('Erro ao inserir dados:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function verificarCpfExistente(cpf) {
    const connection = await conectarBancoDeDados();
    try {
        const [res] = await connection.query('SELECT COUNT(*) AS total FROM tbl_pessoa WHERE cpf = ?', [cpf]);
        return res[0].total > 0;
    } catch (error) {
        console.error('Erro ao verificar CPF:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function visualizarPaciente(id) {
    const connection = await conectarBancoDeDados();
    try {
        const [res] = await connection.query('SELECT * FROM tbl_paciente WHERE pessoa_id = ?', [id]);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function visualizarFuncionario(id) {
    const connection = await conectarBancoDeDados();
    try {
        const [res] = await connection.query('SELECT * FROM tbl_funcionario WHERE pessoa_id = ?', [id]);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function insertModalidade(especialidade) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('INSERT INTO tbl_especialidade (desc_especialidade) VALUES (?)', [especialidade.desc_especialidade]);
        console.log('RESULTADO INSERT Especialidade =>', res);
        await connection.commit();
    } catch (error) {
        console.error('Erro ao inserir Especialidade:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}

module.exports = { insert, verificarCpfExistente, insertModalidade, visualizarFuncionario, visualizarPaciente };
