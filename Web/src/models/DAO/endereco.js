class Endereco {
    constructor(id, Logradouro, Bairro, Estado, NumeroEndereco, ComplementoEndereco, Cep) {
        this.id = (id !== null && id > 0) ? id : null;
        this.logradouro = Logradouro;
        this.bairro = Bairro;
        this.estado = Estado;
        this.numeroEndereco = NumeroEndereco;
        this.complementoEndereco = ComplementoEndereco;
        this.cep = Cep;
    }

    validaCampos(){
        return(
            this.logradouro&&
            this.bairro&&
            this.estado&&
            this.numeroEndereco&&
            this.cep
        )
    }
};

module.exports = Endereco