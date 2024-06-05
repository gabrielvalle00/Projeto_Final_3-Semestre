class Paciente  {
    constructor(idPessoa) {
        this.id = (idPessoa !== null || idPessoa > 0) ? idPessoa : null;
    }

    get getId() {
        return this.id;
    }
}

module.exports = Paciente;
