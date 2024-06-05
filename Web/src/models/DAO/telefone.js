class Telefone {
    constructor(id,numeroTel){
        this.id = (id !== null || id > 0) ? id : null;
        this.numeroTel = numeroTel;
    }
    get getId () {
        return this.id;
    }
    get getNumero () {
        return this.numero;
    }
    set newNumero (numero){
        this.numero = numero;
    }
}

module.exports = Telefone