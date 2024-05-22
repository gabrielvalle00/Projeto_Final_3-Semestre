class Telefone {
    constructor(numero){
        this.id = null;
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