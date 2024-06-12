const conectarBancoDeDados = require('../../config/db');
const Endereco = require('../DAO/Endereco');

async function insert(funcionario, endereco, pessoa, telefones, login, perfil, especialidade) {
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
        if (funcionario.data_Contrato !== null) {
            console.log(funcionario.crm)
            const [resFunc] = await connection.query(
                'INSERT INTO tbl_funcionario (data_admissao, crm, pessoa_id, pessoa_endereco_id) VALUES (?, ?, ?, ?)',
                [funcionario.data_Contrato, funcionario.crm, pessoaId, enderecoId]
            );
            const funcID = resFunc.insertId;
            console.log('pooi')
            console.log(especialidade[0].desc_especialidade)

            for (const espe of especialidade) {
                const [rows] = await connection.query(
                    'SELECT id FROM clinica.tbl_especialidade WHERE desc_especialidade = ? LIMIT 1;', [espe.desc_especialidade]
                );

                if (rows.length > 0) {
                    const idEspe = rows[0].id;
                    console.log(idEspe);

                    if (funcionario.crm !== null) {
                        await connection.query(
                            'INSERT INTO tbl_funcionario_has_tbl_especialidade (funcionario_id, funcionario_pessoa_id, funcionario_pessoa_endereco_id, especialidade_id) VALUES (?, ?, ?, ?)',
                            [funcID, pessoaId, enderecoId, idEspe]
                        );
                    }
                } else {
                    console.log(`Especialidade ${espe.desc_especialidade} não encontrada.`);
                }
            }



        }

        // Inserir Paciente
        await connection.query(
            'INSERT INTO tbl_paciente (pessoa_id) VALUES (?)',
            [pessoaId]
        );

        // Inserir Login
        const [resLogin] = await connection.query(
            'INSERT INTO tbl_login (login, senha, status, pessoa_id, pessoa_endereco_id) VALUES (?, ?, ?, ?, ?)',
            [login.login, login.senha, login.status, pessoaId, enderecoId]
        );
        const loginId = resLogin.insertId;

        // Inserir Perfil
        await connection.query(
            'INSERT INTO tbl_perfis (tipo, login_id, login_pessoa_id, login_pessoa_endereco_id) VALUES (?, ?, ?, ?)',
            [perfil.tipo, loginId, pessoaId, enderecoId]
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

// CRUD para tbl_login

async function visualizarLogin(id) {
    const connection = await conectarBancoDeDados();
    try {
        const [res] = await connection.query('SELECT * FROM tbl_login WHERE id = ?', [id]);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function atualizarLogin(id, login) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(
            'UPDATE tbl_login SET login = ?, senha = ?, status = ? WHERE id = ?',
            [login.login, login.senha, login.status, id]
        );
        console.log('RESULTADO UPDATE LOGIN =>', res);
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao atualizar login:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}

async function deletarLogin(id) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('DELETE FROM tbl_login WHERE id = ?', [id]);
        console.log('RESULTADO DELETE LOGIN =>', res);
        await connection.commit();
        return res;

    } catch (error) {
        console.error('Erro ao deletar login:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}



// Crud para tbl Consulta

async function criarConsulta(consulta) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(`
            INSERT INTO tbl_consulta (data, hora, status, paciente_id, paciente_pessoa_id, funcionario_id,funcionario_pessoa_id, especialidade_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,[consulta.data, consulta.hora, consulta.status, consulta.paciente_id, consulta.paciente_pessoa_id, consulta.funcionario_id,consulta.funcionario_pessoa_id, consulta.especialidade_id]);
        await connection.commit();
        return res; 
   
    } catch (error) {
        console.error('Erro ao criar consulta:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

module.exports = {
    insert,
    verificarCpfExistente,
    visualizarPaciente,
    visualizarFuncionario,
    insertModalidade,
    visualizarLogin,
    atualizarLogin,
    deletarLogin,
    criarConsulta
};