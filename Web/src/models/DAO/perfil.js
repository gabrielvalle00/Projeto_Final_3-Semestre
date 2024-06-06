class Perfils  {
    constructor (id,tipo){
        this.id = (id !== null || id > 0) ? id : null;
        this.tipo = tipo
    }
    get getId () {
        return this.id;
    }
    get getTipo () {
        return this.tipo;
    }

    set newTipo (tipo){
        this.tipo = tipo
    }


   

}


module.exports = Perfils
