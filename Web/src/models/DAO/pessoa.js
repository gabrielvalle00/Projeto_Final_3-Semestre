class Pessoa {
    constructor(pid, Nome, cpf, dataNasc, Email, Genero, endereco_id) {
        this.id = pid !== null && pid > 0 ? pid : null;
        this.nome = Nome || '';
        this.cpf = cpf || '';
        this.dataNasc = dataNasc ? this.DataConvert(dataNasc) : null;
        this.email = Email || '';
        this.genero = Genero || '';
        this.endereco_id = endereco_id || '';
    }

    get getId() {
        return this.id;
    }

    get getNome() {
        return this.nome;
    }

    get getCpf() {
        return this.cpf;
    }

    get getDataNasc() {
        return this.dataNasc;
    }

    get getEmail() {
        return this.email;
    }

    get getGenero() {
        return this.genero;
    }

    set newName(Nome) {
        this.nome = Nome;
    }

    set newCpf(cpf) {
        this.cpf = cpf;
    }

    set newDataNasc(newBirthdate) {
        this.dataNasc = this.DataConvert(newBirthdate);
    }

    set newEmail(email) {
        this.email = email;
    }

    set newGenero(genero) {
        this.genero = genero;
    }

    DataConvert(value) {
        if (value.includes('/')) {
            let [dia, mes, ano] = value.split('/');
            return `${ano}-${mes}-${dia}`;
        }
        return value; 
    }

    validaCpf() {
        // Remover caracteres especiais do CPF
        let value = this.cpf.replace(/[.-]/g, '');

        // Verificar se o CPF tem 11 dígitos, caso negativo, retorna false
        if (value.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais, caso positivo, retorna false
        if (/^(\d)\1{10}$/.test(value)) {
            return false;
        }

        // Inicia o cálculo para avaliar se o número informado é um CPF válido

        // Calcular o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(value.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o primeiro dígito verificador está correto
        if (digitoVerificador1 !== parseInt(value.charAt(9))) {
            return false;
        }

        // Calcular o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(value.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o segundo dígito verificador está correto
        if (digitoVerificador2 !== parseInt(value.charAt(10))) {
            return false;
        }
        this.Cpf = value;
        // CPF válido
        return true;
    }
    
}

module.exports = Pessoa;
