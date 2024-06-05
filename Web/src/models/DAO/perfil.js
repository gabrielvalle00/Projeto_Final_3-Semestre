class Perfils  {
    constructor (id,login,senha,status,tipo){
        super (login,senha,status)
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