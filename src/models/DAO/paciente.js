const Pessoa = require ('./pessoa');

class Paciente extends Pessoa {
    constructor (Nome,cpf,DataNasc,Email,Data_cad,Genero,Logradouro,Bairro,Cidade,Estado,Numero,Complemento,Cep,idPessoa){
        super (Nome,cpf,DataNasc,Email,Data_cad,Genero,Logradouro,Bairro,Cidade,Estado,Numero,Complemento,Cep,idPessoa)
        this.id = (id !== null || id > 0) ? pTel.id : null;
    }
    get getId () {
        return this.id;
    }

    // N sei ao certo como vai ser feito o paciente

}


