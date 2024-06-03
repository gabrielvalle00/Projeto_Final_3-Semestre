class Especialidade {
    constructor(Especialidade){
        this.id = (id !== null || id > 0) ? pTel.id : null;
        this.Especialidade = Especialidade
    }
    get getId () {
        return this.id;
    }
    get getEspecialidade(){
        return this.Especialidade;
    }
    set newEspecialidade (Especialidade){
        this.Especialidade = Especialidade
    }
}

module.exports = Especialidade