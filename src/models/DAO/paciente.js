const Pessoa = require ('./pessoa');

class Paciente extends Pessoa {
    constructor (Nome,cpf,DataNasc,Email,Data_cad,Genero,Logradouro,Bairro,Cidade,Estado,Numero,Complemento,Cep,idPessoa){
        super (Nome,cpf,DataNasc,Email,Data_cad,Genero,Logradouro,Bairro,Cidade,Estado,Numero,Complemento,Cep,idPessoa)
    }


    // N sei ao certo como vai ser feito o paciente

}



module.exports = Paciente