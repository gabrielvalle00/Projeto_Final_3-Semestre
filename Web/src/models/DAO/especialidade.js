class Especialidade {
    constructor(id, desc_especialidade) {
        this.id = (id !== null && id > 0) ? id : null;
        this.desc_especialidade = desc_especialidade;
    }
    get getId() {
        return this.id;
    }
    get getEspecialidade() {
        return this.Especialidade;
    }

}

module.exports = Especialidade;
