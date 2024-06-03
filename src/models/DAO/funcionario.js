const Pessoa = require('./pessoa');

class Funcionario extends Pessoa {

    constructor(Nome, cpf, DataNasc, Email, Data_cad, Genero,CRM,data_Contrato,idP,idPE) {
        super(Nome, cpf, DataNasc, Email, Data_cad, Genero)
        this.id = (id !== null || id > 0) ? pTel.id : null;
        this.CRM = CRM;
        this.data_Contrato = data_Contrato;
    }
    get getId () {
        return this.id;
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