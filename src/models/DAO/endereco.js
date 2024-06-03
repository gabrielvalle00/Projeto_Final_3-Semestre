class Endereco {
    constructor(Logradouro,Bairro,Cidade,Estado,Numero,Complemento,Cep){
        this.id = (id !== null || id > 0) ? pTel.id : null;
        this.Logradouro = Logradouro;
        this.Bairro = Bairro;
        this.Cidade = Cidade;
        this.Estado = Estado;
        this.Numero = Numero;
        this.Complemento = Complemento;
        this.Cep = Cep;
    }
    // get e set
    get getId () {
        return this.id;
    }
    get getLogradouro() {
        return this.Logradouro;
    }
    get getBairro() {
        return this.Logradouro
    }
    get getCidade() {
        return this.Cidade
    }
    get getEstado() {
        return this.Estado
    }
    get getNumero(){
        return this.Numero
    }
    get getComplemento(){
        return this.Complemento
    }
    get getCep(){
        return this.Cep
    }
    set newLogradouro(Logradouro){
        this.Logradouro = Logradouro;
    }
    set newBairro(Bairro){
        this.Bairro = Bairro;
    }
    set newEstado(Estado){
        this.Estado = Estado;
    }
    set newCidade(Cidade){
        this.Cidade = Cidade;
    }
    set newNumero(Numero){
        this.Numero = Numero;
    }
    set newComplemento(Complemento){
        this.Complemento = Complemento;
    }
    set nerCep(Cep){
        this.Cep = Cep;
    }
}