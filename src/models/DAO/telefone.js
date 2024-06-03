class Telefone {
    constructor(numero){
        this.id = (id !== null || id > 0) ? pTel.id : null;
        this.numero = numero;
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