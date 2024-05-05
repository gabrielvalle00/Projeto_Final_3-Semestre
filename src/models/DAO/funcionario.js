const Pessoa = require('./pessoa');

class Funcionario extends Pessoa() {
    CRM;
    data_Contrato;
    constructor(Nome, cpf, DataNasc, Email, Data_cad, Genero, Logradouro, Bairro, Cidade, Estado, Numero, Complemento, Cep,CRM,data_Contrato) {
        super(Nome, cpf, DataNasc, Email, Data_cad, Genero, Logradouro, Bairro, Cidade, Estado, Numero, Complemento, Cep)
        this.CRM = CRM;
        this.data_Contrato = data_Contrato;
    }
    getCRM() {
        return this.CRM;
    }
    setCRM(CRM) {
        this.CRM = CRM;
    }
    getData_Contrato() {
        return this.data_Contrato;
    }
    setData_Contrato(data) {
        this.data_Contrato = data;
    }
}

module.exports = Funcionario