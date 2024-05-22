class Consulta {
    constructor(data, hora, status) {
        this.id = null;
        this.data = data;
        this.hora = hora;
        this.status = status;
    }
    // get e set
    get getId() { return this.id; }
    get getData() { return this.id }
    get getHora() { return this.hora; }
    get getStatus() { return this.status }

    set newData(data){
        this.data = data;
    }
    set newHora(hora){
        this.hora = hora;
    }
    set newStatus(status){
        this.status = status;
    }
}