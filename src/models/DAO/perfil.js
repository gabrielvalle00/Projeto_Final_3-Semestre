class Perfils  {
    constructor (login,senha,status,tipo){
        super (login,senha,status)
        this.id = null;
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

