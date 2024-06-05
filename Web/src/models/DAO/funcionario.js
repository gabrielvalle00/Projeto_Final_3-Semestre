

class Funcionario  {

    constructor(id,crm,data_Contrato,idP,idPE) {
        this.id = (id !== null || id > 0) ? id : null;
        this.crm = crm;
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