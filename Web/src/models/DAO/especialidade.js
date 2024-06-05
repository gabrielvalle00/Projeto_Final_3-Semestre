class Especialidade {
    constructor(id, Especialidade) {
        this.id = (id !== null && id > 0) ? id : null;
        this.Especialidade = Especialidade;
    }
    get getId() {
        return this.id;
    }
    get getEspecialidade() {
        return this.Especialidade;
    }
    set newEspecialidade(Especialidade) {
        this.Especialidade = Especialidade;
    }
}

module.exports = Especialidade;
