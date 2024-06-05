class Pessoa {

    constructor (pid,Nome,cpf,DataNasc,Email,Genero) {
        this.id = (pid !== null || pid > 0) ? id : null;
        this.nome = Nome;
        this.cpf = cpf;
        this.DataConvert(DataNasc);
        this.email = Email;
        this.genero = Genero;
        
    }

    get getId() {
        return this.id;
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

    // validarCPF(strCPF) {
    //     var Soma;
    //     var Resto;
    //     Soma = 0;
    //     if (strCPF == "00000000000") 
    //     return "CPF Incompleto";
    
    //     for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    //     Resto = (Soma * 10) % 11;
    
    //     if ((Resto == 10) || (Resto == 11)) Resto = 0;
    //     if (Resto != parseInt(strCPF.substring(9, 10))) return "CPF Invalido!";
    
    //     Soma = 0;
    //     for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    //     Resto = (Soma * 10) % 11;
    
    //     if ((Resto == 10) || (Resto == 11)) Resto = 0;
    //     if (Resto != parseInt(strCPF.substring(10, 11))) 
        
    //     return "Seu CPF está Invalido!";
    
    //     return strCPF;
    // }

    adicionarPessoa() {
        'INSERT INTO.....'
    }

    DataConvert(value) {
        let [dia, mes, ano] = value.split('/'); 
        let dataFormatada = `${ano}-${mes}-${dia}`;
        this.dataNasc = dataFormatada;
    }



}




module.exports = Pessoa