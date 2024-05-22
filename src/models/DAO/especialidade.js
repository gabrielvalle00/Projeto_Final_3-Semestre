class Especialidade {
    constructor(Especialidade){
        this.id = null
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