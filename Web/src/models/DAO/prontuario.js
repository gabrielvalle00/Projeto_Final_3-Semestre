class Prontuario {
    constructor(id,diagnostico,medicacao,id_consulta){
        this.id = (id !== null || id > 0) ? id : null;
        this.diagnostico = diagnostico;
        this.medicacao = medicacao;
        this.id_consulta =id_consulta
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