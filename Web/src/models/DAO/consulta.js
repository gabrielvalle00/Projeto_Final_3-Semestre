class Consulta {
    constructor(id,data, hora, status,idP,idPP,idF,idPF,idE) {
        this.id = (id !== null || id > 0) ? id : null;
        this.data = data;
        this.hora = hora;
        this.status = status;
        this.paciente_id = idP;
        this.paciente_pessoa_id = idPP;
        this.funcionario_id = idF;
        this.funcionario_pessoa_id = idPF
        this.especialidade_id = idE
    }
    // get e set
    get getId() { return this.id; }
    get getData() { return this.id }
    get getHora() { return this.hora; }
    get getStatus() { return this.status }

    set newData(data){
        this.data = data;
    }
    set newHora(hora){
        this.hora = hora;
    }
    set newStatus(status){
        this.status = status;
    }
}


module.exports = Consulta