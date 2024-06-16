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

//Crud Pessoa

async function updatePessoa(pessoa) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('UPDATE tbl_pessoa SET cpf = ?, nome = ?, data_nasc = ?, genero = ?, email = ?,endereco_id = ? WHERE ID = ?', [pessoa.cpf, pessoa.nome, pessoa.dataNasc, pessoa.genero, pessoa.email, pessoa.endereco_id, pessoa.id])
        console.log('Update Pessoa realizado', res)
        await connection.commit();
    } catch (error) {
        console.error('Erro ao editar Pessoa:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}

async function visualizarPaciente(id) {
    const connection = await conectarBancoDeDados();
    try {
        const [res] = await connection.query('SELECT * FROM tbl_pessoa WHERE id = ?', [id.id]);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function deletarPessoa(id) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('DELETE FROM tbl_pessoa WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Pessoa =>', res);
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao deletar Pessoa:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}
//crud Funcionario
async function visualizarFuncionario(id) {
    const connection = await conectarBancoDeDados();
    try {
        const [res] = await connection.query('SELECT p.cpf, p.nome, p.data_nasc,  p.genero, p.email, p.data_cad, f.data_admissao, f.crm FROM  tbl_funcionario f JOIN tbl_pessoa p ON f.pessoa_id = p.id WHERE f.pessoa_id = ?', [id.id]);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function updateFuncionario(funci) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('UPDATE tbl_funcionario SET data_admissao = ?, crm = ? WHERE ID = ?', [funci.data_Contrato, funci.crm, funci.id])
        console.log('Update Funcionario realizado', res)
        await connection.commit();
    } catch (error) {
        console.error('Erro ao editar Funcionario:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}

async function deletarFuncionario(id) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('DELETE FROM tbl_funcionario WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Funcionario =>', res);
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao deletar Funcionario:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}

// Crud Perfil

async function deletarPerfil(id) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('DELETE FROM tbl_perfis WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE perfil =>', res);
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao deletar perfil:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}


//Crud Endereco
async function updateEndereco(endereco) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('UPDATE tbl_endereco SET logradouro = ?, bairro = ?, estado = ?, numero = ?, complemento = ?, cep = ? WHERE ID = ?', [endereco.logradouro, endereco.bairro, endereco.estado, endereco.numeroEndereco, endereco.complemento, endereco.cep, endereco.id])
        console.log('Update Endereco realizado', res)
        await connection.commit();
    } catch (error) {
        console.error('Erro ao editar Endereco:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}
async function deletarEndereco(id) {

    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('DELETE FROM tbl_endereco WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Endereco =>', res);
        await connection.commit();
        return res;

    } catch (error) {
        console.error('Erro ao deletar endereco:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}



// Crud telefone

async function updateTelefone(telefone) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('UPDATE tbl_telefone SET numero = ? WHERE ID = ?', [telefone.numeroTel, telefone.id])
        console.log('Update telefone realizado', res)
        await connection.commit();
    } catch (error) {
        console.error('Erro ao editar telefone:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}
async function deletarTelefone(id) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('DELETE FROM tbl_telefone WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Telefone =>', res);
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao deletar telefone:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}

async function adicionarTelefone(id,telefone) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [resTelefone] = await connection.query(
            'INSERT INTO tbl_telefone (numero) VALUES (?)',
            [telefone.numeroTel]
        );
        const telefoneId = resTelefone.insertId;
        const ids = await connection.query(`
            select endereco_id from tbl_pessoa where id = ? 
        `, [id]);
        const enderecoId = ids[0][0].endereco_id;
        await connection.query(
            'INSERT INTO tbl_pessoa_has_tbl_telefone (telefone_id, pessoa_id, pessoa_tbl_endereco_id) VALUES (?, ?, ?)',
            [telefoneId, id, enderecoId]
        );
        console.log('RESULTADO INSERT Telefone =>', resTelefone);
        await connection.commit();
        return resTelefone;
    } catch (error) {
        console.error('Erro ao inserir telefone:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}


// Crud modalidade
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

async function deleteModalidade(especialidade) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('DELETE FROM tbl_especialidade WHERE id = ?', [especialidade.id]);
        console.log('RESULTADO DELETE Especialidade =>', res);
        await connection.commit()
    } catch (error) {
        console.error('Erro ao Excluir Especialidade:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}

async function updateModalidade(especialidade) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query('UPDATE tbl_especialidade SET desc_especialidade = ? WHERE ID = ?', [especialidade.desc_especialidade, especialidade.id]);
        console.log('RESULTADO UPDATE Especialidade =>', res);
        await connection.commit()
    } catch (error) {
        console.error('Erro ao editar Especialidade:', error);
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
        const [res] = await connection.query('SELECT * FROM tbl_login WHERE id = ?', [id.id]);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function atualizarLogin(login) {

    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(
            'UPDATE tbl_login SET login = ?, senha = ?, status = ? WHERE id = ?',
            [login.login, login.senha, login.status, login.id]
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
        const [res] = await connection.query('DELETE FROM tbl_login WHERE id = ?', [id.id]);
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

// Crud Perfils

async function atualizarPerfil(perfil) {

    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(
            'UPDATE tbl_perfis SET tipo = ? WHERE id = ?',
            [perfil.tipo, perfil.id]
        );
        console.log('RESULTADO UPDATE perfil =>', res);
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
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
        `, [consulta.data, consulta.hora, consulta.status, consulta.paciente_id, consulta.paciente_pessoa_id, consulta.funcionario_id, consulta.funcionario_pessoa_id, consulta.especialidade_id]);
        await connection.commit();
        return res;

    } catch (error) {
        console.error('Erro ao criar consulta:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function editarConsulta(consulta) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(`UPDATE tbl_consulta SET data = ?, hora = ?, status = ? WHERE id = ?`, [consulta.data, consulta.hora, consulta.status, consulta.id])
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao editar consulta:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function excluirConsulta(consulta) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(`DELETE FROM tbl_consulta WHERE id = ?`, [consulta.id])
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao excluir consulta:', error);
        throw error;
    } finally {
        await connection.end();
    }
}


// Crud para tbl prontuario


async function criarProntu(prontu) {
    const connection = await conectarBancoDeDados()
    try {
        await connection.beginTransaction();

        const id = await connection.query(`
        select paciente_id, paciente_pessoa_id,funcionario_id,funcionario_pessoa_id, especialidade_id from tbl_consulta where id = ? 
    `, [prontu.id_consulta]);
        const [res] = await connection.query(`
    INSERT INTO tbl_prontuario (diagnostico,medicacao,consulta_id,consulta_paciente_id,consulta_paciente_pessoa_id,consulta_funcionario_id,consulta_funcionario_pessoa_id,consulta_especialidade_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [prontu.diagnostico, prontu.medicacao, prontu.id_consulta, id[0][0].paciente_id, id[0][0].paciente_pessoa_id, id[0][0].funcionario_id, id[0][0].funcionario_pessoa_id, id[0][0].especialidade_id]);
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao criar consulta:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function editarProntu(prontu) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(`UPDATE tbl_prontuario SET diagnostico = ?, medicacao = ? WHERE id = ?`, [prontu.diagnostico, prontu.medicacao, prontu.id])
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao editar prontuario:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

async function excluirProntu(prontu) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(`DELETE FROM tbl_prontuario WHERE id = ?`, [prontu.id])
        await connection.commit();
        return res;
    } catch (error) {
        console.error('Erro ao excluir prontuario:', error);
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
    criarConsulta,
    criarProntu,
    editarConsulta,
    excluirConsulta,
    deleteModalidade,
    updateModalidade,
    updateEndereco,
    updatePessoa,
    updateFuncionario,
    updateTelefone,
    atualizarPerfil,
    editarProntu,
    excluirProntu,
    deletarEndereco,
    deletarTelefone,
    deletarPessoa,
    deletarFuncionario,
    adicionarTelefone,
    deletarPerfil
};