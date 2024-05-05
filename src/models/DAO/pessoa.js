class Pessoa {
    id;
    nome;
    cpf;
    dataNasc;
    email;
    data_cad;
    genero;
    logradouro;
    bairro;
    cidade;
    estado;
    numero;
    complemento;
    cep;

    constructor (Nome,cpf,DataNasc,Email,Data_cad,Genero,Logradouro,Bairro,Cidade,Estado,Numero,Complemento,Cep) {
        this.id = null;
        this.nome = Nome;
        this.cpf = cpf;
        this.dataNasc = DataNasc;
        this.email = Email;
        this.data_cad = Data_cad;
        this.genero = Genero;
        this.logradouro = Logradouro;
        this.bairro = Bairro;
        this.cidade = Cidade;
        this.estado = Estado;
        this.numero = Numero;
        this.complemento = Complemento;
        this.cep = Cep;
        this.numero = Numero;
        
    }

    get getNome () {
        return this.nome;
    }

    get getCpf () {
        return this.cpf;
    }

    get getDataNasc () {
        return this.dataNasc;
    }

    get getEmail () {
        return this.email;
    }
    get getData_cad () {
        return this.data_cad;
    }
    get getGenero () {
        return this.genero;
    }
    get getLogradouro () {
        return this.logradouro;
    }
    get getBairro () {
        return this.bairro;
    }
    get getCidade () {
        return this.cidade;
    }
    get getEstado () {
        return this.estado;
    }
    get getNumero () {
        return this.numero;
    }
    get getComplemento () {
        return this.complemento;
    }
    get getCep () {
        return this.cep;
    }
    get getTelefone () {
        return this.telefone;
    }




    set newName (Nome) {
        this.nome = Nome;
    }
    set newCpf (cpf) {
        this.cpf = cpf;
    }
    set newDataNasc (newBirthdate) {
        this.dataNasc = newBirthdate;
    }
    set newEmail (email) {
        this.email = email;
    }
    set newData_cad (data_cad){
        this.data_cad = data_cad;
    }
    set newGenero (genero) {
        this.genero = genero;
    }
    set newRua (rua) {
        this.rua = rua;
    }
    set newBairro (bairro) {
        this.bairro = bairro;
    }
    set newEstado (estado) {
        this.estado = estado;
    }
    set newCidade (cidade) {
        this.cidade = cidade;
    }
    set newNumero (numero) {
        this.numero = numero;
    }
    set newComplemento (complemento) {
        this.complemento = complemento;
    }
    set newCep (cep) {
        this.cep = cep;
    }
    set newTelefone (telefone) {
        this.telefone = telefone;
    }

    validarCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") 
        return "CPF Incompleto";
    
        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return "CPF Invalido!";
    
        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) 
        
        return "Seu CPF está Invalido!";
    
        return strCPF;
    }
    


}

module.exports = Pessoa