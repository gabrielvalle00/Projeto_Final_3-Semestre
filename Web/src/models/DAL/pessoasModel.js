const conectarBancoDeDados = require('../../config/db');

async function insert(funcionario, endereco, pessoa, telefone, tefoneHas, paciente, especialidade, login, perfis, consulta, prontuario,) {
    const connection = await conectarBancoDeDados();
    try {

        await connection.beginTransaction();

        const res = await connection.query('INSERT INTO tbl_endereco (logradouro, bairro, estado, numero, complemento, cep) VALUES (?, ?, ?, ?, ?, ?)', [endereco.logradouro, endereco.bairro, endereco.estado, endereco.numero, endereco.complemento, endereco.cep]);
        console.log('RESULTADO INSERT ENDERECO =>', res);

        //insert pessoa
        async (pessoa) => {
            await connection.query('INSERT INTO tbl_pessoa (cpf, nome, data_nasc, genero, email, endereco_id ) VALUES (?, ?, ?, ?, ?, ?)', [pessoa.cpf, pessoa.nome, pessoa.data_nasc, pessoa.genero, res[0].insertId]);
        };



        // Insert telefone
        telefone.forEach(async (tel) => {
            await connection.query('INSERT INTO tbl_telefone (numero) VALUES (?)', [tel.numero]);
        });



        tefoneHas.forEach(async (tefoneHas) => {
            await connection.query('INSERT INTO tbl_telefone_has_pessoa (telefone_id, pessoa_id)VALUES (?, ?)', [tefoneHas.res[0].insertId, tefoneHas.res[0].insertId]);

        });




        // Insert Paciente
        async (paciente) => {
            await connection.query('INSERT INTO tbl_paciente (pessoa_id) VALUES (?)', [res[0].insertId]);
        };



        // Insert funcionario
        async (funcionario) => {
            await connection.query('INSERT INTO tbl_funcionario (data_admissao, crm, pessoa_id, pessoa_endereco_id) VALUES (?, ?, ?, ?)', [funcionario.data_Contrato, funcionario.crm, res[0].insertId, res[0].insertId]);

        };





        // Se todas as queries forem bem-sucedidas, um 'commit' é realizado para confirmar as execuções
        await connection.commit();
        console.log('Transação concluída com sucesso.');
    } catch (error) {
        // Em caso de erro, um 'rollback' é realizado para cancelar as execuções que foram realizadas
        await connection.rollback();
        console.log(error);
        return (error);
    } finally {
        // Fecha a conexão com o banco de dados
        await connection.end(null);
    }

}

async function verificarCpfExistente(cpf) {
    const connection = await conectarBancoDeDados();
    try {

        const res = await connection.query('select count(*) as total from tbl_pessoa where cpf = (?)', [cpf]);
        console.log(res);
        return res[0][0].total;



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
        const [res] = await connection.query('SELECT * FROM tbl_paciente WHERE pessoa_id = ? ', [id]);
        return res;
    } catch (error) {
        console.log(error);
        return (error);
    } finally {
        await connection.end(null);
    }
}

async function visualizarFuncionario(id) {
    const connection = await conectarBancoDeDados();
    try {
        const [res] = await connection.query('SELECT * FROM tbl_funcionario WHERE pessoa_id = ? ', [id]);
        return res;
    } catch (error) {
        console.log(error);
        return (error);
    } finally {
        await connection.end(null);
    }
}







module.exports = { insert, verificarCpfExistente };