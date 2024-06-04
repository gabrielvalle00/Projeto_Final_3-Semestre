class Prontuario {
    constructor(diagnostico,medicacao){
        this.id = (id !== null || id > 0) ? pTel.id : null;
        this.diagnostico = diagnostico;
        this.medicacao = medicacao;
    }
    get getId () {
        return this.id;
    }
    get getDiagnostico (){
        return this.diagnostico;
    }
    get getMedicacao () {
        return this.medicacao;
    }
    set newDiagnostico(diagnostico) {
        this.diagnostico = diagnostico;
    }
    set newMedicacao (medicacao) {
        this.medicacao = medicacao;
    }
}


module.exports = Prontuario